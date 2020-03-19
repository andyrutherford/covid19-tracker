import React, { useEffect, useState } from 'react';
import cheerio from 'cheerio';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const Timeline = ({ timeline }) => {
  const [timelineData, setTimelineData] = useState(null);

  const formatData = () => {
    let names = [];
    let $ = cheerio.load(timeline);
    const data = [];
    $('h2:contains("Timeline for major updates (GMT)")')
      .nextUntil('h3')
      .each((idx, el) => {
        if (el.name === 'h4') {
          const obj = {
            date: $(el)
              .text()
              .trim(),
            time: $(el)
              .next()
              .children('li')
              .toArray()
              .map(li => ({
                time_and_description: $(li)
                  .text()
                  .trim()
                  .replace(' (Source)', ''),
                source: $(li)
                  .find('a')
                  .attr('href')
              }))
          };

          data.push(obj);
        }
        const selectedDays = data.slice(0, 3);
        setTimelineData(selectedDays);
      });
  };

  useEffect(() => {
    formatData();
    //eslint-disable-next-line
  }, []);

  const columns = [
    {
      desc: 'time_and_description',
      text: 'Description'
    },
    {
      dataField: 'source',
      text: 'Source'
    }
  ];

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
