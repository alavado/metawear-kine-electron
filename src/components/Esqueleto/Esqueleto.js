import React, { Suspense, useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useLoader, extend, useThree, useRender } from 'react-three-fiber'
import { Quaternion, Matrix4 } from 'three'
import { useSelector, useDispatch } from 'react-redux'
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { TextureLoader } from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import './Esqueleto.css'
import _ from 'lodash'
import { actualizarAngulosSegmento, actualizarCuaternionSegmento } from '../../redux/actions'
import { rad2deg } from '../../helpers/cuaterniones'

function getMousePos(e) {
  return { x: e.clientX, y: e.clientY }
}

function getMouseDegrees(x, y, degreeLimit) {
  let dx = 0,
    dy = 0,
    xdiff,
    xPercentage,
    ydiff,
    yPercentage

  let w = { x: window.innerWidth, y: window.innerHeight }

  // Left (Rotates neck left between 0 and -degreeLimit)
  // 1. If cursor is in the left half of screen
  if (x <= w.x / 2) {
    // 2. Get the difference between middle of screen and cursor position
    xdiff = w.x / 2 - x
    // 3. Find the percentage of that difference (percentage toward edge of screen)
    xPercentage = xdiff / (w.x / 2) * 100
    // 4. Convert that to a percentage of the maximum rotation we allow for the neck
    dx = degreeLimit * xPercentage / 100 * -1
  }

  // Right (Rotates neck right between 0 and degreeLimit)
  if (x >= w.x / 2) {
    xdiff = x - w.x / 2
    xPercentage = xdiff / (w.x / 2) * 100
    dx = degreeLimit * xPercentage / 100
  }
  // Up (Rotates neck up between 0 and -degreeLimit)
  if (y <= w.y / 2) {
    ydiff = w.y / 2 - y
    yPercentage = ydiff / (w.y / 2) * 100
    // Note that I cut degreeLimit in half when she looks up
    dy = degreeLimit * 0.5 * yPercentage / 100 * -1
  }
  // Down (Rotates neck down between 0 and degreeLimit)
  if (y >= w.y / 2) {
    ydiff = y - w.y / 2
    yPercentage = ydiff / (w.y / 2) * 100
    dy = degreeLimit * yPercentage / 100
  }
  return { x: dx, y: dy }
}

function moveJoint(rot, joint, dispatch, otros = []) {
  const m4 = new Matrix4()
  const { x, y, z, w } = rot
  let cuaternionSegmento = new Quaternion(y, x, -z, w)
  if (otros.length === 1) {
    const cuaternionBrazo = new Quaternion(otros[0].y, otros[0].x, -otros[0].z, otros[0].w)
    cuaternionSegmento = cuaternionBrazo.conjugate().multiply(cuaternionSegmento)
  }
  else if (otros.length === 2) {
    const cuaternionAntebrazo = new Quaternion(otros[0].y, otros[0].x, -otros[0].z, otros[0].w)
    const cuaternionBrazo = new Quaternion(otros[1].y, otros[1].x, -otros[1].z, otros[1].w)
    const cuaternionAntebrazoCorregido = cuaternionBrazo.conjugate().multiply(cuaternionAntebrazo)
    cuaternionSegmento = (new Quaternion(otros[1].y, otros[1].x, -otros[1].z, otros[1].w)).conjugate().multiply(cuaternionAntebrazoCorregido.conjugate().multiply(cuaternionSegmento))
  }
  m4.makeRotationFromQuaternion(cuaternionSegmento)
  joint.quaternion.setFromRotationMatrix(m4)
  const { _x, _y, _z } = joint.rotation
  switch(joint.name) {
    case 'mixamorigRightHand':
      dispatch(actualizarAngulosSegmento('mano derecha', [_x, _y, _z]))
      dispatch(actualizarCuaternionSegmento('mano derecha', cuaternionSegmento))
      break
    case 'mixamorigRightForeArm':
      dispatch(actualizarAngulosSegmento('antebrazo derecho', [_x, _y, _z]))
      dispatch(actualizarCuaternionSegmento('antebrazo derecho', cuaternionSegmento))
      break
    case 'mixamorigRightArm':
      dispatch(actualizarAngulosSegmento('brazo derecho', [_x, _y, _z]))
      dispatch(actualizarCuaternionSegmento('brazo derecho', cuaternionSegmento))
      break
    case 'mixamorigRightShoulder':
      dispatch(actualizarAngulosSegmento('tronco', [_x, _y, _z]))
      dispatch(actualizarCuaternionSegmento('tronco', cuaternionSegmento))
      break
  }
}

