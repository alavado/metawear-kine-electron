import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import { Quaternion, Matrix4 } from 'three'
import { useSelector } from 'react-redux'
import './Esqueleto.css'

const Esqueleto = ({rot}) => {

  const ref = useRef()

  useEffect(() => {
    const m4 = new Matrix4()
    m4.makeRotationFromQuaternion(new Quaternion(rot[1], rot[2], rot[3], rot[0]));
    ref.current.quaternion.setFromRotationMatrix(m4);
  }, [rot])

  return (
    <mesh
      ref={ref}
      onClick={e => console.log('click')}
      onPointerOver={e => console.log('hover')}
      onPointerOut={e => console.log('unhover')}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshNormalMaterial attach="material" />
    </mesh>
  )
}

const CanvasWrapped = () => {

  const dispositivos = useSelector(state => state.dispositivos.dispositivos)
  const rot = dispositivos[Object.keys(dispositivos)[0]]

  return (
    <div id="contenedor-canvas">
      <Canvas id="canvas-esqueleto">
        <Esqueleto rot={rot} />
      </Canvas>
    </div>
  )
}

export default CanvasWrapped
