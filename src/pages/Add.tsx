import React, { useState } from "react";

import "../styles/Add.css";
function Add() {
	const [question, setQuestion] = useState("")
	const [answer, setAnswer] = useState("")
	const [skill, setSkill] = useState("")
	const [otherSkill, setOtherSkill] = useState("")
	const [level, setLevel] = useState("")

	const handelQuestion = (event:any) => {
		const value = event.target.value
		setQuestion(value)
	};
	const handelAnswer = (event:any) => {
		const value = event.target.value
		setAnswer(value)
	};
	const handelSkill = (event:any) => {
		const value = event.target.value
		setSkill(value)
	};
	const handelOtherSkill = (event:any) => {
		const value = event.target.value
		setOtherSkill(value)
	}
	const handelLevel = (event:any) => {
		const value = event.target.value
		setLevel(value)
	};
	return (
		<div>
			
			<form id="signinForm">
				<h2>{`{Code}`}Path </h2>
				<p>Add Question</p>
				<div>
					<textarea name="" id="input" cols={30} rows={10} value={question} onChange={handelQuestion}></textarea>
					<label htmlFor="" id="form-label">
						Question
					</label>
				</div>
				<div>
					<textarea name="" id="input" cols={30} rows={10} value={answer} onChange={handelAnswer}></textarea>
					<label htmlFor="" id="form-label">
						Answer
					</label>
				</div>
				<div>
				<select name="" id="input"  value={skill} onChange={handelSkill} >
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
				{
					skill === "Other" && <input type="text"  id="emailInput" value={otherSkill} onChange={handelOtherSkill}/>
				}
				<div>
					<label id="form-label">Level</label>
					<select name="" id="input" value={level} onChange={handelLevel}>
						<option value=""></option>
						<option value="Hard">Hard</option>
						<option value="Medium">Medium</option>
						<option value="Easy">Easy</option>
					</select>
				</div>
				<button type="submit" id="submitButton" className="button-57">
					<span className="text">Add Question</span>
					<span>Post Question</span>
				</button>
			</form>
		</div>
	);
}

export default Add;
