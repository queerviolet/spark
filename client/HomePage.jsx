import React, { Component } from 'react';
// import {ui, uiConfig} from '../fire'
import Slider from 'react-slick';

export const HomePage = ({login}) => {
  return (
    <div>
      <div>
        <button onClick={login}>Log In</button>
      </div>

      <div className="container">
        <Slider autoplay={true} dots={true} infinite={true} speed={100} slidesToShow={1} slidesToScroll={1}>
          <div><img src="ny.jpg" /></div>
          <div><img src="beach.jpg" /></div>
          <div><img src="paris.jpg" /></div>
        </Slider>
      </div>
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
