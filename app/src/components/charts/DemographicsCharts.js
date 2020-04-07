import React, { useEffect, useState } from 'react';
import AgeChart from './AgeChart';
import SexChart from './SexChart';
import PreexistingConditionsChart from './PreexistingConditionsChart';

const DemographicsCharts = ({ demographicsData }) => {
  const [demographics, setDemographics] = useState({
    age: null,
    sex: null,
    preexistingConditions: null,
  });

  const { age, sex, preexistingConditions } = demographicsData;

  useEffect(() => {
    setDemographics({
      age,
      sex,
      preexistingConditions,
    });
    //eslint-disable-next-line
  }, []);

  return (
    <div className='card'>
      <h1 className='text-primary'>Demographics</h1>
      <div className='grid-3'>
        <div>{demographics.age && <AgeChart ageData={demographics.age} />}</div>
        <div>{demographics.sex && <SexChart sexData={demographics.sex} />}</div>
        <div>
          {demographics.preexistingConditions && (
            <PreexistingConditionsChart
              preexistingConditionsData={demographics.preexistingConditions}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DemographicsCharts;
