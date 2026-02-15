import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonialData = [
  { id: 1, name: "Sagar Sharma - Fire Safety, Chennai", text: "The results have been incredible...", img: "https://picsum.photos/101/101" },
  { id: 2, name: "Junaid Khan - Electrical, Bangalore", text: "Working with TS Management service...", img: "https://picsum.photos/102/102" },
  { id: 3, name: "Rahit Sharma - Mechanical, Pune", text: "TS Management service’s strategies...", img: "https://picsum.photos/103/103" },
];

const Testimonial = () => {
  const settings = { dots: true, arrows: false, infinite: true, speed: 600, slidesToShow: 1, slidesToScroll: 1, autoplay: false, autoplaySpeed: 3000, cssEase: "linear", pauseOnHover: true, pauseOnFocus: true };

  return (
    <div className="py-10 bg-muted/10 dark:bg-muted/20">
      <div className="container mx-auto px-4">
        <Slider {...settings}>
          {testimonialData.map(({ id, name, text, img }) => (
            <div key={id} className="my-6">
              <div className="flex flex-col sm:flex-row gap-5 md:gap-14 p-6 mx-4 rounded-xl bg-card border border-border shadow-lg relative">
                <img src={img} alt={name} className="block mx-auto h-[200px] w-[200px] rounded-full object-cover shadow-md" />
                <div className="flex flex-col justify-center space-y-4">
                  <p className="text-muted-foreground xl:pr-40">“{text}”</p>
                  <h1 className="text-xl font-bold text-foreground">{name}</h1>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonial;
