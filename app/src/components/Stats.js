import React from 'react';
import CountUp from 'react-countup';

const Stats = ({ locations, newCases }) => {
  return (
    <div className='grid-4'>
      <div>
        {' '}
        <h1 className='text-danger text-center large'>
          <CountUp
            start={0}
            end={parseInt(locations.latest.confirmed)}
            delay={0}
            duration={2}
            separator={','}
          >
            {({ countUpRef }) => (
              <div>
                <span ref={countUpRef} />
              </div>
            )}
          </CountUp>
        </h1>
        <p className='text-center small'>Confirmed Cases</p>
      </div>
      <div>
        <h1 className='text-primary text-center large'>
          <CountUp
            start={0}
            end={parseInt(locations.latest.deaths)}
            delay={0}
            duration={2}
            separator={','}
          >
            {({ countUpRef }) => (
              <div>
                <span ref={countUpRef} />
              </div>
            )}
          </CountUp>
        </h1>
        <p className='text-center small'>Deaths</p>
      </div>
      <div>
        {' '}
        <h1 className='text-danger text-center large'>
          <CountUp
            start={0}
            end={parseInt(newCases.newConfirmed)}
            delay={0}
            duration={2}
            separator={','}
          >
            {({ countUpRef }) => (
              <div>
                <span ref={countUpRef} />
              </div>
            )}
          </CountUp>
        </h1>
        <p className='text-center small'>24 Hours</p>
      </div>
      <div>
        <h1 className='text-primary text-center large'>
          <CountUp
            start={0}
            end={parseInt(newCases.newDeaths)}
            delay={0}
            duration={2}
            separator={','}
          >
            {({ countUpRef }) => (
              <div>
                <span ref={countUpRef} />
              </div>
            )}
          </CountUp>
        </h1>
        <p className='text-center small'>24 Hours</p>
      </div>
    </div>
  );
};

export default Stats;
