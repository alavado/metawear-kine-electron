import React, { Suspense, useRef, useEffect, useMemo, useState } from 'react'
import { Canvas, useFrame, useLoader, extend, useThree, useRender } from 'react-three-fiber'
import { Quaternion, Matrix4 } from 'three'
import { useSelector } from 'react-redux'
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import './Esqueleto.css'

function getMousePos(e) {
  return { x: e.clientX, y: e.clientY };
}

function getMouseDegrees(x, y, degreeLimit) {
  let dx = 0,
    dy = 0,
    xdiff,
    xPercentage,
    ydiff,
    yPercentage;

  let w = { x: window.innerWidth, y: window.innerHeight };

  // Left (Rotates neck left between 0 and -degreeLimit)
  // 1. If cursor is in the left half of screen
  if (x <= w.x / 2) {
    // 2. Get the difference between middle of screen and cursor position
    xdiff = w.x / 2 - x;
    // 3. Find the percentage of that difference (percentage toward edge of screen)
    xPercentage = xdiff / (w.x / 2) * 100;
    // 4. Convert that to a percentage of the maximum rotation we allow for the neck
    dx = degreeLimit * xPercentage / 100 * -1;
  }

  // Right (Rotates neck right between 0 and degreeLimit)
  if (x >= w.x / 2) {
    xdiff = x - w.x / 2;
    xPercentage = xdiff / (w.x / 2) * 100;
    dx = degreeLimit * xPercentage / 100;
  }
  // Up (Rotates neck up between 0 and -degreeLimit)
  if (y <= w.y / 2) {
    ydiff = w.y / 2 - y;
    yPercentage = ydiff / (w.y / 2) * 100;
    // Note that I cut degreeLimit in half when she looks up
    dy = degreeLimit * 0.5 * yPercentage / 100 * -1;
  }
  // Down (Rotates neck down between 0 and degreeLimit)
  if (y >= w.y / 2) {
    ydiff = y - w.y / 2;
    yPercentage = ydiff / (w.y / 2) * 100;
    dy = degreeLimit * yPercentage / 100;
  }
  return { x: dx, y: dy };
}

function moveJoint(mouse, joint, degreeLimit = 40) {
  let degrees = getMouseDegrees(mouse.x, mouse.y, degreeLimit);
  joint.rotation.y = THREE.Math.degToRad(degrees.x);
  joint.rotation.x = THREE.Math.degToRad(degrees.y);
}

const Character = props => {

  const group = useRef();
  const gltf = useLoader(GLTFLoader, "/stacy.glb")
  const [neck, setNeck] = useState(undefined);
  const [waist, setWaist] = useState(undefined);
  const [bones, skeleton] = useMemo(() => {
    // By putting bones into the view Threejs removes it automatically from the
    // cached scene. Next time the component runs these two objects will be gone.
    // Since the gltf object is a permenently cached object, we can extend it here
    // and extend it with all the data we may need.
    if (!gltf.bones) gltf.bones = gltf.scene.children[0].children[0]
    if (!gltf.skeleton)
      gltf.skeleton = gltf.scene.children[0].children[1].skeleton

    gltf.scene.traverse(o => {
      // Reference the neck and waist bones
      if (o.isBone && o.name === "mixamorigNeck") {
        setNeck(o)
      }
      if (o.isBone && o.name === "mixamorigSpine") {
        setWaist(o)
      }
    })
    return [gltf.bones, gltf.skeleton]
  }, [gltf])

  const texture = useLoader(TextureLoader, "/stacy.jpg");
  const actions = useRef();
  const [mixer] = useState(() => new THREE.AnimationMixer());

  useEffect(() => {
    actions.current = {
      pockets: mixer.clipAction(gltf.animations[0], group.current),
      rope: mixer.clipAction(gltf.animations[1], group.current),
      swingdance: mixer.clipAction(gltf.animations[2], group.current),
      jump: mixer.clipAction(gltf.animations[3], group.current),
      react: mixer.clipAction(gltf.animations[4], group.current),
      shrug: mixer.clipAction(gltf.animations[5], group.current),
      wave: mixer.clipAction(gltf.animations[6], group.current),
      golf: mixer.clipAction(gltf.animations[7], group.current),
      idle: mixer.clipAction(gltf.animations[8], group.current)
    };
    actions.current.idle.play();
  }, [mixer, gltf]);

  useFrame((state, delta) => {
    mixer.update(delta);
    props.mousePosition && neck && moveJoint(props.mousePosition, neck);
    props.mousePosition && waist && moveJoint(props.mousePosition, waist);
  });

  // const ref = useRef()
  // useEffect(() => {
  //   const m4 = new Matrix4()
  //   m4.makeRotationFromQuaternion(new Quaternion(rot[1], rot[2], rot[3], rot[0]))
  //   ref.current.quaternion.setFromRotationMatrix(m4)
  // }, [rot])

  return (
    // <mesh ref={ref}>
    //   <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
    //   <meshNormalMaterial attach="material" />
    //   <skeleton>

    //   </skeleton>
    // </mesh>
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

extend({ OrbitControls });
const Controls = props => {
  const { gl, camera } = useThree();
  const ref = useRef();
  useRender(() => ref.current.update());
  return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />;
};

const Plane = ({ ...props }) => {
  return (
    <mesh {...props} receiveShadow>
      <planeGeometry attach="geometry" args={[5000, 5000, 1, 1]} />
      <meshLambertMaterial
        attach="material"
        color="#272727"
        transparent
        opacity={0.2}
      />
    </mesh>
  );
}
const d = 8.25;

const App = () => {
  const [mousePosition, setMousePosition] = useState({});
  return (
    <>
      <div className="bg" />
      <Canvas
        onMouseMove={e => setMousePosition(getMousePos(e))}
        shadowMap
        pixelRatio={window.devicePixelRatio}
        camera={{ position: [0, -3, 30] }}
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
            position={[0, -11, 0]}
            scale={[7, 7, 7]}
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
    </>
  );
}

// const CanvasWrapped = () => {

//   const dispositivos = useSelector(state => state.dispositivos.dispositivos)
//   const rot = dispositivos[Object.keys(dispositivos)[0]]

//   return (
//     <div id="contenedor-canvas">
//       <Canvas id="canvas-esqueleto">
//         <Esqueleto rot={rot} />
//       </Canvas>
//     </div>
//   )
// }

export default App
