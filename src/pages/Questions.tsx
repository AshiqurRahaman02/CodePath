import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faThumbsUp,
	faCircleDot,
	faCircleCheck,
	faShuffle,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import QuestionLeftbar from "../components/QuestionLeftbar";
import QuestionTemplate from "../components/QuestionTemplate";
import { questionRoute } from "../api/questionRoutes";
import { IQuestion } from "../utils/Interfaces";

import "../styles/Questions.css";
import Search from "../components/Search";

function Questions() {
	const [userDetails, setUserDetails] = useState<any | null>(null);
	const [userId, setUserId] = useState<any | null>();
	const [token, setToken] = useState<any | null>();

	const [displayQuestions, setDisplayQuestions] = useState<IQuestion[]>([]);
	const [allQuestions, setAllQuestions] = useState<IQuestion[]>([]);

	const [isLoading, setIsLoading] = useState(true);

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

	const getAllQuestions = () => {
		fetch(`${questionRoute.getAllQuestion}`)
			.then((res) => res.json())
			.then((res) => {
				if (res.isError) {
					notify(res.message, "warning");
				} else {
					setAllQuestions(res.questions);
				}
			})
			.catch((err) => {
				console.log(err);
				notify(err.message, "error");
			});
	};

	const handelSearch = (searchInput: any) => {
		if(searchInput){
			setIsLoading(true);
		
		
		fetch(`${questionRoute.searchQuestion}/${searchInput}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		})
			.then((res) => res.json())
			.then((res) => {
				setIsLoading(false);
				if (res.isError) {
					notify(res.message, "warning");
					setDisplayQuestions(allQuestions)
				} else {
					setDisplayQuestions(res.questions)
				}
			})
			.catch((err) => {
				setIsLoading(false);
				console.log(err);
				notify(err.message, "error");
			});
		}else{
			notify("Please enter valid input", "warning");
		}

	};
	const handleQuestionUpdate = (params: any) => {
		let status = "";
		let difficulty: any = [];
		let skills: any = [];
		if (params) {
			const skillMap: Record<string, string> = {
				js: "JavaScript",
				node: "Node Js",
				ts: "TypeScript",
				react: "React",
			};
			const difficultyMap: Record<string, string> = {
				e: "Easy",
				m: "Medium",
				h: "Hard",
			};

			// let param = params.split("&");
			// let diffs=[]
			// let skis = []

			// for(let i = 0; i < params.length; i++){
			// 	let [key, value] = params[i].split("=");

			// 	if(key === "s"){
			// 		setStatus(value)
			// 	}

			// 	if(key === "d"){
			// 		diffs.push(difficultyMap[value])
			// 	}

			// 	if(key === "skills"){
			// 		skis.push(skillMap[value] || value)
			// 	}
			// }

			// setDifficulty(diffs)
			// setSkills(skis)

			const searchParams = new URLSearchParams(window.location.search);
			const statusParam = searchParams.get("s");
			status = statusParam || "";

			// Set difficulty state based on the 'd' query parameter (may be an array)
			const difficultyParam = searchParams.getAll("d");
			difficulty = difficultyParam.map(
				(sortForm: any) => difficultyMap[sortForm] || sortForm
			);

			// Set skills state based on the 'skills' query parameter (may be an array)
			const skillsParam = searchParams.getAll("skills");
			skills = skillsParam.map((sortForm) => skillMap[sortForm] || sortForm);

			const filteredQuestions = allQuestions.filter((question) => {
				// Check status filter
				if (status === "a") {
					if (!question.attemptedBy.includes(userId)) {
						return false;
					}
				} else if (status === "not") {
					if (question.attemptedBy.includes(userId)) {
						return false;
					}
				}

				// Check difficulty filter
				if (
					difficulty.length > 0 &&
					!difficulty.includes(question.difficulty)
				) {
					return false;
				}

				// Check skills filter
				if (skills.length) {
					if (
						skills.includes("others") &&
						!Object.values(skillMap).includes(question.skill)
					) {
						return true;
					}
					if (
						skills[0] === "others" &&
						Object.values(skillMap).includes(question.skill)
					) {
						return false;
					}
					if (Array.isArray(skills) && !skills.includes(question.skill)) {
						return false;
					}
				}

				return true;
			});
			setIsLoading(false)
			setDisplayQuestions(filteredQuestions);
		} else {
			setIsLoading(false)
			setDisplayQuestions(allQuestions);
		}
	};

	const handelRandomQuestion = () => {
		const searchParams = new URLSearchParams(location.search);
		fetch(`${questionRoute.random}?${searchParams}`, {
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
					navigate(`/question/${res.question._id}`);
				}
			})
			.catch((err) => {
				console.log(err);
				notify(err.message, "error");
			});
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

			const searchParams = new URLSearchParams(location.search);

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
						setIsLoading(false)
						setDisplayQuestions(res.questions);
						if (searchParams.size) {
							notify(
								"Please wait for 5s before start filtering",
								"info"
							);
							setTimeout(() => {
								getAllQuestions();
							}, 5000);
						} else {
							setAllQuestions(res.questions);
						}
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
			<div id="questionsHeader">
				<QuestionLeftbar onChange={handleQuestionUpdate} />
				<div>
					<div id="mainTop">
						<Search onChange={handelSearch} />
						<button onClick={handelRandomQuestion}>
							<FontAwesomeIcon icon={faShuffle} /> Pick Random Question
						</button>
					</div>
					
						{isLoading ? (
							<QuestionTemplate />
						) : (
							<div id="parent">
							{displayQuestions.map((question) => (
								<div key={question._id}>
									<div>
										<h2>
											<Link to={`/question/${question._id}`}>
												{question.question}
											</Link>
										</h2>
									</div>
									<div>
										<p>
											<span id={question.skill}>
												{question.skill}
											</span>
											<span>
												{question.attemptedBy.includes(userId) ? (
													<span>
														<FontAwesomeIcon
															icon={faCircleCheck}
															style={{ color: "#1aff5e" }}
														/>{" "}
														Attemped
													</span>
												) : (
													<span>
														<FontAwesomeIcon
															icon={faCircleDot}
															style={{ color: "#ff0000" }}
														/>{" "}
														Not Attemped
													</span>
												)}
											</span>
										</p>
										<p>
											<span id={question.difficulty}>
												{question.difficulty}
											</span>
										</p>
										<p>
											<span>Posted by: {question.creatorName}</span>
											<span>
												<FontAwesomeIcon
													icon={faThumbsUp}
													size="sm"
													style={{ color: "#191645" }}
												/>{" "}
												{question.likes}
											</span>
										</p>
									</div>
								</div>
							))}
							</div>
						)}
					
				</div>
			</div>
			<ToastContainer />
		</div>
	);
}

export default Questions;
