import React, { useState, useEffect, Fragment } from 'react';
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

const Map = ({ confirmedCases, usData }) => {
  const [mapData, setMapData] = useState({ markers: [] });

  //This value must be set to the same value of the default zoom prop in Map component
  const [zoom, setZoom] = useState(3);

  let data = {
    markers: [],
  };

  const formatData = () => {
    // Get data with valid country names
    const a = confirmedCases.locations
      .filter((element) => element.country !== undefined)
      .filter((element) => element.latest > 0)
      .filter((element) => element.country !== 'US');

    // Map data to retrieve coordinates, latest, country, province
    const c = a.map((element) => {
      return {
        coords: element.coordinates,
        latest: element.latest,
        country: element.country,
        province: element.province,
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
        key: `US_${index}`,
        latest: key.latest,
        position: [parseFloat(key.coords.lat), parseFloat(key.coords.long)],
        content,
      });
    }
    data.markers.push(...newMarkers);
  };

  const formatUSData = () => {
    const arr = usData.locations
      .filter((element) => element.country !== undefined)
      .filter((element) => element.latest.confirmed > 0);

    // Map data to retrieve coordinates, latest, country, province
    const c = arr.map((element) => {
      return {
        coords: {
          lat: element.coordinates.latitude,
          long: element.coordinates.longitude,
        },
        latest: element.latest.confirmed,
        country: element.country,
        province: element.province,
        county: element.county,
      };
    });
    const newMarkers = [];
    for (let [index, key] of c.entries()) {
      const content =
        key.county === ''
          ? key.province === ''
            ? `${key.country}: ${key.latest} Confirmed Cases`
            : `${key.province}, ${key.country}: ${key.latest} Confirmed Cases`
          : `${key.county}, ${key.province}, ${key.country}: ${key.latest} Confirmed Cases`;

      newMarkers.push({
        key: index,
        latest: key.latest,
        position: [parseFloat(key.coords.lat), parseFloat(key.coords.long)],
        content,
      });
    }
    data.markers.push(...newMarkers);
  };

  useEffect(() => {
    formatData();
    formatUSData();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (data.markers.length > 0) {
      setMapData(data);
    }
    //eslint-disable-next-line
  }, [formatData, formatUSData]);

  const zoomChange = (e) => {
    setZoom(e.target._zoom);
  };

  return (
    <LeafletMap
      center={[28, 0]}
      zoom={2}
      minZoom={2}
      onZoomEnd={(e) => zoomChange(e)}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {mapData ? (
        <MyMarkersList markers={mapData.markers} zoomLevel={zoom} />
      ) : (
        <div>loading...</div>
      )}
    </LeafletMap>
  );
};

export default Map;
