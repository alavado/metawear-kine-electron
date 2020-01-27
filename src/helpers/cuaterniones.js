export const obtenerAngulosDesdeCuaternionMetawear = q => {
  const { w, x, y, z } = q
  const sinr_cosp = 2 * (w * x + y * z)
  const cosr_cosp = 1 - 2 * (x * x + y * y)
  const roll = Math.atan2(sinr_cosp, cosr_cosp)

  const sinp = 2 * (w * y - z * x)
  let pitch
  if (Math.abs(sinp) >= 1)
      pitch = Math.sign(sinp) * Math.PI / 2 // use 90 degrees if out of range
  else
      pitch = Math.asin(sinp)

  const siny_cosp = 2 * (w * z + x * y)
  const cosy_cosp = 1 - 2 * (y * y + z * z)
  const yaw = Math.atan2(siny_cosp, cosy_cosp)

  return [rad2deg(roll), rad2deg(pitch), rad2deg(yaw)]
}

export const rad2deg = rad => Math.round(10 * rad * 360 / 6.28) / 10