import React from "react";

import "../styles/Add.css";
function Add() {
	//question, answer, skill, level
	const handelSubmit = () => {
		console.log("handelSubmit called");
	};
	return (
		<div>
			
			<form id="signinForm">
				<h2>{`{Code}`}Path </h2>
				<p>Add Question</p>
				<div>
					<textarea name="" id="emailInput" cols={30} rows={10}></textarea>
					<label htmlFor="" id="form-label">
						Question
					</label>
				</div>
				<div>
					<textarea name="" id="emailInput" cols={30} rows={10}></textarea>
					<label htmlFor="" id="form-label">
						Answer
					</label>
				</div>
				<div>
				<select name="" id="emailInput">
						<option value=""></option>
						<option value="JavaScript">JavaScript</option>
						<option value="">Node Js</option>
						<option value="">TypeScript</option>
						<option value="">React</option>
						<option value="">Others...</option>
					</select>
					<label htmlFor="" id="form-label">
						Skill
					</label>
				</div>
				<div>
					<label id="form-label">Level</label>
					<select name="" id="emailInput">
						<option value=""></option>
						<option value="">Hard</option>
						<option value="">Medium</option>
						<option value="">Easy</option>
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
