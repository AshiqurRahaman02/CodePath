import React, { useState, useEffect } from "react";

import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import Navbar from "../components/Navbar";

import "../styles/Sign.css";

const SignInSignUp = () => {
	// State for controlling form visibility and switch button position
	const [isSignInVisible, setSignInVisible] = useState(true);


	// Function to switch between sign-in and sign-up forms
	const toggleForms = () => {
		setSignInVisible((prevState) => !prevState);
	};

	return (
		<>
			<Navbar />
			{/* Sign In Form */}
			{isSignInVisible && <SignIn />}

			{/* Sign Up Form */}
			{!isSignInVisible && <SignUp />}
			<div id="option">
				{isSignInVisible ? (
					<p>
						Don't have an account?{" "}
						<button onClick={toggleForms}>Sign Up</button>
					</p>
				) : (
					<p>
						Allready have an account?{" "}
						<button onClick={toggleForms}>Sign In</button>
					</p>
				)}
			</div>
		</>
	);
};

export default SignInSignUp;
