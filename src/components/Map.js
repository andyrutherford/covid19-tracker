import React, { useState, useEffect, Fragment } from 'react';
import {
  Map as LeafletMap,
  TileLayer,
  CircleMarker,
  Popup
} from 'react-leaflet';

const MyPopupMarker = ({ content, position, latest }) => {
  const generateRadius = latest => {
    // Minimum radius size is 5
    // Maximum radius size is ~50

    //Set size of circle markers (between 1 to 3)
    const markerSize = 1.5;
    return Math.log(latest) * 2.5 < 5 ? 5 : Math.log(latest) * markerSize;
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

const MyMarkersList = ({ markers }) => {
  const items = markers.map(({ key, ...props }) => (
    <MyPopupMarker key={key} {...props} />
  ));
  return <Fragment>{items}</Fragment>;
};

const Map = ({ confirmedCases }) => {
  const [mapData, setMapData] = useState(null);

  const formatData = () => {
    // Get data with valid country names
    const a = confirmedCases.locations
      .filter(element => element.country !== undefined)
      .filter(element => element.latest > 0);

    // Map data to retrieve coordinates, latest, country, province
    const c = a.map(element => {
      return {
        coords: element.coordinates,
        latest: element.latest,
        country: element.country,
        province: element.province
      };
    });

    // Create and format new markers data
    const newMarkers = [];
    for (let [index, key] of c.entries()) {
      const content =
        key.province === ''
          ? `${key.country}: ${key.latest} Confirmed Cases`
          : `${key.province}, ${key.country}: ${key.latest} Confirmed Cases`;
      newMarkers.push({
        key: index,
        latest: key.latest,
        position: [parseInt(key.coords.lat), parseInt(key.coords.long)],
        content
      });
    }
    const mapState = {
      markers: newMarkers
    };
    setMapData(mapState);
  };

  useEffect(() => {
    formatData();
    //eslint-disable-next-line
  }, []);

  return (
    <LeafletMap center={[37.091226, -95.875351]} zoom={2}>
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
