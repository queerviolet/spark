import React from 'react';
import { Carousel } from 'react-materialize';

export const HomePage = ({login}) => {
  return (

    <div>
    <h1 className="hp-header"><strong>tripHub</strong></h1>
    <button className="btn black" onClick={login}>Log In</button>
    <Carousel
      className="carousel"
      options={{ fullWidth: true }}
      images={[
        'paris.jpg',
        'iceland.jpg',
        'hiking.jpg',
        'nyc.jpg'
      ]}
    />
    </div>

  );
};

export default HomePage;
