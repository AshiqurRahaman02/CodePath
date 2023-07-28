
import React, { useEffect, useState  } from 'react';
import Navbar from '../components/Navbar';
import "../styles/Home.css"

import html from "../assets/skills-logo/html.svg"
import javascript from "../assets/skills-logo/javascript.svg"
import css from "../assets/skills-logo/css.svg"
import nodejs from "../assets/skills-logo/nodejs.svg"
import typescript from "../assets/skills-logo/typescript.svg"
import mongodb from "../assets/skills-logo/mongodb.svg"
import react from "../assets/skills-logo/react.svg"
import aws from "../assets/skills-logo/aws.svg"

interface ImageItem {
  src: string;
}

const Home: React.FC = () => {
  const [shuffledImages, setShuffledImages] = useState<ImageItem[]>([]);

  
  useEffect(() => {
    const images: ImageItem[] = [
      { src: html },
      { src: css },
      { src: javascript },
      { src: nodejs },
      { src: react },
      { src: typescript },
      { src: aws },
      { src: mongodb },
    ];

    // Shuffle the order of images randomly
    const shuffled = images.sort(() => Math.random() - 0.5);
    setShuffledImages(shuffled);
  }, []);


  return (
    <div>
      <Navbar />
      <header>
        <h1>Unlock Your Potential <br /> Prepare for Success</h1>
        <p>A platform designed to prepare and empower you for career-defining opportunities. <br />Master your skills, access curated resources, and excel in interviews. Your pathway to professional growth starts here.</p>
        <div className='image-container'>
          {/* Render images with random order */}
          {shuffledImages.map((image, index) => (
            <img key={index} src={image.src} alt="" />
          ))}
        </div>
      </header>
    </div>
  );
};

export default Home;
