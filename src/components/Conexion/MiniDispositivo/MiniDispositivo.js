import React from 'react'
import './MiniDispositivo.css'

const MiniDispositivo = props => {

  const { rot } = props
  return (
    <div className="tridiv">
      <div className="scene" style={{transform: `rotateX(80deg) matrix3d(${rot})`}}>
        <div className="shape cuboid-1 cub-1">
          <div className="face ft">
            <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.15)',}}></div>
          </div>
          <div className="face bk">
            <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.15)',}}></div>
          </div>
          <div className="face rt">
            <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.15)',}}></div>
          </div>
          <div className="face lt">
            <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.15)',}}></div>
          </div>
          <div className="face bm">
            <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.15)',}}></div>
          </div>
          <div className="face tp">
            <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.15)',}}></div>
          </div>
          <div className="cr cr-0">
            <div className="face side s0">
              <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.11)',}}></div>
            </div>
            <div className="face side s1">
              <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.075)',}}></div>
            </div>
            <div className="face side s2">
              <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.11)',}}></div>
            </div>
          </div>
          <div className="cr cr-1">
            <div className="face side s0">
              <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.196)',}}></div>
            </div>
            <div className="face side s1">
              <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.3)',}}></div>
            </div>
            <div className="face side s2">
              <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.404)',}}></div>
            </div>
          </div>
          <div className="cr cr-2">
            <div className="face side s0">
              <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.49)',}}></div>
            </div>
            <div className="face side s1">
              <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.525)',}}></div>
            </div>
            <div className="face side s2">
              <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.49)',}}></div>
            </div>
          </div>
          <div className="cr cr-3">
            <div className="face side s0">
              <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.404)',}}></div>
            </div>
            <div className="face side s1">
              <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.298)',}}></div>
            </div>
            <div className="face side s2">
              <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.196)',}}></div>
            </div>
          </div>
        </div>
        <div className="shape cylinder-1 cyl-1">
          <div className="face bm">
            <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.15)',}}></div>
          </div>
          <div className="face tp">
            <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.15)',}}></div>
          </div>
          <div className="face side s0">
            <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.118)',}}></div>
          </div>
          <div className="face side s1">
            <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.08)',}}></div>
          </div>
          <div className="face side s2">
            <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.09)',}}></div>
          </div>
          <div className="face side s3">
            <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.15)',}}></div>
          </div>
          <div className="face side s4">
            <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.23)',}}></div>
          </div>
          <div className="face side s5">
            <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.32)',}}></div>
          </div>
          <div className="face side s6">
            <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.41)',}}></div>
          </div>
          <div className="face side s7">
            <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.482)',}}></div>
          </div>
          <div className="face side s8">
            <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.52)',}}></div>
          </div>
          <div className="face side s9">
            <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.51)',}}></div>
          </div>
          <div className="face side s10">
            <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.15)',}}></div>
          </div>
          <div className="face side s11">
            <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.37)',}}></div>
          </div>
          <div className="face side s12">
            <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.28)',}}></div>
          </div>
          <div className="face side s13">
            <div className="photon-shader" style={{backgroundColor: 'rgba(0, 0, 0, 0.19)',}}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MiniDispositivo
