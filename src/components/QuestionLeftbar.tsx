import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

import "../styles/QuestionLeftbar.css";

function QuestionLeftbar() {
	const [isLeftbarVisible, setIsLeftbarVisible] = useState(true);

	// checkboxes
	const [isAttempted, setAttempted] = useState(true);
	const [isNotAttempted, setNotAttempted] = useState(true);
	const [isEasy, setEasy] = useState(true);
	const [isMediun, setMediun] = useState(true);
	const [isHard, setHard] = useState(true);
	const [isJs, setJs] = useState(true);
	const [isNode, setNode] = useState(true);
	const [isTs, setTs] = useState(true);
	const [isReact, setReact] = useState(true);
	const [isOthers, setOthers] = useState(true);

	const leftbar = () => {
		setIsLeftbarVisible(!isLeftbarVisible);
	};
	return (
		<div id="leftbar">
			{isLeftbarVisible ? (
				<div id="fillterdiv">
					<div id="sorting">
						<label htmlFor="">Sort by</label>
						<br />
						<select name="" id="">
							<option value="">Tranding</option>
							<option value="">Popularity</option>
							<option value="">Level: Easy to Hard</option>
							<option value="">Level: Hard to Low</option>
						</select>
					</div>
					<div id="attempted">
						<label htmlFor="">Status</label>
						<h3>
							<input
								type="checkbox"
								name="attempted"
								id=""
								checked={isAttempted}
								onChange={() => setAttempted(!isAttempted)}
							/>
							<span>Attempted</span>
						</h3>
						<h3>
							<input
								type="checkbox"
								name="not"
								id=""
								checked={isNotAttempted}
								onChange={() => setNotAttempted(!isNotAttempted)}
							/>
							<span>Not Attempted</span>
						</h3>
					</div>
					<div id="level">
						<label htmlFor="">Difficulty</label>
						<h3>
							<input
								type="checkbox"
								name="easy"
								id=""
								checked={isEasy}
								onChange={() => setEasy(!isEasy)}
							/>
							<span>Easy</span>
						</h3>
						<h3>
							<input
								type="checkbox"
								name="medium"
								id=""
								checked={isMediun}
								onChange={() => setMediun(!isMediun)}
							/>
							<span>Mediun</span>
						</h3>
						<h3>
							<input
								type="checkbox"
								name="hard"
								id=""
								checked={isHard}
								onChange={() => setHard(!isHard)}
							/>
							<span>Hard</span>
						</h3>
					</div>
					<div id="skills">
						<label htmlFor="">Skills</label>
						<h3>
							<input
								type="checkbox"
								name="js"
								id=""
								checked={isJs}
								onChange={() => setJs(!isJs)}
							/>
							<span>JavaScript</span>
						</h3>
						<h3>
							<input
								type="checkbox"
								name="node"
								id=""
								checked={isNode}
								onChange={() => setNode(!isNode)}
							/>
							<span>Node Js</span>
						</h3>
						<h3>
							<input
								type="checkbox"
								name="ts"
								id=""
								checked={isTs}
								onChange={() => setTs(!isTs)}
							/>
							<span>TypeScript</span>
						</h3>
						<h3>
							<input
								type="checkbox"
								name="react"
								id=""
								checked={isReact}
								onChange={() => setReact(!isReact)}
							/>
							<span>React</span>
						</h3>
						<h3>
							<input
								type="checkbox"
								name="others"
								id=""
								checked={isOthers}
								onChange={() => setOthers(!isOthers)}
							/>
							<span>Others...</span>
						</h3>
					</div>
				</div>
			) : (
				<p id="hr">LeftBar</p>
			)}
			{/* <hr /> */}
			<div id="iconDiv">
				{isLeftbarVisible ? (
					<FontAwesomeIcon
						icon={faChevronUp}
						rotation={270}
						size="2xl"
						style={{ color: "#191645" }}
						id="leftbarIcon"
						className="leftbarIcon1"
						onClick={leftbar}
					/>
				) : (
					<FontAwesomeIcon
						icon={faChevronUp}
						rotation={90}
						size="2xl"
						style={{ color: "#191645" }}
						id="leftbarIcon"
						className="leftbarIcon2"
						onClick={leftbar}
					/>
				)}
			</div>
		</div>
	);
}

export default QuestionLeftbar;
