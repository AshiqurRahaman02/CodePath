import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes , faThumbsUp, faCircleDot, faCircleCheck} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../components/Navbar";
import QuestionLeftbar from "../components/QuestionLeftbar";
import { questionRoute } from "../api/questionRoutes";
import { IQuestion } from '../utils/Interfaces';

import "../styles/Questions.css";

function Questions() {
	const [userDetails, setUserDetails] = useState<any | null>(null);
	const [userId, setUserId] = useState<any | null>();
	const [token, setToken] = useState<any | null>();

	const [displayQuestions, setDisplayQuestions] = useState<IQuestion[]>([]);

	const location = useLocation();
	const navigate = useNavigate();

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

	

	useEffect(() => {
		const userDetails = localStorage.getItem("userInfo");
		const token = localStorage.getItem("token");
		if (token && userDetails) {
			const parsedUserDetails = JSON.parse(userDetails);
			setUserDetails(parsedUserDetails);

			setUserId(parsedUserDetails._id);
			setToken(token);

			const currentURLWithoutParams =
				window.location.origin + window.location.pathname;
			console.log(currentURLWithoutParams);

			const searchParams = new URLSearchParams(location.search);
			console.log(searchParams);

			fetch(`${questionRoute.byQuery}?${searchParams}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
			})
				.then((res) => res.json())
				.then((res) => {
					if (res.isError) {
						notify(res.message, "warning");
					} else {
						setDisplayQuestions(res.questions);
						console.log(res.questions[0]);
					}
				})
				.catch((err) => {
					console.log(err);
					notify(err.message, "error");
				});
		} else {
			let message = "Please Login first.";
			notify(message, "error");
			setTimeout(() => {
				navigate("/signin");
			}, 3000);
		}
	}, []);
	return (
		<div>
			<Navbar />
			<div id="questionsHeader">
				<QuestionLeftbar />
				<div id="parent">
					{displayQuestions.map((question) => (
						<div key={question._id}>
							<div>
								<h2>{question.question}</h2>
							</div>
							<div>
								<p>
									<span id={question.skill}>{question.skill}</span>
									<span>
										{question.attemptedBy.includes(userId)
											? <span><FontAwesomeIcon icon={faCircleCheck} style={{color: "#1aff5e",}} /> Attemped</span>
											: <span><FontAwesomeIcon icon={faCircleDot} style={{color: "#ff0000",}} /> Not Attemped</span>}
									</span>
								</p>
								<p>
									<span id={question.difficulty}>{question.difficulty}</span>
								</p>
								<p>
									<span>{question.creatorName}</span>
									<span><FontAwesomeIcon icon={faThumbsUp} size="sm" style={{color: "#191645",}} /> {question.likes}</span>
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
			<ToastContainer />
		</div>
	);
}

export default Questions;
