// ES6
import React, { useState } from 'react'
import ReactMapGL,{Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {strings} from 'res'
// import { PinDrop } from '@material-ui/icons';

function Map(props) {
    const [viewport, setViewport] = useState({
      width: '100%',
      height: '40vw',
      latitude: -2.971061,
      longitude: 119.6282669,
      zoom: 4
    });
  
    return (
      <ReactMapGL
      mapboxApiAccessToken={strings.MapboxApiKey}
        {...viewport}
        onViewportChange={nextViewport => setViewport(nextViewport)}
      >
    </ReactMapGL>
    );
}

export default Map