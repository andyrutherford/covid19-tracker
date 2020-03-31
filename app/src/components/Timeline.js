import React, { useEffect, useState } from 'react';

const Timeline = ({ timeline }) => {
  const [timelineData, setTimelineData] = useState(null);

  useEffect(() => {
    setTimelineData(timeline);
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2 className='text-primary'>Timeline</h2>
      <div className='timeline-container'>
        <ul className='list'>
          {timelineData &&
            timelineData
              .map((element, index) => (
                <li key={index}>
                  <h3>{element.date}</h3>
                  <ul>
                    {element.time.map((el, idx) => (
                      <li key={idx}>
                        {el.time_and_description}{' '}
                        <a className='small' href={el.source}>
                          Source
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))
              .slice(0, 3)}
        </ul>
      </div>
    </div>
  );
};

export default Timeline;
