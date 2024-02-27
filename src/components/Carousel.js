import { useState } from "react";
import "../styles.css"; // Create a CSS file for styling
import { Carousel, Image } from "react-bootstrap";
/* "Unleash Your Inner Chef: Explore Our Culinary Wonders"
"Savor the World's Flavors: A Recipe Adventure Awaits"
"Elevate Your Cooking Game with Our Delicious Creations"
"Taste the Magic: Where Every Dish Is a Masterpiece"
"Cooking Happiness, One Recipe at a Time"*/
const ImageCarousel = () => {
  const images = [
    {
      image:
        "https://images.unsplash.com/photo-1494390248081-4e521a5940db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2006&q=80",
      text: "Unleash Your Inner Chef: Explore Our Culinary Wonders"
    },
    {
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
      text: "Savor the World's Flavors: A Recipe Adventure Awaits"
    },
    {
      image:
        "https://images.unsplash.com/photo-1604634077373-a279cadc62c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      text: "Elevate Your Cooking Game with Our Delicious Creations"
    },
    {
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      text: "Taste the Magic: Where Every Dish Is a Masterpiece"
    },
    {
      image:
        "https://images.unsplash.com/photo-1604634077134-6f774f610f47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      text: "Cooking Happiness, One Recipe at a Time"
    }
  ];
  return (
    <Carousel className="py-3 caro">
      {images.map(({ image, text }) => (
        <Carousel.Item>
          <div className="img-container">
            <img src={image} className="img-fluid" />
            <div className="overlay"></div>
          </div>
          <Carousel.Caption>
            <h4 className="text">{text}</h4>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
