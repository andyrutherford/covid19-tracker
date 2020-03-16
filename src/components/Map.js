import React, { useState, useEffect, Fragment } from 'react';
import {
  Map as LeafletMap,
  TileLayer,
  Marker,
  CircleMarker,
  Popup,
  Circle
} from 'react-leaflet';
import L from 'leaflet';

// const customMarker = L.icon({ iconUrl: require('./pin.svg') });

const MyPopupMarker = ({ content, position, latest }) => {
  // const radius = latest * 25;
  // return (
  //   <Marker position={position}>
  //     <Popup>{content}</Popup>
  //     <Circle
  //       center={{
  //         lat: position[0],
  //         lng: position[1]
  //       }}
  //       fillColor='red'
  //       radius={radius}
  //       fillOpacity={0.5}
  //       stroke={false}
  //     />
  //   </Marker>
  // );
  // console.log(20 * Math.log(latest / 1000));

  const generateRadius = latest => {
    // max possible is 100k
    // what percent of 100k is the latest data, for example 25,000 of 100,000, so latest of 25k is 25% of 100k
    // 25k / 100k
    // latest / 100k -> percent of max
    // 50 * percent -> value

    // 70/100,000 = .0007
    // 50 * .0007 -> way less than 5

    //min must be 10k

    // const min = 5;
    // const max = 50;
    // if (latest < 10000) {
    //   return min;
    // } else {
    //   // latest is greater than 10000
    //   // so x is at least .1
    //   const x = latest / 100000;
    //   const y = 50 * x;
    //   console.log(y);
    // }
    // return 5;

    return Math.log(latest) * 2.5 < 5 ? 5 : Math.log(latest) * 2.5;
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
    const a = confirmedCases.locations.filter(
      element => element.country !== undefined
    );

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
    console.log(newMarkers);
    const mapState = {
      markers: newMarkers
    };
    setMapData(mapState);
  };

  useEffect(() => {
    formatData();
    //eslint-disable-next-line
  }, []);

  // const state = {
  //   markers: [
  //     { key: 'marker1', position: [51.5, -0.1], content: 'My first popup' },
  //     { key: 'marker2', position: [51.51, -0.1], content: 'My second popup' },
  //     { key: 'marker3', position: [51.49, -0.05], content: 'My third popup' }
  //   ]
  // };

  return (
    <LeafletMap center={[37.091226, -95.875351]} zoom={3}>
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

// import React, { Component } from 'react';
// import {
//   Map as LeafletMap,
//   TileLayer,
//   Marker,
//   Tooltip,
//   Popup,
//   Circle
// } from 'react-leaflet';
// import axios from 'axios';

// const url = 'https://api.spacexdata.com/v2/launchpads';
// const leafURL =
//   'https://api.mapbox.com/styles/v1/nicknyr/cje7mtk2y6gf92snsydobiahf/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoibmlja255ciIsImEiOiJjajduNGptZWQxZml2MndvNjk4eGtwbDRkIn0.L0aWwfHlFJVGa-WOj7EHaA';

// class Map extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       latlng: {
//         lat: 28.5618571,
//         lng: -80.577366
//       },
//       data: []
//     };
//   }

//   componentWillMount() {
//     axios
//       .get(url)
//       .then(res => {
//         this.setState({ data: res.data });
//       })
//       .catch(err => {
//         console.log('error');
//       });
//   }

//   render() {
//     const { data } = this.state;
//     console.log(data);
//     return (
//       <div>
//         <LeafletMap
//           style={{ height: '100vh' }}
//           center={this.state.latlng}
//           zoom={4}
//         >
//           <TileLayer url={leafURL} attribution='<attribution>' />
//           {data.map((elem, i) => {
//             return (
//               <Marker
//                 key={i}
//                 position={{
//                   lat: elem.location.latitude,
//                   lng: elem.location.longitude
//                 }}
//               >
//                 <Popup>
//                   <span>
//                     {elem.full_name}
//                     <br />
//                     {elem.status}
//                     <br />
//                     {elem.details}
//                     <br />
//                     {elem.vehicles_launched.map((elem, i) => {
//                       return <p key={i}>{elem}</p>;
//                     })}
//                   </span>
//                 </Popup>
//                 <Circle
//                   center={{
//                     lat: elem.location.latitude,
//                     lng: elem.location.longitude
//                   }}
//                   fillColor='red'
//                   radius={(Math.floor(Math.random() * 10) + 1) * 100000}
//                 />
//               </Marker>
//             );
//           })}
//         </LeafletMap>
//       </div>
//     );
//   }
// }

// export default Map;
