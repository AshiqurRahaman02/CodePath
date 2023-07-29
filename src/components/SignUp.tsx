import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../styles/Signin.css";
import { userRoutes } from "../api/userRoutes";

import Popup from "./PopUp";
import Loading from "../components/Loading";

const SignUp = () => {
	const [signUpName, setSignUpName] = useState("");
	const [signUpEmail, setSignUpEmail] = useState("");
	const [signUpPassword, setSignUpPassword] = useState("");
	const [validSignUpName, setValidSignUpName] = useState(false);
	const [validSignUpEmail, setValidSignUpEmail] = useState(false);
	const [validSignUpPassword, setValidSignUpPassword] = useState(false);

	const [showPassword, setShowPassword] = useState(false);

	// Regular expressions for validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;
	const onlyCharactersRegex = /^[a-zA-Z]+$/;
	const lowerUpperAndNumberRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
	const lowerUpperNumberSpecialRegex =
		/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=]).+$/;

	const [showPopup, setShowPopup] = useState(false);

	const [isLoading, setLoading] = useState(false);

	const navigate = useNavigate();

	// Function to handle name validation for sign-up
	const handleSignUpName = (event: any) => {
		const { value } = event.target;
		setSignUpName(value);
		if (value.length >= 5 && onlyCharactersRegex.test(value)) {
			setValidSignUpName(true);
		} else {
			setValidSignUpName(false);
		}
	};

	// Function to handle email validation for sign-up
	const handleSignUpEmail = (event: any) => {
		const { value } = event.target;
		setSignUpEmail(value);
		if (emailRegex.test(value)) {
			setValidSignUpEmail(true);
		} else {
			setValidSignUpEmail(false);
		}
	};

	// Function to handle password validation for sign-up
	const handleSignUpPassword = (event: any) => {
		const { value } = event.target;
		let password = value;
		setSignUpPassword(password);
		if (password.length >= 8) {
			if (lowerUpperNumberSpecialRegex.test(password)) {
				setValidSignUpPassword(true);
			} else if (lowerUpperAndNumberRegex.test(password)) {
				setValidSignUpPassword(true);
			} else {
				setValidSignUpPassword(false);
			}
		} else {
			setValidSignUpPassword(false);
		}
	};

	// Function to handle sign-up form submission
	const handleSignUpSubmit = (event: any) => {
		event.preventDefault();

		if (validSignUpName && validSignUpEmail && validSignUpPassword) {
			setShowPopup(true);
		} else {
			if (!validSignUpName) {
				let message = "Please enter a valid name";
				notify(message, "warning");
			} else if (!validSignUpEmail) {
				let message = "Please enter a valid email";
				notify(message, "warning");
			} else {
				let message = "Create a new strong password";
				notify(message, "warning");
			}
		}
	};

	const handleShowPasswordToggle = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};

	function signUpFunction() {
		let newUser = {
			email: signUpEmail,
			password: signUpPassword,
			name: signUpName,
		};

		fetch(`${userRoutes.register}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newUser),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.isError) {
					notify(res.message, "warning");
				} else {
					handleSuccessfulSignup(res);
				}
			})
			.catch((err) => {
				console.log(err);
				notify(err.message, "error");
			});
	}

	const handleSuccessfulSignup = (res: any) => {
		console.log(res);
		let user = res.user;
		localStorage.setItem("userInfo", JSON.stringify(user));
		setTimeout(() => {
			navigate("/");
		}, 3000);
	};

	const handleOtpSubmit = (otp: number) => {
		if (otp === 1234) {
			setLoading(true);
			signUpFunction();
			// setShowPopup(false);
		} else {
			console.log(`${otp}`);

			let message = "Incorrect OTP submission";
			notify(message, "error");
		}
	};

	const notify = (message: string, type: string) => {
		if (type === "error") {
			toast.error(message, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		} else if (type === "success") {
			toast.success(message, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		} else if (type === "info") {
			toast.info(message, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		} else if (type === "warning") {
			toast.warn(message, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		} else {
			toast("🦄 Wow so easy!", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
	};

	return (
		<div>
			{isLoading && <p id="pageLoader">Loading...</p>}
			{/* {isLoading && <Loading />} */}
			<div>
				<form onSubmit={handleSignUpSubmit} id="signinForm">
					<h2>{`{Code}`}Path </h2>
					<p>Sign up</p>
					<div>
						<input
							type="text"
							placeholder="Name"
							id="emailInput"
							name="Name"
							value={signUpName}
							onChange={handleSignUpName}
						/>
						<label htmlFor="" id="form-label">
							Name
						</label>
					</div>
					<div>
						<input
							type="text"
							placeholder="Email"
							id="emailInput"
							name="Email"
							value={signUpEmail}
							onChange={handleSignUpEmail}
						/>
						<label htmlFor="" id="form-label">
							Email
						</label>
					</div>
					<div>
						<input
							type={showPassword ? "text" : "password"}
							placeholder="Password"
							id="passwordInput"
							name="Password"
							value={signUpPassword}
							onChange={handleSignUpPassword}
						/>
						<br />
						<label htmlFor="" id="form-label">
							Password
						</label>{" "}
						<br />
						<div id="eye">
							<input
								type="checkbox"
								name="showpassword"
								checked={showPassword}
								onChange={handleShowPasswordToggle}
							/>
							<span>Show password</span> <br />
						</div>
					</div>
					<button type="submit" id="submitButton">
						Sign Up
					</button>
				</form>

				<ToastContainer />
				{showPopup && (
					<Popup
						onClose={() => setShowPopup(false)}
						onOtpSubmit={handleOtpSubmit}
					/>
				)}
			</div>
		</div>
	);
};

export default SignUp;
