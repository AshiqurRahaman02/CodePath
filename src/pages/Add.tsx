import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LinearProgress from "@mui/material/LinearProgress";

import { questionRoute } from "../api/questionRoutes";

import "../styles/Add.css";
function Add() {
	const [question, setQuestion] = useState("");
	const [answer, setAnswer] = useState("");
	const [skill, setSkill] = useState("");
	const [otherSkill, setOtherSkill] = useState("");
	const [level, setLevel] = useState("");

	const [userDetails, setUserDetails] = useState<any | null>(null);
	const [userId, setUserId] = useState<any | null>();
	const [token, setToken] = useState<any | null>();

	const [progress, setProgress] = useState(0);
	const [isProgress, setIsProgress] = useState(false);

	const navigate = useNavigate();

	const handelQuestion = (event: any) => {
		const value = event.target.value;
		setQuestion(value);
	};
	const handelAnswer = (event: any) => {
		const value = event.target.value;
		setAnswer(value);
	};
	const handelSkill = (event: any) => {
		const value = event.target.value;
		setSkill(value);
	};
	const handelOtherSkill = (event: any) => {
		const value = event.target.value;
		setOtherSkill(value);
	};
	const handelLevel = (event: any) => {
		const value = event.target.value;
		setLevel(value);
	};

	const handelSubmit = (e: any) => {
		e.preventDefault();

		if (question && answer && skill && level) {
			if (skill === "Other" && !otherSkill) {
				let message = "Please enter a valid skill for this question";
				notify(message, "warning");
			} else {
				setProgress(0);
				displayProgressBar();
				setTimeout(() => {
					setIsProgress(false);
				}, 10000);

				postQuestion();
			}
		} else {
			if (!question) {
				let message = "Please enter a valid question";
				notify(message, "warning");
			} else if (!answer) {
				let message = "Please enter a valid answer";
				notify(message, "warning");
			} else if (!skill) {
				let message = "Please choose a valid skill";
				notify(message, "warning");
			} else if (!level) {
				let message = "Please choose a valid level";
				notify(message, "warning");
			} else {
				let message = "Please try again";
				notify(message, "defult");
			}
		}
	};

	const postQuestion = () => {
		let object = {
			question,
			answer,
			skill,
			difficulty: level,
			creatorID: userId,
			creatorName: userDetails.name,
		};
		if (skill === "Other") {
			object.skill = otherSkill;
		}

		fetch(questionRoute.addQuestion, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			body: JSON.stringify(object),
		})
			.then((res) => res.json())
			.then((res) => {
				setProgress(100);
				setIsProgress(false);
				if (res.isError) {
					notify(res.message, "warning");
				} else {
					notify(res.message, "success");
				}
			})
			.catch((err) => {
				setProgress(100);
				setIsProgress(false);
				console.log(err);
				notify(err.message, "error");
			});
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
			toast(message, {
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

	useEffect(() => {
		const userDetails = localStorage.getItem("userInfo");
		const token = localStorage.getItem("token");
		if (token && userDetails) {
			const parsedUserDetails = JSON.parse(userDetails);
			setUserDetails(parsedUserDetails);

			setUserId(parsedUserDetails._id);
			setToken(token);
		} else {
			let message = "Please Login first.";
			notify(message, "error");
			setTimeout(() => {
				navigate("/signin");
			}, 3000);
		}
	}, []);

	const displayProgressBar = () => {
		setIsProgress(true);
		let currentProgress = 0;
		setInterval(() => {
			currentProgress += 10;
			setProgress(currentProgress);
			if (progress === 100) {
				return;
			}
		}, 1000);
	};

	return (
		<div>
			<div id="progress">
				{isProgress && (
					<LinearProgress variant="determinate" value={progress} />
				)}
			</div>
			<form id="addQuestionForm">
				<h2>{`{Code}`}Path </h2>
				<p>Add Question</p>
				<div>
					<textarea
						name=""
						id="input"
						cols={30}
						rows={10}
						value={question}
						onChange={handelQuestion}
					></textarea>
					<label htmlFor="" id="form-label">
						Question
					</label>
				</div>
				<div>
					<textarea
						name=""
						id="input"
						cols={30}
						rows={10}
						value={answer}
						onChange={handelAnswer}
					></textarea>
					<label htmlFor="" id="form-label">
						Answer
					</label>
				</div>
				<div>
					<select name="" id="input" value={skill} onChange={handelSkill}>
						<option value=""></option>
						<option value="JavaScript">JavaScript</option>
						<option value="Node Js">Node Js</option>
						<option value="TypeScript">TypeScript</option>
						<option value="React">React</option>
						<option value="Other">Others...</option>
					</select>
					<label htmlFor="" id="form-label">
						Skill
					</label>
				</div>
				{skill === "Other" && (
					<div>
						<input
							type="text"
							id="emailInput"
							name="skill"
							autoComplete="off"
							placeholder="Enter skill name"
							value={otherSkill}
							onChange={handelOtherSkill}
						/>
						<label htmlFor="" id="form-label">
							Enter skill name
						</label>
					</div>
				)}
				<div>
					<label id="form-label">Difficulty Level</label>
					<select name="" id="input" value={level} onChange={handelLevel}>
						<option value=""></option>
						<option value="Hard">Hard</option>
						<option value="Medium">Medium</option>
						<option value="Easy">Easy</option>
					</select>
				</div>
				<button
					type="submit"
					id="submitButton"
					className="button-57"
					onClick={handelSubmit}
				>
					<span className="text">Add Question</span>
					<span>Post Question</span>
				</button>
			</form>
			<ToastContainer />
		</div>
	);
}

export default Add;
