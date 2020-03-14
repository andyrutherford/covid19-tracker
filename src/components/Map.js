// import React from 'react';
// import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

// class Map extends React.Component {
//   render() {
//     return (
//       <LeafletMap
//         center={[50, 10]}
//         zoom={6}
//         maxZoom={10}
//         attributionControl={true}
//         zoomControl={true}
//         doubleClickZoom={true}
//         scrollWheelZoom={true}
//         dragging={true}
//         animate={true}
//         easeLinearity={0.35}
//       >
//         <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
//         <Marker position={[50, 10]}>
//           <Popup>Popup for any custom information.</Popup>
//         </Marker>
//       </LeafletMap>
//     );
//   }
// }

// export default Map;

import React, { useState, useEffect, Fragment } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

const MyPopupMarker = ({ content, position }) => (
  <Marker position={position}>
    <Popup>{content}</Popup>
  </Marker>
);

const MyMarkersList = ({ markers }) => {
  console.log(markers);
  const items = markers.map(({ key, ...props }) => (
    <MyPopupMarker key={key} {...props} />
  ));
  return <Fragment>{items}</Fragment>;
};

const Map = ({ confirmedCases }) => {
  const [mapData, setMapData] = useState(null);

  const formatData = () => {
    const a = confirmedCases.locations
      .filter(element => element.country === 'US')
      .slice(0, 50);
    console.log(a);
    const b = a.map(element => element.coordinates);
    console.log(b);
    const newMarkers = [];
    for (let key of b) {
      newMarkers.push({
        key: 'myKey',
        position: [parseInt(key.lat), parseInt(key.long)],
        content: 'myContent'
      });
    }

    const mapState = {
      markers: newMarkers
    };

    console.log(mapState);

    setMapData(mapState);
  };

  useEffect(() => {
    formatData();
  }, []);

  // const state = {
  //   markers: [
  //     { key: 'marker1', position: [51.5, -0.1], content: 'My first popup' },
  //     { key: 'marker2', position: [51.51, -0.1], content: 'My second popup' },
  //     { key: 'marker3', position: [51.49, -0.05], content: 'My third popup' }
  //   ]
  // };

  return (
    <LeafletMap center={[51.505, -0.09]} zoom={13}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {mapData ? (
        <MyMarkersList markers={mapData.markers} />
      ) : (
        <div>loading...</div>
      )}
    </LeafletMap>
  );
};

export default Map;
