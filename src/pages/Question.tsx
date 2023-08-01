import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCheck,
	faTimes,
	faThumbsUp,
	faCircleDot,
	faCircleCheck,
	faChevronUp,
	faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../components/Navbar";
import QuestionLeftbar from "../components/QuestionLeftbar";
import { questionRoute } from "../api/questionRoutes";
import { IQuestion } from "../utils/Interfaces";
import "../styles/Question.css";
import google from "../assets/google.svg";
import chatgpt from "../assets/ChatGPT.png";
import bard from "../assets/bard.gif";
import youtube from "../assets/youtube.svg";
import { userRoutes } from "../api/userRoutes";

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
		console.log(question?.question);

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
		console.log(question?.question);

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
		console.log(q);

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
		console.log(q);

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
						console.log(res.question);

						setLikes(res.question.likes);
						setIsLiked(res.question.likedBy.includes(parsedUserDetails._id));
						setIsAttempted(res.question.attemptedBy.includes(parsedUserDetails._id));

						setQuestion(res.question);
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

	const answerVisible = () => {
		setIsAnswerVisible(!isAnswerVisible);
	};

	const handelLikeIncrese = () => {
		if (token) {
			if(!isLiked){
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
							console.log(res.question);
							setLikes(res.question.likes);
							setIsLiked(res.question.likedBy.includes(userId));
						}
					})
					.catch((err) => {
						console.log(err);
						notify(err.message, "error");
					});
			}else{
				let message = "You cannot like one question multiple times.";
				notify(message, "warning");
			}
		}
	};
	const handeladdBookmark = ()=>{
		if (token) {
			if(!isBookmarked){
				fetch(`${userRoutes.addBookmark}/${userId}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
					body: JSON.stringify({ questionID: id, question: question?.question}),
				})
					.then((res) => res.json())
					.then((res) => {
						if (res.isError) {
							notify(res.message, "warning");
						} else {
							console.log(res);
							setIsBookmarked(true)
							if(res.user){
								notify(res.message, "success");
							}else{
								notify(res.message, "warning");
							}
						}
					})
					.catch((err) => {
						console.log(err);
						notify(err.message, "error");
					});
			}else{
				let message = "Question already bookmarked.";
				notify(message, "warning");
			}
		}
	}
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
						{isBookmarked ? " BookMarked": " Bookmark"}
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
				<div id="textarea">
					<textarea
						name=""
						id=""
						rows={10}
						placeholder="Enter your answer here..."
					></textarea>

					<button>
						<span className="text">Get feedback</span>
						<span>Submit </span>
					</button>
				</div>
				<div id="comments">
					<div>
						<input type="text" placeholder="Add a comment… " />
						<button id="add">Add comment</button>
					</div>
					<div>
						<div></div>
					</div>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
}

export default Question;
