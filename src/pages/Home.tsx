import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import "../styles/Home.css";
import "../styles/App.css";

import html from "../assets/skills-logo/html.svg";
import javascript from "../assets/skills-logo/javascript.svg";
import css from "../assets/skills-logo/css.svg";
import nodejs from "../assets/skills-logo/nodejs.svg";
import typescript from "../assets/skills-logo/typescript.svg";
import mongodb from "../assets/skills-logo/mongodb.svg";
import react from "../assets/skills-logo/react.svg";
import aws from "../assets/skills-logo/aws.svg";

interface ImageItem {
	src: string;
	text: string;
}

const Home: React.FC = () => {
	const [shuffledImages, setShuffledImages] = useState<ImageItem[]>([]);

	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	useEffect(() => {
		const images: ImageItem[] = [
			{ src: html, text: "HTML" },
			{ src: css, text: "CSS" },
			{ src: javascript, text: "JAVASCRIPT" },
			{ src: nodejs, text: "NODE JS" },
			{ src: react, text: "REACT" },
			{ src: typescript, text: "TYPESCRIPT" },
			{ src: aws, text: "AWS" },
			{ src: mongodb, text: "MONGODB" },
		];

		// Shuffle the order of images randomly
		const shuffled = images.sort(() => Math.random() - 0.5);
		setShuffledImages(shuffled);

		const userDetails = localStorage.getItem("userInfo");
		if (userDetails !== null) {
			setIsAuthenticated(true);
		} else {
			setIsAuthenticated(false);
		}
	}, []);

	return (
		<div>
			<Navbar />
			<header>
				<h1>
					Unlock Your Potential <br /> Prepare for Success
				</h1>
				<p>
					A platform designed to prepare and empower you for
					career-defining opportunities. <br />
					Master your skills, access curated resources, and excel in
					interviews. Your pathway to professional growth starts here.
				</p>
				{!isAuthenticated ? (
					<Link to="/signin">
						<button className="home-page-button">
							Let's Get started
						</button>
					</Link>
				) : (
					<Link to="/questions">
						<button className="home-page-button">
							Let's Get started
						</button>
					</Link>
				)}
				<div className="image-container">
					{/* Render images with random order */}
					{shuffledImages.map((image, index) => (
						<div>
							<img key={index} src={image.src} alt="" />
							<span>{image.text}</span>
						</div>
					))}
				</div>
			</header>
		</div>
	);
};

export default Home;
