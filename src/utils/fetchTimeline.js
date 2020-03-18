import axios from 'axios';

const url =
  'https://api.allorigins.win/raw?url=https://bnonews.com/index.php/2020/02/the-latest-coronavirus-cases/';

// const url = 'https://pokedex.org/';

export const getTimeline = async () => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
