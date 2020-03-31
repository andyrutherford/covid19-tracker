import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Test = () => {
  const [all, setAll] = useState({
    confirmed: 'abc',
    deaths: 'def',
    recovered: 'ghi'
  });
  const [confirmed, setConfirmed] = useState(null);
  const [deaths, setDeaths] = useState(null);
  const [recovered, setRecovered] = useState(null);

  const getConfirmed = async () => {
    try {
      //   const res = await axios.get(
      //     'https://coronavirus-tracker-api.herokuapp.com/confirmed'
      //   );
      const res = await axios.get('/api/cases/confirmed');
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };
  const getDeaths = async () => {
    try {
      const res = await axios.get('/api/cases/deaths');
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };
  const getRecovered = async () => {
    try {
      const res = await axios.get('/api/cases/recovered');
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // getConfirmed().then(response => setConfirmed(response));
    getConfirmed().then(response =>
      setAll(prevState => {
        return { ...prevState, confirmed: response };
      })
    );
    // getDeaths().then(response => setDeaths(response));
    getDeaths().then(response =>
      setAll(prevState => {
        return { ...prevState, deaths: response };
      })
    );
    // getRecovered().then(response => setRecovered(response));
    getRecovered().then(response =>
      setAll(prevState => {
        return { ...prevState, recovered: response };
      })
    );
    // setTimeout(() => {
    //   setAll({ ...all, confirmed: '123' });
    // }, 2000);
    // setTimeout(() => {
    //   setAll({ ...all, deaths: '456' });
    // }, 4000);
    // setTimeout(() => {
    //   setAll({ ...all, recovered: '789' });
    // }, 6000);
    //eslint-disable-next-line

    // setAll(prevState => {
    //   return { ...prevState, deaths: 'qwerty' };
    // });
    // setAll(prevState => {
    //   return { ...prevState, recovered: '09876' };
    // });
    // setAll(prevState => {
    //   return { ...prevState, confirmed: 'oh daddy' };
    // });
  }, []);

  //   useEffect(() => {
  //     console.log('confirmed changed');
  //   }, [confirmed]);
  //   useEffect(() => {
  //     console.log('deaths changed');
  //   }, [deaths]);
  //   useEffect(() => {
  //     console.log('recovered changed');
  //   }, [recovered]);

  return <div>test component</div>;
};

export default Test;
