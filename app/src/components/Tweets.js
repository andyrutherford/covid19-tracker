import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

const Tweets = ({ source }) => {
  return (
    <div>
      {' '}
      <TwitterTimelineEmbed
        sourceType='profile'
        screenName={source}
        options={{ height: '77vh' }}
      />
    </div>
  );
};

export default Tweets;
