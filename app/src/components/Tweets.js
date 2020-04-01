import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

const Tweets = () => {
  return (
    <div>
      {' '}
      <TwitterTimelineEmbed
        sourceType='profile'
        screenName='who'
        options={{ height: '77vh' }}
      />
    </div>
  );
};

export default Tweets;
