export const formatWorldMap = (confirmedCases, usData) => {
  console.log(confirmedCases);
  console.log(usData);

  const formatData = (confirmedCases) => {
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
    return newMarkers;
  };

  const formatUSData = (usData) => {
    const arr = usData.locations
      .filter((element) => element.country !== undefined)
      .filter((element) => element.latest.confirmed > 1000);

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
    return newMarkers;
  };

  const worldMarkers = formatData(confirmedCases);
  const usMarkers = formatUSData(usData);
  const data = {
    markers: [...worldMarkers, ...usMarkers],
  };
  console.log(data);
  return data;
};

export const formatUSMap = (usData) => {
  console.log(usData);
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
  const data = {
    markers: [...newMarkers],
  };
  console.log(data);
  return data;
};
