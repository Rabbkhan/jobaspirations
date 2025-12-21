import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonialData = [
  {
    id: 1,
    name: "Sagar Sharma - Fire Safety, Chennai",
    text: "The results have been incredible. With TS Manegement service, it feels like they’re in our trench, supporting and understanding us. They’re like a partner and mentor in helping us get where we want to be.",
    img: "https://picsum.photos/101/101",
  },
  {
    id: 2,
    name: "junaid khan - electrical , Bangalore",
    text: "Working with TS Manegement service has transformed our business. Their insight and expertise have been invaluable, and they truly feel like an extension of our team.",
    img: "https://picsum.photos/102/102",
  },
  {
    id: 3,
    name: "rahit sharma - Mechanical, Pune",
    text: "TS Manegement service’s strategies have driven our growth exponentially. Their team is dedicated, knowledgeable, and truly cares about our success.",
    img: "https://picsum.photos/103/103",
  },
];


const Testimonial = () => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
  };
  return (
    <>
      <div className="py-10 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          {/* testimonial section */}
          <div className="grid grid-cols-1 max-w-screen-xl mx-auto gap-6">
            <Slider {...settings}>
              {testimonialData.map(({ id, name, text, img }) => {
                return (
                  <div key={id} className="my-6">
                    {/* card */}
                    <div className="flex flex-col sm:flex-row gap-5 md:gap-14 p-6 mx-4 rounded-xl bg-white dark:bg-gray-800 shadow-lg relative">
                      <img
                        src={img}
                        alt={name}
                        className="block mx-auto h-[200px] w-[200px] rounded-full object-cover shadow-md"
                      />
                      <div className="flex flex-col justify-center space-y-4">
                        <p className="text-gray-600 dark:text-gray-300 xl:pr-40">
                          “{text}”
                        </p>
                        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">{name}</h1>
                      </div>
                      <p className="text-gray-300 dark:text-gray-600 text-[12rem] font-serif absolute bottom-0 right-0">
                        ,,
                      </p>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
