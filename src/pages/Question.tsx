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

function Question() {
	const { id } = useParams();
	const [userDetails, setUserDetails] = useState<any | null>(null);
	const [userId, setUserId] = useState<any | null>();
	const [token, setToken] = useState<any | null>();

	const [question, setQuestion] = useState<IQuestion | null>(null);
	const [isAnswerVisible, setIsAnswerVisible] = useState(false);

	console.log(id);
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

  const handelGoogle =()=>{
    console.log(question?.question)

    let url = 'https://www.google.com/search?q='
    let q:any=question?.question.split(" ");
    if(q.length){
      for(let i=0;  i<q.length; i++) {
        if(i===q.length-1){
          url += q[i]
        }else{
          url += q[i]+'+'
        }
      }
    }
    window.open(url, '_blank')
  }

  const handelYoutube =()=>{
    console.log(question?.question)

    let url = 'https://www.youtube.com/results?search_query='
    let q:any=question?.question.split(" ");
    if(q.length){
      for(let i=0;  i<q.length; i++) {
        if(i===q.length-1){
          url += q[i] 
        }else{
          url += q[i]+'+'
        }
      }
    }
    window.open(url, '_blank')
  }


  const handelChatGPT =()=>{
    let q:any=question?.question
    console.log(q)

    navigator.clipboard.writeText(q).then(
      function () {
        notify("Question copied in you clipboard, Paste on ChatGpt","success")
        setTimeout(() => {
          window.open("https://chat.openai.com/", "_blank")
        }, 3000);
      },
      function () {
        notify("Failed to copy question","error")
      }
    );
  }

  const handelBard =()=>{
    let q:any=question?.question
    console.log(q)

    navigator.clipboard.writeText(q).then(
      function () {
        notify("Question copied in you clipboard, Paste on Bard","success")
        setTimeout(() => {
          window.open("https://bard.google.com/", "_blank")
        }, 3000);
      },
      function () {
        notify("Failed to copy question","error")
      }
    );
  }

	useEffect(() => {
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
					setQuestion(res.question);
				}
			})
			.catch((err) => {
				console.log(err);
				notify(err.message, "error");
			});
	}, []);

	const answerVisible = () => {
		setIsAnswerVisible(!isAnswerVisible);
	};
	return (
		<div id="question">
			<div id="top">
				<h2>
					<span>Question:</span> <br />
					{question?.question}
				</h2>
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
								<img src={youtube} alt=""/>
							</button>
							<button id="chat" onClick={handelChatGPT}>
								<img src={chatgpt} alt=""/>
                Chat GPT
							</button>
							<button id="bard" onClick={handelBard}>
								<img src={bard} alt=""/>
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
