export const formatCountryLocations = (locations) => {
  const data = locations.locations.map((location) => ({
    loc:
      location.country === 'US'
        ? 'United States'
        : location.country === 'Korea, South'
        ? 'South Korea'
        : location.country,
    loc_code:
      location.country_code === 'XK' || location.country_code === 'XX'
        ? 'un'
        : location.country_code.toLowerCase(),
    confirmed: location.latest.confirmed,
    deaths: location.latest.deaths,
  }));
  // Consolidate duplicates
  var output = data.reduce(function (accumulator, cur) {
    var country = cur.loc,
      found = accumulator.find(function (elem) {
        return elem.loc === country;
      });
    if (found) {
      found.confirmed += cur.confirmed;
      found.deaths += cur.deaths;
    } else accumulator.push(cur);
    return accumulator;
  }, []);

  // Sort and remove any countries with less than 100 cases
  const final = output
    .sort((a, b) => b.confirmed - a.confirmed)
    .filter((element) => element.confirmed > 100);
  const formatted = {
    latestConfirmed: locations.latest.confirmed,
    latestDeaths: locations.latest.deaths,
    locations: final,
  };
  return formatted;
};

export const formatStateLocations = (caseData) => {
  // // Navajo Nation, DC, Guam, US Virgin Islands, Northern Mariana Islands
  console.log(caseData);
  const data = caseData.locations.map((c) => ({
    loc:
      c.province === 'District of Columbia' ? 'Dist. of Columbia' : c.province,
    loc_code: c.province,
    confirmed: c.latest.confirmed,
    deaths: c.latest.deaths,
  }));
  // Consolidate duplicates
  var output = data.reduce(function (accumulator, cur) {
    var country = cur.loc,
      found = accumulator.find(function (elem) {
        return elem.loc === country;
      });
    if (found) {
      found.confirmed += cur.confirmed;
      found.deaths += cur.deaths;
    } else accumulator.push(cur);
    return accumulator;
  }, []);
  // Sort and remove any countries with less than 100 cases
  const final = output
    .sort((a, b) => b.confirmed - a.confirmed)
    .filter((element) => element.confirmed > 0);
  const formatted = {
    latestConfirmed: caseData.latest.confirmed,
    latestDeaths: caseData.latest.deaths,
    locations: final,
  };
  console.log(formatted);
  return formatted;
};
