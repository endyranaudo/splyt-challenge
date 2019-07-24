import React from 'react'
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps'

const Map = withScriptjs(withGoogleMap((props) => {
  const { drivers, lat, lng } = props

  return (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat, lng }}
    >
      {drivers && drivers.map(driver => {
        const { location } = driver
        const position = { lat: location.latitude, lng: location.longitude }
        return <Marker key={driver.driver_id} position={position} />
      })}
    </GoogleMap>
  )
}))

export default Map
