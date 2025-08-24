import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
    dots: true,
    infinite: true,
    speed: 500, 
    slidesToShow: 4, 
    slidesToScroll: 1,
    responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 3 } },
        { breakpoint: 600, settings: { slidesToShow: 2 } },
    ]
}

export default function TestimonialSlider({ testimonials }) {
    return (
        <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
                <div className="w-full h-48 mb-4 px-2 rounded-lg" key={index}>
                    <img
                        src={testimonial.image}
                        alt={`Testimonial from ${testimonial.name}`}
                        className="w-full h-full object-cover transition-transform duration-500"
                    />

                    <p className="mt-2 text-center text-sm text-blueGray-600">
                        "{testimonial.description}"
                    </p>
                    <p className="mt-1 text-center text-sm font-bold text-blueGray-800">
                        {testimonial.name}
                    </p>
                </div>
            ))}
        </Slider>
    );
}