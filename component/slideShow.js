import React from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Image from 'next/image';
import slideImage2 from '@/public/images/slideImage2.jpg';
import slideImage3 from '@/public/images/slideImage3.jpg';
import slideImage6 from '@/public/images/slideImage6.jpg';
import slideImage7 from '@/public/images/slideImage7.jpg';
import slideImage9 from '@/public/images/slideImage9.jpg';

const images = [
  slideImage2,
  slideImage3,
  slideImage6,
  slideImage7,
  slideImage9,
];

const Slideshow = () => {
  return (
    <div className="slide-container" style={{ marginTop: '40px' }}>
      <Fade>
        {images.map((image, index) => (
          <div className="each-slide" key={index}>
            <div>
              <Image
                width={1300}
                height={680}
                src={image}
                alt={`image${index + 1}`}
              />
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
};

export default Slideshow;
