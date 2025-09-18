import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function MorphingGeometry({ mousePosition }) {
  const meshRef = useRef()
  const geometryRef = useRef()
  const originalPositions = useRef()
  const velocities = useRef()

  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.5, 4) // Higher subdivision for smoother morphing
    
    // Store original positions for reference
    originalPositions.current = geo.attributes.position.array.slice()
    
    // Initialize velocities for each vertex
    const vertexCount = geo.attributes.position.count
    velocities.current = new Float32Array(vertexCount * 3)
    
    return geo
  }, [])

  useFrame((state, delta) => {
    if (meshRef.current && geometryRef.current && originalPositions.current) {
      const positions = geometryRef.current.attributes.position.array
      const vertexCount = positions.length / 3
      
      const time = state.clock.elapsedTime
      const mouseInfluence = 3.0
      const mouseX = mousePosition.x * mouseInfluence
      const mouseY = mousePosition.y * mouseInfluence
      const mouseZ = 0
      
      // Morphing parameters
      const morphStrength = 0.3
      const waveFrequency = 2.0
      const damping = 0.95
      const elasticity = 0.1
      
      for (let i = 0; i < vertexCount; i++) {
        const i3 = i * 3
        
        // Get original and current positions
        const originalX = originalPositions.current[i3]
        const originalY = originalPositions.current[i3 + 1]
        const originalZ = originalPositions.current[i3 + 2]
        
        const currentX = positions[i3]
        const currentY = positions[i3 + 1]
        const currentZ = positions[i3 + 2]
        
        // Calculate distance from mouse in world space
        const worldPos = new THREE.Vector3(currentX, currentY, currentZ)
        worldPos.applyMatrix4(meshRef.current.matrixWorld)
        
        const dx = mouseX * 2 - worldPos.x
        const dy = mouseY * 2 - worldPos.y
        const dz = mouseZ - worldPos.z
        
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)
        const maxInfluenceDistance = 4.0
        const influence = Math.max(0, 1 - distance / maxInfluenceDistance)
        
        // Gravitational attraction force
        const attractionForce = influence * influence * morphStrength
        const forceX = (dx / Math.max(distance, 0.1)) * attractionForce
        const forceY = (dy / Math.max(distance, 0.1)) * attractionForce
        const forceZ = (dz / Math.max(distance, 0.1)) * attractionForce * 0.5
        
        // Apply forces to velocities
        velocities.current[i3] += forceX * delta
        velocities.current[i3 + 1] += forceY * delta
        velocities.current[i3 + 2] += forceZ * delta
        
        // Add wave deformation
        const waveX = Math.sin(time * waveFrequency + originalX * 3) * influence * 0.1
        const waveY = Math.cos(time * waveFrequency + originalY * 3) * influence * 0.1
        const waveZ = Math.sin(time * waveFrequency + originalZ * 3) * influence * 0.05
        
        velocities.current[i3] += waveX * delta * 10
        velocities.current[i3 + 1] += waveY * delta * 10
        velocities.current[i3 + 2] += waveZ * delta * 10
        
        // Elastic restoration force toward original position
        const restoreX = (originalX - currentX) * elasticity
        const restoreY = (originalY - currentY) * elasticity
        const restoreZ = (originalZ - currentZ) * elasticity
        
        velocities.current[i3] += restoreX * delta * 5
        velocities.current[i3 + 1] += restoreY * delta * 5
        velocities.current[i3 + 2] += restoreZ * delta * 5
        
        // Apply damping
        velocities.current[i3] *= damping
        velocities.current[i3 + 1] *= damping
        velocities.current[i3 + 2] *= damping
        
        // Update positions
        positions[i3] += velocities.current[i3] * delta
        positions[i3 + 1] += velocities.current[i3 + 1] * delta
        positions[i3 + 2] += velocities.current[i3 + 2] * delta
        
        // Add organic breathing motion
        const breathingScale = 1 + Math.sin(time * 0.5 + i * 0.1) * 0.05
        positions[i3] *= breathingScale
        positions[i3 + 1] *= breathingScale
        positions[i3 + 2] *= breathingScale
      }
      
      // Update geometry
      geometryRef.current.attributes.position.needsUpdate = true
      geometryRef.current.computeVertexNormals() // Recalculate normals for proper lighting
      
      // Animate the entire mesh
      const overallInfluence = Math.min(1, Math.sqrt(mousePosition.x * mousePosition.x + mousePosition.y * mousePosition.y))
      
      meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.2 + mousePosition.y * 0.3
      meshRef.current.rotation.y = Math.sin(time * 0.2) * 0.3 + mousePosition.x * 0.3
      meshRef.current.rotation.z = Math.sin(time * 0.4) * 0.1 + overallInfluence * 0.2
      
      // Scale based on mouse proximity
      const dynamicScale = 1 + overallInfluence * 0.3 + Math.sin(time) * 0.1
      meshRef.current.scale.setScalar(dynamicScale)
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh ref={meshRef} position={[2, -1, -6]}>
        <primitive object={geometry} ref={geometryRef} />
        <meshStandardMaterial
          color="#8a4fff"
          wireframe={false}
          transparent
          opacity={0.7}
          emissive="#4a1a7a"
          emissiveIntensity={0.2}
          roughness={0.3}
          metalness={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  )
}


export { MorphingGeometry }