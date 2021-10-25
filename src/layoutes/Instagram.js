import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

import img1 from '../assets/images/home/insta/insta-1.jpg';
import img2 from '../assets/images/home/insta/insta-2.jpg';
import img3 from '../assets/images/home/insta/insta-3.jpg';
import img4 from '../assets/images/home/insta/insta-4.jpg';
import img5 from '../assets/images/home/insta/insta-5.jpg';
import img6 from '../assets/images/home/insta/insta-6.jpg';
import img7 from '../assets/images/home/insta/insta-7.jpg';
import img8 from '../assets/images/home/insta/insta-8.jpg';

// install Swiper components
SwiperCore.use([Navigation]);

const instapost = [
    { img: img1 },
    { img: img2 },
    { img: img3 },
    { img: img4 },
    { img: img5 },
    { img: img6 },
    { img: img7 },
    { img: img8 },
];


function Instagram() {
    const settings = {
        slidesPerView: 2,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        navigation: false,
        breakpoints: {
            480: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 6,
            },
            1500: {
                slidesPerView: 8,
            },
        }
    }
    return (
        <div className="u-line instagram-slider swiper-container">
        <Swiper tag="section" wrapperTag="ul" className="hm-list hm-instagram swiper-wrapper" {...settings}>
            {instapost.map((item, i) => (
                <SwiperSlide tag="li" key={i}>
                    <Link to="#"><img src={item.img} alt="" /></Link>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
    );
  }


export default Instagram;