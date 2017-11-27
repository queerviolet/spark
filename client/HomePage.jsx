import React from 'react';
import { Carousel } from 'react-materialize';

export const HomePage = ({login}) => {
  return (
    <div>

      <Carousel
        fixedItem={<button className="btn" onClick={login}>Log In</button>}
        options={{ fullWidth: true }}
        images={[
          'paris.jpg',
          'iceland.jpg',
          'hiking.jpg'
        ]}
      />

    </div>
  );
};

export default HomePage;

/*
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

      <Carousel infiniteLoop={true} autoPlay={true} interval={6000} transitionTime={1000} showThumbs={false} dynamicHeight={true} showStatus={false} height={'600px'}>
        <div>
            <img src="http://localhost:8080/ny.jpg" />
        </div>
        <div>
            <img src="http://localhost:8080/beach.jpg" />
        </div>
        <div>
            <img src="http://localhost:8080/paris.jpg" />
        </div>
      </Carousel>
*/
