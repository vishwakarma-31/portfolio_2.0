import React, { useRef, useState, useCallback, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { MousePosition } from '../types'
import { STARFIELD_CONFIG, PARALLAX_CONFIG, CANVAS_CONFIG, MOUSE_TRACKER_CONFIG } from '../config/animationConstants'

function InteractiveStars({ starCount = STARFIELD_CONFIG.DEFAULT_STAR_COUNT, starSize = STARFIELD_CONFIG.DEFAULT_STAR_SIZE, mousePosition }: { starCount?: number; starSize?: number; mousePosition: MousePosition }) {
  const ref = useRef<THREE.Points>(null)
  const originalPositions = useRef<Float32Array | null>(null)
  const velocities = useRef<Float32Array | null>(null)
  const masses = useRef<Float32Array | null>(null)
  const frameCount = useRef(0) // Add a frame counter ref
  
  // Initialize sphere state with a lazy initializer function to avoid calling Math.random during render
  const [sphere] = useState<Float32Array>(() => {
    const sphereArray = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      sphereArray[i * 3] = (Math.random() - 0.5) * STARFIELD_CONFIG.POSITION_MULTIPLIER_X
      sphereArray[i * 3 + 1] = (Math.random() - 0.5) * STARFIELD_CONFIG.POSITION_MULTIPLIER_Y
      sphereArray[i * 3 + 2] = (Math.random() - 0.5) * STARFIELD_CONFIG.POSITION_MULTIPLIER_Z
    }
    return sphereArray
  })
  
  // Initialize velocities and masses in an effect since they don't need to be in state
  useEffect(() => {
    // Check if we've already initialized to avoid unnecessary work
    if (velocities.current) return;
    
    const velArray = new Float32Array(starCount * 3)
    const massArray = new Float32Array(starCount)
    
    for (let i = 0; i < starCount; i++) {
      // Initialize velocities
      velArray[i * 3] = (Math.random() - 0.5) * STARFIELD_CONFIG.VELOCITY_MULTIPLIER
      velArray[i * 3 + 1] = (Math.random() - 0.5) * STARFIELD_CONFIG.VELOCITY_MULTIPLIER
      velArray[i * 3 + 2] = (Math.random() - 0.5) * STARFIELD_CONFIG.VELOCITY_MULTIPLIER
    
      // Random masses for varied gravitational response
      massArray[i] = STARFIELD_CONFIG.MASS_MIN + Math.random() * (STARFIELD_CONFIG.MASS_MAX - STARFIELD_CONFIG.MASS_MIN)
    }
    
    originalPositions.current = sphere.slice() // Use the initialized sphere state
    velocities.current = velArray
    masses.current = massArray
  }, [starCount, sphere]) // Dependencies: re-run if starCount changes

  useFrame((state, delta) => {
    // Only update physics every 2nd frame to reduce CPU load
    frameCount.current += 1
    if (frameCount.current % 2 !== 0) return

    if (!ref.current || !originalPositions.current || !velocities.current || !masses.current) return
    
    const positions = ref.current.geometry.attributes.position.array as Float32Array
    const t = state.clock.getElapsedTime()
    
    // Pre-calculate mouse position (outside loop for performance)
    const mouseX = mousePosition.x * STARFIELD_CONFIG.MOUSE_INFLUENCE * STARFIELD_CONFIG.MOUSE_POSITION_MULTIPLIER
    const mouseY = mousePosition.y * STARFIELD_CONFIG.MOUSE_INFLUENCE * STARFIELD_CONFIG.MOUSE_POSITION_MULTIPLIER
    const mouseZ = 0
    
    // Pre-calculate constants
    const maxVelSq = STARFIELD_CONFIG.MAX_VELOCITY * STARFIELD_CONFIG.MAX_VELOCITY
    const damping = STARFIELD_CONFIG.DAMPING
    const gravConst = STARFIELD_CONFIG.GRAVITATIONAL_CONSTANT
    const forceZMult = STARFIELD_CONFIG.FORCE_Z_MULTIPLIER
    
    // Batch process stars for better performance
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3
      
      // Get current position
      const currentX = positions[i3]
      const currentY = positions[i3 + 1]
      const currentZ = positions[i3 + 2]
      
      // Calculate distance squared (avoid sqrt when possible)
      const dx = mouseX - currentX
      const dy = mouseY - currentY
      const dz = mouseZ - currentZ
      const distSq = dx * dx + dy * dy + dz * dz
      
      // Only calculate force if within reasonable distance (optimization)
      if (distSq < 10000) { // 100^2 - only affect nearby stars
        const distance = Math.sqrt(distSq)
        const safeDistance = Math.max(distance, STARFIELD_CONFIG.MIN_DISTANCE)
        const safeDistSq = safeDistance * safeDistance
        
        // Gravitational force (F = G * m / r²)
        const force = gravConst * masses.current[i] / safeDistSq
        const invSafeDist = 1 / safeDistance
        const forceX = dx * invSafeDist * force
        const forceY = dy * invSafeDist * force
        const forceZ = dz * invSafeDist * force * forceZMult
        
        // Update velocities with gravitational acceleration
        velocities.current[i3] += forceX * delta
        velocities.current[i3 + 1] += forceY * delta
        velocities.current[i3 + 2] += forceZ * delta
      }
      
      // Add subtle autonomous drift (only calculate once per frame)
      const angle = t * STARFIELD_CONFIG.DRIFT_ANGULAR_SPEED + i * STARFIELD_CONFIG.DRIFT_ANGLE_MULTIPLIER
      const driftX = Math.cos(angle) * STARFIELD_CONFIG.DRIFT_MAGNITUDE
      const driftY = Math.sin(angle * STARFIELD_CONFIG.DRIFT_Y_MULTIPLIER) * STARFIELD_CONFIG.DRIFT_MAGNITUDE
      const driftZ = Math.sin(angle * STARFIELD_CONFIG.DRIFT_Z_ANGLE_MULTIPLIER) * (STARFIELD_CONFIG.DRIFT_MAGNITUDE * STARFIELD_CONFIG.DRIFT_Z_MULTIPLIER)
      
      velocities.current[i3] += driftX * delta
      velocities.current[i3 + 1] += driftY * delta
      velocities.current[i3 + 2] += driftZ * delta
      
      // Apply damping
      velocities.current[i3] *= damping
      velocities.current[i3 + 1] *= damping
      velocities.current[i3 + 2] *= damping
      
      // Limit maximum velocity (using squared values to avoid sqrt)
      const velSq = velocities.current[i3] * velocities.current[i3] +
                    velocities.current[i3 + 1] * velocities.current[i3 + 1] +
                    velocities.current[i3 + 2] * velocities.current[i3 + 2]
      
      if (velSq > maxVelSq) {
        const scale = STARFIELD_CONFIG.MAX_VELOCITY / Math.sqrt(velSq)
        velocities.current[i3] *= scale
        velocities.current[i3 + 1] *= scale
        velocities.current[i3 + 2] *= scale
      }
      
      // Update positions
      positions[i3] += velocities.current[i3]
      positions[i3 + 1] += velocities.current[i3 + 1]
      positions[i3 + 2] += velocities.current[i3 + 2]
      
      // Endless boundary - wrap around (optimized)
      if (positions[i3] > STARFIELD_CONFIG.BOUNDARY_X) {
        positions[i3] = -STARFIELD_CONFIG.BOUNDARY_X
      } else if (positions[i3] < -STARFIELD_CONFIG.BOUNDARY_X) {
        positions[i3] = STARFIELD_CONFIG.BOUNDARY_X
      }
      
      if (positions[i3 + 1] > STARFIELD_CONFIG.BOUNDARY_Y) {
        positions[i3 + 1] = -STARFIELD_CONFIG.BOUNDARY_Y
      } else if (positions[i3 + 1] < -STARFIELD_CONFIG.BOUNDARY_Y) {
        positions[i3 + 1] = STARFIELD_CONFIG.BOUNDARY_Y
      }
      
      if (positions[i3 + 2] > STARFIELD_CONFIG.BOUNDARY_Z) {
        positions[i3 + 2] = -STARFIELD_CONFIG.BOUNDARY_Z
      } else if (positions[i3 + 2] < -STARFIELD_CONFIG.BOUNDARY_Z) {
        positions[i3 + 2] = STARFIELD_CONFIG.BOUNDARY_Z
      }
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <group>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={starSize}
          sizeAttenuation={true}
          depthWrite={false}
          alphaTest={0.001}
          opacity={1}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  )
}

function MouseTracker({ onMouseMove }: { onMouseMove: (pos: MousePosition) => void }) {
  const handleMouseMove = useCallback((event: globalThis.MouseEvent) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1
    const y = -(event.clientY / window.innerHeight) * 2 + 1
    onMouseMove({ x, y })
  }, [onMouseMove])

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return null
}

