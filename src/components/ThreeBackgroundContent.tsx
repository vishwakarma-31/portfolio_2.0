import React, { useRef, useMemo, useState, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { MousePosition } from '../types'

function InteractiveStars({ starCount = 1500, starSize = 0.08, mousePosition }: { starCount?: number; starSize?: number; mousePosition: MousePosition }) {
  const ref = useRef<THREE.Points>(null)
  const originalPositions = useRef<Float32Array | null>(null)
  const velocities = useRef<Float32Array | null>(null)
  const masses = useRef<Float32Array | null>(null)

  const [sphere] = useMemo(() => {
    const sphere = new Float32Array(starCount * 3)
    const vel = new Float32Array(starCount * 3)
    const mass = new Float32Array(starCount)
    
    for (let i = 0; i < starCount; i++) {
      sphere[i * 3] = (Math.random() - 0.5) * 200
      sphere[i * 3 + 1] = (Math.random() - 0.5) * 200
      sphere[i * 3 + 2] = (Math.random() - 0.5) * 100
      
      // Initialize velocities
      vel[i * 3] = (Math.random() - 0.5) * 0.01
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01
      
      // Random masses for varied gravitational response
      mass[i] = 0.5 + Math.random() * 1.5
    }
    
    originalPositions.current = sphere.slice()
    velocities.current = vel
    masses.current = mass
    return [sphere]
  }, [starCount])

  useFrame((state, delta) => {
    if (ref.current && originalPositions.current && velocities.current && masses.current) {
      const positions = ref.current.geometry.attributes.position.array
      const t = state.clock.getElapsedTime()
      
      // Cursor-driven gravitational physics (no auto motion)
      const mouseInfluence = 24.0
      const mouseX = mousePosition.x * mouseInfluence
      const mouseY = mousePosition.y * mouseInfluence
      const mouseZ = 0
      
      const gravitationalConstant = 1.0
      const damping = 0.985
      const maxVelocity = 0.22
      // Gentle autonomous drifting parameters
      const driftAngularSpeed = 0.15
      const driftMagnitude = 0.006
      
      for (let i = 0; i < starCount; i++) {
        const i3 = i * 3
        const currentX = positions[i3]
        const currentY = positions[i3 + 1] 
        const currentZ = positions[i3 + 2]
        
        // Calculate gravitational force toward cursor
        const dx = mouseX * 4 - currentX
        const dy = mouseY * 4 - currentY
        const dz = mouseZ - currentZ
        
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)
        const minDistance = 2.0
        const safeDistance = Math.max(distance, minDistance)
        
        // Gravitational force (F = G * m1 * m2 / r²)
        const force = gravitationalConstant * masses.current[i] / (safeDistance * safeDistance)
        const forceX = (dx / safeDistance) * force
        const forceY = (dy / safeDistance) * force
        const forceZ = (dz / safeDistance) * force * 0.5
        
        // Update velocities with gravitational acceleration
        velocities.current[i3] += forceX * delta
        velocities.current[i3 + 1] += forceY * delta
        velocities.current[i3 + 2] += forceZ * delta
        
        // Add subtle autonomous drift so stars move slowly even without cursor
        const angle = t * driftAngularSpeed + i * 0.21
        const driftX = Math.cos(angle) * driftMagnitude
        const driftY = Math.sin(angle * 1.1) * driftMagnitude
        const driftZ = Math.sin(angle * 0.7) * (driftMagnitude * 0.25)
        velocities.current[i3] += driftX * delta
        velocities.current[i3 + 1] += driftY * delta
        velocities.current[i3 + 2] += driftZ * delta
        
        // Apply damping
        velocities.current[i3] *= damping
        velocities.current[i3 + 1] *= damping
        velocities.current[i3 + 2] *= damping
        
        // Limit maximum velocity
        const vel = Math.sqrt(
          velocities.current[i3] * velocities.current[i3] +
          velocities.current[i3 + 1] * velocities.current[i3 + 1] +
          velocities.current[i3 + 2] * velocities.current[i3 + 2]
        )
        
        if (vel > maxVelocity) {
          const scale = maxVelocity / vel
          velocities.current[i3] *= scale
          velocities.current[i3 + 1] *= scale
          velocities.current[i3 + 2] *= scale
        }
        
        // Update positions
        positions[i3] += velocities.current[i3]
        positions[i3 + 1] += velocities.current[i3 + 1]
        positions[i3 + 2] += velocities.current[i3 + 2]
        
        // Endless boundary - wrap around instead of bounce
        const boundary = 140
        if (Math.abs(positions[i3]) > boundary) {
          positions[i3] = -Math.sign(positions[i3]) * boundary
        }
        if (Math.abs(positions[i3 + 1]) > boundary) {
          positions[i3 + 1] = -Math.sign(positions[i3 + 1]) * boundary
        }
        if (Math.abs(positions[i3 + 2]) > 70) {
          positions[i3 + 2] = -Math.sign(positions[i3 + 2]) * 70
        }
      }
      
      ref.current.geometry.attributes.position.needsUpdate = true
    }
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



/* Unused trail effect kept for future use
function ParticleTrails({ mousePosition }: { mousePosition: MousePosition }) {
  const trailRef = useRef<THREE.Points>(null)
  const particleHistory = useRef<Array<{position: [number, number, number], life: number, size: number}>>([])
  const maxTrailLength = 50
  
  const trailGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(maxTrailLength * 3)
    const colors = new Float32Array(maxTrailLength * 3)
    const sizes = new Float32Array(maxTrailLength)
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    
    return geometry
  }, [])

  useFrame((_) => {
    if (trailRef.current) {
      // Add new particle to trail
      const newParticle = {
        position: [mousePosition.x * 5, mousePosition.y * 5, 0] as [number, number, number],
        life: 1.0,
        size: Math.random() * 0.5 + 0.2
      }
      
      particleHistory.current.unshift(newParticle)
      
      if (particleHistory.current.length > maxTrailLength) {
        particleHistory.current.pop()
      }
      
      // Update trail geometry
      const positions = trailRef.current.geometry.attributes.position.array
      const colors = trailRef.current.geometry.attributes.color.array
      const sizes = trailRef.current.geometry.attributes.size.array
      
      particleHistory.current.forEach((particle, i) => {
        if (i < maxTrailLength) {
          // Position
          positions[i * 3] = particle.position[0]
          positions[i * 3 + 1] = particle.position[1]
          positions[i * 3 + 2] = particle.position[2]
          
          // Color with fade
          const fade = particle.life * (1 - i / maxTrailLength)
          colors[i * 3] = 0.2 + fade * 0.8 // Cyan
          colors[i * 3 + 1] = 0.8 + fade * 0.2
          colors[i * 3 + 2] = 1.0
          
          // Size
          sizes[i] = particle.size * fade
          
          // Age the particle
          particle.life *= 0.98
        }
      })
      
      // Update geometry
      trailRef.current.geometry.attributes.position.needsUpdate = true
      trailRef.current.geometry.attributes.color.needsUpdate = true
      trailRef.current.geometry.attributes.size.needsUpdate = true
    }
  })

  return (
    <points ref={trailRef} geometry={trailGeometry}>
      <pointsMaterial
        transparent
        vertexColors
        size={0.1}
        sizeAttenuation
        alphaTest={0.001}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
*/

function MouseTracker({ onMouseMove }: { onMouseMove: (pos: MousePosition) => void }) {

  const handleMouseMove = useCallback((event: MouseEvent) => {
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

export default function ThreeBackgroundContent({ starCount = 1800, starSize = 0.08 }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [performanceMode, setPerformanceMode] = useState('high')

  const handleMouseMove = useCallback((position: MousePosition) => {
    // Smooth follow to amplify visibility of reaction
    setMousePosition(prev => ({
      x: THREE.MathUtils.lerp(prev.x, position.x, 0.35),
      y: THREE.MathUtils.lerp(prev.y, position.y, 0.35)
    }))
  }, [])

  React.useEffect(() => {
    // Performance detection
    const cores = navigator.hardwareConcurrency || 4
    const isMobile = window.innerWidth < 768
    const isLowEnd = cores < 4 || isMobile

    if (isLowEnd) {
      setPerformanceMode('low')
    } else if (cores < 8) {
      setPerformanceMode('medium')
    } else {
      setPerformanceMode('high')
    }
  }, [])

  // Adjust star count based on performance
  const adjustedStarCount = performanceMode === 'low' ? 300 : performanceMode === 'medium' ? 900 : starCount
  
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 65 }}
      style={{ background: performanceMode === 'low' ? '#000000' : '#000000' }}
      dpr={[1, 2]}
      performance={{ min: 0.3 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
    >
      <MouseTracker onMouseMove={handleMouseMove} />
      
      {/* Subtle lighting to keep stars visible on black */}
      <ambientLight intensity={0.2} color="#ffffff" />
      <pointLight 
        position={[mousePosition.x * 12, mousePosition.y * 12, 10]} 
        intensity={0.9} 
        color="#ffffff"
        distance={28}
        decay={2}
      />
      <directionalLight position={[0, 0, 5]} intensity={0.2} />
      
      {/* Interactive elements with advanced physics */}
      <ParallaxLayer mousePosition={mousePosition}>
        <InteractiveStars
          starCount={adjustedStarCount}
          starSize={starSize}
          mousePosition={mousePosition}
        />
      </ParallaxLayer>
      
      {/* Optional depth fog disabled for clarity */}
    </Canvas>
  )
}

function ParallaxLayer({ mousePosition, children }: { mousePosition: MousePosition; children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame(() => {
    if (!groupRef.current) return
    // Soft parallax follow for an immersive cursor interaction
    const targetX = mousePosition.x * -1.6
    const targetY = mousePosition.y * -1.0
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05)
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05)
    
    // Slight tilt based on cursor
    const rotY = mousePosition.x * 0.12
    const rotX = mousePosition.y * -0.08
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotY, 0.05)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, rotX, 0.05)
  })
  
  return <group ref={groupRef}>{children}</group>
}