const Character = props => {

  const group = useRef()
  const gltf = useLoader(GLTFLoader, "/stacy.glb")
  const [neck, setNeck] = useState(undefined)
  const [waist, setWaist] = useState(undefined)
  const [shoulder, setShoulder] = useState(undefined)
  const [arm, setArm] = useState(undefined)
  const [hand, setHand] = useState(undefined)
  const [bones, skeleton] = useMemo(() => {
    // By putting bones into the view Threejs removes it automatically from the
    // cached scene. Next time the component runs these two objects will be gone.
    // Since the gltf object is a permenently cached object, we can extend it here
    // and extend it with all the data we may need.
    if (!gltf.bones) {
      gltf.bones = gltf.scene.children[0].children[0]
    }
    if (!gltf.skeleton) {
      gltf.skeleton = gltf.scene.children[0].children[1].skeleton
    }
    gltf.scene.traverse(o => {
      // Reference the neck and waist bones
      if (!o.isBone) {
        return
      }
      if (o.name === "mixamorigNeck") {
        setNeck(o)
      }
      else if (o.name === "mixamorigRightShoulder") {
        setWaist(o)
      }
      else if (o.name === "mixamorigRightArm") {
        setShoulder(o)
      }
      if (o.name === "mixamorigRightForeArm") {
        setArm(o)
      }
      if (o.name === "mixamorigRightHand") {
        setHand(o)
      }
    })
    return [gltf.bones, gltf.skeleton]
  }, [gltf])

  const texture = useLoader(TextureLoader, "/stacy.jpg")
  //const [mixer] = useState(() => new THREE.AnimationMixer())

  useFrame((state, delta) => {
    //mixer.update(delta)
    const { dispositivos, dispatch } = props
    shoulder && moveJoint(dispositivos[2].q, shoulder, dispatch)
    arm && moveJoint(dispositivos[1].q, arm, dispatch, [dispositivos[2].q])
    hand && moveJoint(dispositivos[0].q, hand, dispatch, [dispositivos[1].q, dispositivos[2].q])
    //waist && moveJoint(props.dispositivos[0].q, waist, props.dispatch)
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <object3D
        name="Stacy"
        rotation={[1.5707964611537577, 0, 0]}
        scale={[
          0.009999999776482582,
          0.009999999776482582,
          0.009999999776482582
        ]}
      >
        <primitive object={bones} />
        <skinnedMesh
          name="stacy"
          rotation={[-1.5707964611537577, 0, 0]}
          scale={[100, 100, 99.9999771118164]}
          skeleton={skeleton}
        >
          <bufferGeometry attach="geometry" {...gltf.__$[67].geometry} />
          <meshPhongMaterial attach="material" {...gltf.__$[67].material}>
            <texture attach="map" {...texture} flipY={false} />
          </meshPhongMaterial>
        </skinnedMesh>
      </object3D>
    </group>
  )
}

extend({ OrbitControls })
const Controls = props => {
  const { gl, camera } = useThree()
  const ref = useRef()
  useRender(() => ref.current.update())
  return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />
}

const Plane = ({ ...props }) => {
  return (
    <mesh {...props} receiveShadow>
      <planeGeometry attach="geometry" args={[5000, 5000, 1, 1]} />
      <meshLambertMaterial
        attach="material"
        color="#22372B"
        transparent
        opacity={0.2}
      />
    </mesh>
  )
}

const App = () => {
  const d = 8.25
  const [mousePosition, setMousePosition] = useState({})
  const dispatch = useDispatch()
  const { dispositivos } = useSelector(state => state.dispositivos)
  const { segmentos } = useSelector(state => state.segmentos)

  // hay que orientar el cuerpo basados en el pecho
  // if (_.isEmpty(dispositivos)) {
  //   return null
  // }
  
  return (
    <div className="contenedor-esqueleto">
      <div className="visualizacion">
        <div className="bg" />
        <Canvas
          onMouseMove={e => setMousePosition(getMousePos(e))}
          shadowMap
          pixelRatio={window.devicePixelRatio}
          camera={{ position: [0, 0, 15] }}
          gl2
          id="canvas-esqueleto"
        >
          <hemisphereLight
            skyColor={"black"}
            groundColor={0xffffff}
            intensity={0.68}
            position={[0, 50, 0]}
          />
          <directionalLight
            position={[-8, 12, 8]}
            shadowCameraLeft={d * -1}
            shadowCameraBottom={d * -1}
            shadowCameraRight={d}
            shadowCameraTop={d}
            shadowCameraNear={0.1}
            shadowCameraFar={1500}
            castShadow
          />
          <Plane rotation={[-0.5 * Math.PI, 0, 0]} position={[0, -11, 0]} />
          <Suspense fallback={null}>
            <Character
              mousePosition={mousePosition}
              position={[0, -7, 0]}
              scale={[7, 7, 7]}
              dispositivos={dispositivos}
              dispatch={dispatch}
            />
          </Suspense>
          <Controls
            dampingFactor={0.5}
            rotateSpeed={1}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Canvas>
        <div className="layer" />
      </div>
      <div className="barra-derecha">
        {segmentos.map(({nombre, angulos}) => (
          <div className="angulos-segmento">
            <h3>{nombre}</h3>
            <ul>
              {angulos.filter(a => a.nombre !== '').map(a => (
                <li key={a.nombre}><h4>{a.nombre}</h4><p>{rad2deg(a.valor)} °</p></li>)
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App