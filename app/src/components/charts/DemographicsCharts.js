import React, { useEffect, useState } from 'react';
import AgeChart from './AgeChart';
import SexChart from './SexChart';
import PreexistingConditionsChart from './PreexistingConditionsChart';

const DemographicsCharts = ({ demographicsData }) => {
  const [demographics, setDemographics] = useState({
    age: null,
    sex: null,
    preexistingConditions: null
  });

  const { age, sex, preexistingConditions } = demographicsData;

  useEffect(() => {
    setDemographics({
      age,
      sex,
      preexistingConditions
    });
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
