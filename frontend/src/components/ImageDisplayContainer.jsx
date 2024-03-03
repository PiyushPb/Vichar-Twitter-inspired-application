import React, { useRef, useState } from "react";

import { IoIosCloseCircleOutline } from "react-icons/io";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const ImageDisplayContainer = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="w-full h-screen fixed z-10 bg-black backdrop:blur-3xl bg-opacity-80">
      <div>
        <IoIosCloseCircleOutline className="absolute top-5 right-5 text-3xl text-white" />
      </div>
      <div className="w-full h-full flex justify-center items-center flex-col gap-3 pb-[80px] sm:pb-0">
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          spaceBetween={10}
          loop={true}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="max-w-[1600px] w-full h-full p-5 m-auto"
        >
          <SwiperSlide>
            <img
              src="https://source.unsplash.com/random?random=1"
              className="h-full w-full object-contain"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://source.unsplash.com/random?random=2"
              className="h-full w-full object-contain"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://source.unsplash.com/random?random=3"
              className="h-full w-full object-contain"
            />
          </SwiperSlide>
        </Swiper>
        <div className="p-4">Test</div>
      </div>
    </div>
  );
};

export default ImageDisplayContainer;
