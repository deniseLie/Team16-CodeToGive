import React, { useEffect } from "react";
import TestimonialSlider from "components/Slider/TestimonialSlider";

// Example testimonial data
const testimonials = [
  {
    name: "John D., Beneficiary",
    description:
      "This organization changed my life. The support and resources they provided helped me get back on my feet.",
    image: 
        "https://www.firstdaylearning.com/hs-fs/hubfs/5%20Predicted%20Trends%20in%20Early%20Childhood%20Education%20for%202025.jpeg?width=7207&height=4805&name=5%20Predicted%20Trends%20in%20Early%20Childhood%20Education%20for%202025.jpeg"
    
  },
  {
    name: "Maria G., Beneficiary",
    description:
      "Thanks to the support I received, my children are now attending school and have a brighter future ahead of them.",
    image: 
        "https://www.firstdaylearning.com/hs-fs/hubfs/5%20Predicted%20Trends%20in%20Early%20Childhood%20Education%20for%202025.jpeg?width=7207&height=4805&name=5%20Predicted%20Trends%20in%20Early%20Childhood%20Education%20for%202025.jpeg"
    
  },
  {
    name: "Sarah L., Volunteer",
    description:
      "Volunteering with this organization has been a life-changing experience. Seeing the smiles on the children's faces makes it all worthwhile.",
    image: 
        "https://www.firstdaylearning.com/hs-fs/hubfs/5%20Predicted%20Trends%20in%20Early%20Childhood%20Education%20for%202025.jpeg?width=7207&height=4805&name=5%20Predicted%20Trends%20in%20Early%20Childhood%20Education%20for%202025.jpeg"
    
  },
  {
    name: "Maria G., Beneficiary",
    description:
      "Thanks to the support I received, my children are now attending school and have a brighter future ahead of them.",
    image: 
        "https://www.firstdaylearning.com/hs-fs/hubfs/5%20Predicted%20Trends%20in%20Early%20Childhood%20Education%20for%202025.jpeg?width=7207&height=4805&name=5%20Predicted%20Trends%20in%20Early%20Childhood%20Education%20for%202025.jpeg"
    
  },
  {
    name: "Sarah L., Volunteer",
    description:
      "Volunteering with this organization has been a life-changing experience. Seeing the smiles on the children's faces makes it all worthwhile.",
    image: 
        "https://www.firstdaylearning.com/hs-fs/hubfs/5%20Predicted%20Trends%20in%20Early%20Childhood%20Education%20for%202025.jpeg?width=7207&height=4805&name=5%20Predicted%20Trends%20in%20Early%20Childhood%20Education%20for%202025.jpeg"
    
  },
];

export default function TestimonialSection() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">What People Are Saying</h2>
                    <p className="text-blueGray-600">
                        Hear from our volunteers and beneficiaries about the impact we've made together.
                    </p>
                </div>

                {/* Testimonials */}
                <TestimonialSlider testimonials={testimonials} />
            </div>  
        </section>
    );
}