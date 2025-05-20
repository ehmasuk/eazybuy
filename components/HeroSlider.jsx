"use client";
import Image from "next/image";
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
            <div>
                <div className="flex flex-col justify-center p-5 lg:p-10 min-h-[60vh] relative w-full">
                    <Image
                        src="/shop2_home_slider1.jpg"
                        alt="image"
                        fill
                        sizes="(min-width: 2760px) 952px, (min-width: 760px) 538px, (min-width: 600px) 388px, (min-width: 420px) 65.63vw, calc(12vw + 220px)"
                        className="absolute left-0 top-0 w-full h-full object-cover z-[-1]"
                    />
                    <p className="uppercase text-gray-800">Summer sale</p>
                    <p className="uppercase text-black font-extrabold lg:lg:text-6xl text-4xl mt-2 mb-8">30% off</p>
                    <div className="lg:flex gap-8">
                        <div className="flex items-start">
                            <p className="uppercase text-black font-extrabold mr-2">Startting at</p>
                            <p className="uppercase text-black font-extrabold text-3xl">$199</p>
                        </div>
                        <button className="bg-black text-white px-6 py-3 hover:bg-slate-800 uppercase font-bold">Get yours!</button>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex flex-col justify-center p-5 lg:p-10 min-h-[60vh] relative">
                    <Image
                        src="/shop2_home_slider2.jpg"
                        alt="image"
                        fill
                        sizes="(min-width: 2760px) 952px, (min-width: 760px) 538px, (min-width: 600px) 388px, (min-width: 420px) 65.63vw, calc(12vw + 220px)"
                        className="absolute left-0 top-0 w-full h-full object-cover z-[-1]"
                    />
                    <p className="uppercase text-gray-800">over 200 products in discount</p>
                    <p className="uppercase text-black font-extrabold lg:text-6xl text-4xl mt-2 mb-8">great deals</p>
                    <div className="lg:flex gap-8">
                        <div className="flex items-start">
                            <p className="uppercase text-black font-extrabold mr-2">Startting at</p>
                            <p className="uppercase text-black font-extrabold text-3xl">$299</p>
                        </div>
                        <button className="bg-black text-white px-6 py-3 hover:bg-slate-800 uppercase font-bold">Get yours!</button>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex flex-col justify-center p-5 lg:p-10 min-h-[60vh] relative">
                    <Image
                        src="/shop2_home_slider3.jpg"
                        alt="image"
                        fill
                        sizes="(min-width: 2760px) 952px, (min-width: 760px) 538px, (min-width: 600px) 388px, (min-width: 420px) 65.63vw, calc(12vw + 220px)"
                        className="absolute left-0 top-0 w-full h-full object-cover z-[-1]"
                    />
                    <p className="uppercase text-gray-800">over 200 products in discount</p>
                    <p className="uppercase text-black font-extrabold lg:text-6xl text-4xl mt-2 mb-8">great deals</p>
                    <div className="lg:flex gap-8">
                        <div className="flex items-start">
                            <p className="uppercase text-black font-extrabold mr-2">Startting at</p>
                            <p className="uppercase text-black font-extrabold text-3xl">$299</p>
                        </div>
                        <button className="bg-black text-white px-6 py-3 hover:bg-slate-800 uppercase font-bold">Get yours!</button>
                    </div>
                </div>
            </div>
        </Slider>
    );
}

export default HeroSlider;
