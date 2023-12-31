import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faThumbsUp,
	faCircleDot,
	faCircleCheck,
	faChevronUp,
	faBookmark,
	faUser,
	faArrowRight,
	faMicrophone,
	faMicrophoneSlash,
	faRotateRight
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { questionRoute } from "../api/questionRoutes";
import { IAnswer, IQuestion } from "../utils/Interfaces";
import "../styles/Question.css";
import google from "../assets/google.svg";
import chatgpt from "../assets/ChatGPT.png";
import bard from "../assets/bard.gif";
import youtube from "../assets/youtube.svg";
import { userRoutes } from "../api/userRoutes";
import { answerRoute } from "../api/answerRoutes";

function Question() {
	const { id } = useParams();
	const [userDetails, setUserDetails] = useState<any | null>(null);
	const [userId, setUserId] = useState<any | null>();
	const [token, setToken] = useState<any | null>();

	const [question, setQuestion] = useState<IQuestion | null>(null);
	const [isAnswerVisible, setIsAnswerVisible] = useState(false);

	const [likes, setLikes] = useState(0);
	const [isLiked, setIsLiked] = useState(false);
	const [isBookmarked, setIsBookmarked] = useState(false);
	const [isAttempted, setIsAttempted] = useState(false);

	const [userAnswers, setUserAnswers] = useState("");

	const [userAnswer, setUserAnswer] = useState("");

	const [allAnswers, setAllAnswers] = useState<IAnswer[]>([]);

	const startListening = () =>
		SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
	const { transcript, listening, resetTranscript } = useSpeechRecognition();

	const [userSpeeking, setUserSpeeking] = useState(false);

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

	const handelGoogle = () => {
		let url = "https://www.google.com/search?q=";
		let q: any = question?.question.split(" ");
		if (q.length) {
			for (let i = 0; i < q.length; i++) {
				if (i === q.length - 1) {
					url += q[i];
				} else {
					url += q[i] + "+";
				}
			}
		}
		window.open(url, "_blank");
	};

	const handelYoutube = () => {
		let url = "https://www.youtube.com/results?search_query=";
		let q: any = question?.question.split(" ");
		if (q.length) {
			for (let i = 0; i < q.length; i++) {
				if (i === q.length - 1) {
					url += q[i];
				} else {
					url += q[i] + "+";
				}
			}
		}
		window.open(url, "_blank");
	};

	const handelChatGPT = () => {
		let q: any = question?.question;

		navigator.clipboard.writeText(q).then(
			function () {
				notify(
					"Question copied in you clipboard, Paste on ChatGpt",
					"success"
				);
				setTimeout(() => {
					window.open("https://chat.openai.com/", "_blank");
				}, 3000);
			},
			function () {
				notify("Failed to copy question", "error");
			}
		);
	};

	const handelBard = () => {
		let q: any = question?.question;

		navigator.clipboard.writeText(q).then(
			function () {
				notify(
					"Question copied in you clipboard, Paste on Bard",
					"success"
				);
				setTimeout(() => {
					window.open("https://bard.google.com/", "_blank");
				}, 3000);
			},
			function () {
				notify("Failed to copy question", "error");
			}
		);
	};

	const handelPostAnswer = () => {
		if (userAnswer) {
			let answer = {
				userID: userDetails._id,
				userName: userDetails.name,
				answer: userAnswer,
				questionID: id,
			};

			fetch(`${answerRoute.create}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
				body: JSON.stringify(answer),
			})
				.then((res) => res.json())
				.then((res) => {
					if (res.isError) {
						notify(res.message, "warning");
					} else {
						notify(res.message, "success");
						getAnswers();
					}
				})
				.catch((err) => {
					console.log(err);
					notify(err.message, "error");
				});
		} else {
			notify("Please Enter Your Answer", "warning");
		}
	};

	const getAnswers = () => {
		fetch(`${answerRoute.answerInQuestion}/${id}`)
			.then((res) => res.json())
			.then((res) => {
				if (res.isError) {
					notify(res.message, "warning");
				} else {
					setAllAnswers(res.answers);
				}
			})
			.catch((err) => {
				console.log(err);
				notify(err.message, "error");
			});
	};

	function getTimeAgoString(dateString: string) {
		const currentDate = new Date();
		const date = new Date(dateString);
		const timeDifference = currentDate.getTime() - date.getTime();

		const minuteInMs = 60 * 1000;
		const hourInMs = 60 * minuteInMs;
		const dayInMs = 24 * hourInMs;
		const monthInMs = 30 * dayInMs;
		const yearInMs = 365 * dayInMs;

		if (timeDifference < minuteInMs) {
			const secondsAgo = Math.floor(timeDifference / 1000);
			return `${secondsAgo} seconds ago`;
		} else if (timeDifference < hourInMs) {
			const minutesAgo = Math.floor(timeDifference / minuteInMs);
			return `${minutesAgo} minutes ago`;
		} else if (timeDifference < dayInMs) {
			const hoursAgo = Math.floor(timeDifference / hourInMs);
			return `${hoursAgo} hours ago`;
		} else if (timeDifference < monthInMs) {
			const daysAgo = Math.floor(timeDifference / dayInMs);
			return `${daysAgo} days ago`;
		} else if (timeDifference < yearInMs) {
			const monthsAgo = Math.floor(timeDifference / monthInMs);
			return `${monthsAgo} months ago`;
		} else {
			const yearsAgo = Math.floor(timeDifference / yearInMs);
			return `${yearsAgo} years ago`;
		}
	}

	useEffect(() => {
		const userDetails = localStorage.getItem("userInfo");
		const token = localStorage.getItem("token");
		if (token && userDetails) {
			const parsedUserDetails = JSON.parse(userDetails);
			setUserDetails(parsedUserDetails);

			setUserId(parsedUserDetails._id);
			setToken(token);

			fetch(`${questionRoute.questionById}/${id}`, {
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
						setLikes(res.question.likes);
						setIsLiked(
							res.question.likedBy.includes(parsedUserDetails._id)
						);
						setIsAttempted(
							res.question.attemptedBy.includes(parsedUserDetails._id)
						);

						setQuestion(res.question);

						getAnswers();
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

	useEffect(() => {
		if (listening) {
			setUserSpeeking(true);
		} else {
			setUserSpeeking(false);
		}

		// if(userAnswers !== transcript){
		// 	setUserAnswers(userAnswers+transcript);
		// }
	}, [listening]);

	const answerVisible = () => {
		setIsAnswerVisible(!isAnswerVisible);
	};

	const handelLikeIncrese = () => {
		if (token) {
			if (!isLiked) {
				fetch(`${questionRoute.updateLike}/${question?._id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
					body: JSON.stringify({ action: "increment" }),
				})
					.then((res) => res.json())
					.then((res) => {
						if (res.isError) {
							notify(res.message, "warning");
						} else {
							setLikes(res.question.likes);
							setIsLiked(res.question.likedBy.includes(userId));
						}
					})
					.catch((err) => {
						console.log(err);
						notify(err.message, "error");
					});
			} else {
				let message = "You cannot like one question multiple times.";
				notify(message, "warning");
			}
		}
	};
	const handeladdBookmark = () => {
		if (token) {
			if (!isBookmarked) {
				fetch(`${userRoutes.addBookmark}/${userId}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
					body: JSON.stringify({
						questionID: id,
						question: question?.question,
					}),
				})
					.then((res) => res.json())
					.then((res) => {
						if (res.isError) {
							notify(res.message, "warning");
						} else {
							setIsBookmarked(true);
							if (res.user) {
								notify(res.message, "success");
							} else {
								notify(res.message, "warning");
							}
						}
					})
					.catch((err) => {
						console.log(err);
						notify(err.message, "error");
					});
			} else {
				let message = "Question already bookmarked.";
				notify(message, "warning");
			}
		}
	};
	const handelSubmit = () => {
		if (token) {
			if (userAnswers || transcript) {
				SpeechRecognition.stopListening()
				fetch(`${questionRoute.attempted}/${id}`, {
					method: "PUT",
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
							notify("Congratulation", "success");
						}
					})
					.catch((err) => {
						console.log(err);
						notify(err.message, "error");
					});
			} else {
				let message = "Please enter your answer.";
				notify(message, "warning");
			}
		}
	};
	const handelNext = () => {
		const Obj: Record<string, string> = {
			JavaScript: "js",
			"Node Js": "node",
			TypeScript: "ts",
			React: "react",
		};

		let skill = "others";

		if (question?.skill && Obj.hasOwnProperty(question.skill)) {
			skill = Obj[question.skill];
		}

		let query = `s=not&skills=${skill}`;
		fetch(`${questionRoute.random}?${query}`, {
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
					window.location.href = `/question/${res.question._id}`;
				}
			})
			.catch((err) => {
				notify(err.message, "error");
			});
	};
	return (
		<div id="question">
			<div id="top">
				<h2>
					<span>Question:</span> <br />
					{question?.question}
				</h2>
				<div>
					<button id="attempted">
						{isAttempted ? (
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
					</button>
					<button id={question?.difficulty}>
						<span>{question?.difficulty}</span>
					</button>
					<br />
					<button id="like" onClick={handelLikeIncrese}>
						<FontAwesomeIcon
							icon={faThumbsUp}
							size="xl"
							style={{ color: "#191645" }}
						/>
						{isLiked ? " Liked " : " Like "}
						{likes}
					</button>
					<button id="bookmark" onClick={handeladdBookmark}>
						<FontAwesomeIcon icon={faBookmark} />
						{isBookmarked ? " BookMarked" : " Bookmark"}
					</button>
				</div>
			</div>
			<div>
				<div id="answer">
					<h2>
						<span>Answer:</span>
						<span>
							{!isAnswerVisible ? (
								<FontAwesomeIcon
									icon={faChevronUp}
									rotation={180}
									size="xl"
									style={{ color: "#191645" }}
									id="leftbarIcon"
									className="leftbarIcon1"
									onClick={answerVisible}
								/>
							) : (
								<FontAwesomeIcon
									icon={faChevronUp}
									size="xl"
									style={{ color: "#191645" }}
									id="leftbarIcon"
									className="leftbarIcon2"
									onClick={answerVisible}
								/>
							)}
						</span>
					</h2>
					{isAnswerVisible && (
						<div>
							<p id="btns">
								<button id="google" onClick={handelGoogle}>
									<img src={google} alt="" />
								</button>
								<button id="youtube" onClick={handelYoutube}>
									<img src={youtube} alt="" />
								</button>
								<button id="chat" onClick={handelChatGPT}>
									<img src={chatgpt} alt="" />
									Chat GPT
								</button>
								<button id="bard" onClick={handelBard}>
									<img src={bard} alt="" />
									Bard
								</button>
							</p>
							<p>{question?.answer}</p>
						</div>
					)}
				</div>
				<div className="container">
					<div className="btn-style">
						{/* <p>Microphone: {listening ? "on" : "off"}</p> */}
						{/* <p>User Speeking: {userSpeeking ? "True" : "False"}</p> */}
						{listening ? (
							<button
								onClick={SpeechRecognition.stopListening}
								className="contactButton"
							>
								<FontAwesomeIcon
									icon={faMicrophoneSlash}
									className="iconButton"
								/>
								Stop Speeking
							</button>
						) : (
							<button onClick={startListening} className="contactButton">
								<FontAwesomeIcon
									icon={faMicrophone}
									id="faMicrophone"
									className="iconButton"
								/>
								Start Speeking
							</button>
						)}

						<button onClick={resetTranscript} className="contactButton">
						<FontAwesomeIcon icon={faRotateRight} className="iconButton"/> Clear
						</button>
					</div>
				</div>

				<div id="textarea">
					<textarea
						name=""
						id=""
						value={transcript}
						// onChange={(e) => setUserAnswers(e.target.value)}
						rows={10}
						placeholder="Click on Start Answering to start answering the question"
					></textarea>

					<div>
						<button onClick={handelSubmit}>
							<span className="text">Submit</span>
							<span>Submit </span>
						</button>
						<button onClick={handelNext}>
							<span className="text">Next Question</span>
							<span>
								<FontAwesomeIcon icon={faArrowRight} />
							</span>
						</button>
					</div>
				</div>
				<div id="comments">
					<h3>{allAnswers.length} Answers</h3>
					<div>
						<textarea
							placeholder="Enter Your answer..."
							value={userAnswer}
							onChange={(e) => setUserAnswer(e.target.value)}
						></textarea>
						<button id="add" onClick={handelPostAnswer}>
							Post answer
						</button>
					</div>
					<div>
						{allAnswers.map((answer) => (
							<div key={answer._id} id="comment">
								<div>
									<FontAwesomeIcon
										icon={faUser}
										size="2xl"
										style={{ color: "#191645" }}
									/>
								</div>
								<div>
									<p>
										{answer.userName}{" "}
										<span
											style={{ color: "#191645", fontSize: "13px" }}
										>
											{getTimeAgoString(answer.createdAt)}
										</span>
									</p>
									<p>
										{answer.answer} <br />
										<span
											style={{
												color: "#191645",
												fontSize: "15px",
												marginTop: "10px",
												cursor: "pointer",
											}}
										>
											<FontAwesomeIcon
												icon={faThumbsUp}
												size="sm"
												style={{ color: "#191645" }}
											/>{" "}
											{answer.likes}
										</span>
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
}

export default Question;
