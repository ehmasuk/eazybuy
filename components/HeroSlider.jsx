"use client";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function HeroSlider() {
  const heroSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <Slider {...heroSliderSettings} className="w-full">
      <Link href="/shop" className="cursor-pointer flex flex-col justify-center p-5 lg:p-10 min-h-[60vh] relative w-full">
        <Image
          src="/shop2_home_slider1.png"
          alt="image"
          fill
          sizes="(min-width: 2760px) 952px, (min-width: 760px) 538px, (min-width: 600px) 388px, (min-width: 420px) 65.63vw, calc(12vw + 220px)"
          className="absolute left-0 top-0 w-full h-full object-cover z-[-1]"
        />
      </Link>
      <Link href="/shop" className="cursor-pointer flex flex-col justify-center p-5 lg:p-10 min-h-[60vh] relative w-full">
        <Image
          src="/shop2_home_slider2.png"
          alt="image"
          fill
          sizes="(min-width: 2760px) 952px, (min-width: 760px) 538px, (min-width: 600px) 388px, (min-width: 420px) 65.63vw, calc(12vw + 220px)"
          className="absolute left-0 top-0 w-full h-full object-cover z-[-1]"
        />
      </Link>
      <Link href="/shop" className="cursor-pointer flex flex-col justify-center p-5 lg:p-10 min-h-[60vh] relative w-full">
        <Image
          src="/shop2_home_slider3.png"
          alt="image"
          fill
          sizes="(min-width: 2760px) 952px, (min-width: 760px) 538px, (min-width: 600px) 388px, (min-width: 420px) 65.63vw, calc(12vw + 220px)"
          className="absolute left-0 top-0 w-full h-full object-cover z-[-1]"
        />
      </Link>
    </Slider>
  );
}

export default HeroSlider;
