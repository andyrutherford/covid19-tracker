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
          console.log(data.slice(0, 1));
        }
        const newData = data.slice(0, 1);
        setTimelineData(newData);
      });
  };

  useEffect(() => {
    formatData();
    //eslint-disable-next-line
  }, []);

  const products = [
    { time: 1, description: 'abc' },
    { time: 2, description: 'def' }
  ];

  const myData = [
    {
      date: '18 March',
      time: [
        {
          time_and_description: 'the time and description',
          source: 'source'
        }
      ]
    }
  ];

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
      <BootstrapTable keyField='id' data={products} columns={columns} />
      <ul>
        {timelineData &&
          timelineData
            .map((element, index) => (
              <li key={index}>
                <h3>{element.date}</h3>
                <ul>
                  {element.time
                    .map((el, idx) => (
                      <li>
                        {el.time_and_description}{' '}
                        <a className='small' href={el.source}>
                          Source
                        </a>
                      </li>
                    ))
                    .slice(0, 5)}
                </ul>
              </li>
            ))
            .slice(0, 3)}
      </ul>
    </div>
  );
};

export default Timeline;
