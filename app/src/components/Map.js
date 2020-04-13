import React, { useState, Fragment } from 'react';
import {
  Map as LeafletMap,
  TileLayer,
  CircleMarker,
  Popup,
} from 'react-leaflet';

const MyPopupMarker = ({ content, position, latest, zoomLevel }) => {
  const generateRadius = (latest) => {
    // Minimum radius size is 5
    // Maximum radius size is ~50

    //Set size of circle markers (between 1 to 3)
    //const markerSize = 1.5;
    const markerSize = zoomLevel * 0.3;
    //return Math.log(latest) * 2.5 < 5 ? 5 : Math.log(latest) * markerSize;
    return Math.log(latest) * markerSize + markerSize;
  };

  return (
    <CircleMarker
      center={[position[0], position[1]]}
      radius={generateRadius(latest)}
      fillColor='red'
      fillOpacity={0.5}
      stroke={false}
    >
      <Popup>{content}</Popup>
    </CircleMarker>
  );
};

const MyMarkersList = ({ markers, zoomLevel }) => {
  const zoom = zoomLevel;
  const items = markers.map(({ key, ...props }) => (
    <MyPopupMarker zoomLevel={zoom} key={key} {...props} />
  ));
  return <Fragment>{items}</Fragment>;
};

const Map = ({ mapData, center, zoom }) => {
  //This value must be set to the same value of the default zoom prop in Map component
  const [zoomLevel, setZoomLevel] = useState(3);

  const zoomChange = (e) => {
    setZoomLevel(e.target._zoom);
  };

  return (
    <LeafletMap
      center={center}
      zoom={zoom}
      minZoom={2}
      onZoomEnd={(e) => zoomChange(e)}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {mapData ? (
        <MyMarkersList markers={mapData.markers} zoomLevel={zoomLevel} />
      ) : (
        <div>loading...</div>
      )}
    </LeafletMap>
  );
};

export default Map;
