import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

const Tweets = ({ source }) => {
  return (
    <div>
      {' '}
      <TwitterTimelineEmbed
        sourceType='profile'
        screenName={source}
        options={{ height: '600px' }}
      />
    </div>
  );
};

export default Tweets;
