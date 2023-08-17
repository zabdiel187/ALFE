import React, { useState, useEffect } from 'react';
import './scrollingBackground.css'; // Import your CSS file

const image1 = "https://cdn.discordapp.com/attachments/1109281453696626800/1109281777400426596/IMG_1424-e1400697798900.png";
const image2 = "https://cdn.discordapp.com/attachments/1109281453696626800/1126328804730732626/1200px-Pancit_Ilonggo_Style_-_12110747826.png";
const image3 = "https://cdn.discordapp.com/attachments/1109281453696626800/1126301020415344740/Lumpia_HERO_RECIPE_110420_4613.png";
const imageUrls = [image1, image2, image3]; // Add more image URLs as needed

function ScrollingBackground() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 20000); // Adjust the timing as needed

    return () => clearInterval(interval);
  }, []);

  const images = imageUrls.map((imageUrl, index) => (
    <div
      key={index}
      className={`background-image ${currentImageIndex === index ? 'visible' : ''}`}
      style={{ backgroundImage: `url(${imageUrl})` }}
    />
  ));

  return <div className="scrolling-background">{images}</div>;
}

export default ScrollingBackground;