function ParallaxLayer({ mousePosition, children }: { mousePosition: MousePosition; children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame(() => {
    if (!groupRef.current) return
    // Soft parallax follow for an immersive cursor interaction
    const targetX = mousePosition.x * PARALLAX_CONFIG.PARALLAX_X_MULTIPLIER
    const targetY = mousePosition.y * PARALLAX_CONFIG.PARALLAX_Y_MULTIPLIER
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, PARALLAX_CONFIG.PARALLAX_LERP_SPEED)
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, PARALLAX_CONFIG.PARALLAX_LERP_SPEED)
    
    // Slight tilt based on cursor
    const rotY = mousePosition.x * PARALLAX_CONFIG.ROTATION_Y_MULTIPLIER
    const rotX = mousePosition.y * PARALLAX_CONFIG.ROTATION_X_MULTIPLIER
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotY, PARALLAX_CONFIG.PARALLAX_LERP_SPEED)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, rotX, PARALLAX_CONFIG.PARALLAX_LERP_SPEED)
  })
  
  return <group ref={groupRef}>{children}</group>
}

interface ThreeBackgroundContentProps {
  starCount?: number
  starSize?: number
}

export default function ThreeBackgroundContent({ starCount = STARFIELD_CONFIG.DEFAULT_STAR_COUNT, starSize = STARFIELD_CONFIG.DEFAULT_STAR_SIZE }: ThreeBackgroundContentProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [performanceMode, setPerformanceMode] = useState('high')

  const handleMouseMove = useCallback((position: MousePosition) => {
    // Smooth follow to amplify visibility of reaction
    setMousePosition(prev => ({
      x: THREE.MathUtils.lerp(prev.x, position.x, MOUSE_TRACKER_CONFIG.LERP_SPEED),
      y: THREE.MathUtils.lerp(prev.y, position.y, MOUSE_TRACKER_CONFIG.LERP_SPEED),
    }))
  }, [])

  React.useEffect(() => {
    // Performance detection with more granular checks
    const cores = window.navigator.hardwareConcurrency || 4
    const isMobile = window.innerWidth < 768
    const isTablet = window.innerWidth < 1024
    const isLowEnd = cores < 4 || isMobile
    const isMediumEnd = cores < 6 || isTablet
    
    // Additional performance check based on device memory (with type safety)
     
    const isLowMemory = 'deviceMemory' in window.navigator && window.navigator.deviceMemory && (window.navigator.deviceMemory as number) < 4
    
    if (isLowEnd || isLowMemory) {
      setPerformanceMode('low')
    } else if (isMediumEnd) {
      setPerformanceMode('medium')
    } else {
      setPerformanceMode('high')
    }
  }, [])

  // Adjust star count based on performance
  const adjustedStarCount = performanceMode === 'low' 
    ? STARFIELD_CONFIG.LOW_PERFORMANCE_STAR_COUNT 
    : performanceMode === 'medium' 
    ? STARFIELD_CONFIG.MEDIUM_PERFORMANCE_STAR_COUNT 
    : starCount

  return (
    <Canvas
      camera={{ position: [0, 0, CANVAS_CONFIG.CAMERA_POSITION_Z], fov: CANVAS_CONFIG.CAMERA_FOV }}
      style={{ background: '#000000' }}
      dpr={[1, 2]}
      performance={{ min: CANVAS_CONFIG.PERFORMANCE_MIN }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
    >
      <MouseTracker onMouseMove={handleMouseMove} />

      {/* Subtle lighting to keep stars visible on black */}
      {/* eslint-disable react/no-unknown-property */}
      <ambientLight intensity={CANVAS_CONFIG.AMBIENT_LIGHT_INTENSITY} color="#ffffff" />
      <pointLight 
        position={[mousePosition.x * 12, mousePosition.y * 12, 10]} 
        intensity={CANVAS_CONFIG.POINT_LIGHT_INTENSITY} 
        color="#ffffff" 
        distance={CANVAS_CONFIG.POINT_LIGHT_DISTANCE} 
        decay={CANVAS_CONFIG.POINT_LIGHT_DECAY} 
      />
      <directionalLight position={[0, 0, CANVAS_CONFIG.DIRECTIONAL_LIGHT_POSITION_Z]} intensity={CANVAS_CONFIG.DIRECTIONAL_LIGHT_INTENSITY} />
      {/* eslint-enable react/no-unknown-property */}
      {/* Interactive elements with advanced physics */}
      <ParallaxLayer mousePosition={mousePosition}>
        <InteractiveStars starCount={adjustedStarCount} starSize={starSize} mousePosition={mousePosition} />
      </ParallaxLayer>

      {/* Optional depth fog disabled for clarity */}
    </Canvas>
  )
}