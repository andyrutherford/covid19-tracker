import React, { useEffect, useState } from 'react';
import cheerio from 'cheerio';
import AgeChart from './AgeChart';
import SexChart from './SexChart';
import PreexistingConditionsChart from './PreexistingConditionsChart';

const DemographicsCharts = ({ demographicsData }) => {
  const [demographics, setDemographics] = useState({
    age: null,
    sex: null,
    preexistingConditions: null
  });

  const formatAgeData = $ => {
    const byAgeRows = $('h4:contains("COVID-19 Fatality Rate by AGE:")')
      .next()
      .next()
      .find('table tbody tr');
    const byAge = [];
    $(byAgeRows).each((idx, el) => {
      if (idx === 0) return;

      byAge.push({
        age: $(el)
          .children('td')
          .eq(0)
          .text()
          .trim(),
        rate: $(el)
          .children('td')
          .eq(2)
          .text()
          .trim()
      });
    });
    return byAge;
  };

  const formatSexData = $ => {
    const bySexRows = $('h4:contains("COVID-19 Fatality Rate by SEX:")')
      .next()
      .next()
      .find('table tbody tr');
    const bySex = [];
    $(bySexRows).each((idx, el) => {
      if (idx === 0) return;

      bySex.push({
        sex: $(el)
          .children('td')
          .eq(0)
          .text()
          .trim(),
        rate: $(el)
          .children('td')
          .eq(1)
          .text()
          .trim()
      });
    });
    return bySex;
  };

  const formatPreexistingConditionsData = $ => {
    const byComorbidityRows = $(
      'h4:contains("COVID-19 Fatality Rate by COMORBIDITY:")'
    )
      .next()
      .next()
      .find('table tbody tr');
    const byComorbidity = [];
    $(byComorbidityRows).each((idx, el) => {
      if (idx === 0) return;

      byComorbidity.push({
        preExistingCondition: $(el)
          .children('td')
          .eq(0)
          .text()
          .trim(),
        rate: $(el)
          .children('td')
          .eq(2)
          .text()
          .trim()
      });
    });
    return byComorbidity;
  };

  const formatData = () => {
    let $ = cheerio.load(demographicsData);
    const ageData = formatAgeData($);
    const sexData = formatSexData($);
    const preexistingConditionsData = formatPreexistingConditionsData($);

    setDemographics({
      ...demographics,
      age: ageData,
      sex: sexData,
      preexistingConditions: preexistingConditionsData
    });
  };

  useEffect(() => {
    formatData();
    //eslint-disable-next-line
  }, []);

  // console.log(demographicsData);
  return (
    <div className='grid-3'>
      <div className='card'>
        {demographics.age && <AgeChart ageData={demographics.age} />}
      </div>
      <div className='card'>
        {demographics.sex && <SexChart sexData={demographics.sex} />}
      </div>
      <div className='card'>
        {demographics.preexistingConditions && (
          <PreexistingConditionsChart
            preexistingConditionsData={demographics.preexistingConditions}
          />
        )}
      </div>
    </div>
  );
};

export default DemographicsCharts;
