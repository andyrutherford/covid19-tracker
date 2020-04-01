import React, { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

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
        <PerfectScrollbar>
          <ul className='list'>
            {timelineData &&
              timelineData
                .map((element, index) => (
                  <li key={index}>
                    <h3>{element.date}</h3>
                    <ul>
                      {element.time.map((el, idx) => (
                        <li key={idx} className='small'>
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
        </PerfectScrollbar>
      </div>
    </div>
  );
};

export default Timeline;
