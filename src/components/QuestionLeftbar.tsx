import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

import "../styles/QuestionLeftbar.css";

interface Fun {
	onChange: (params: any) => void;
  }

function QuestionLeftbar({onChange}:Fun) {
	const location = useLocation();
	const [isLeftbarVisible, setIsLeftbarVisible] = useState(true);

	const [windowUrl, setWindowUrl] = useState("");
	const navigate = useNavigate();

	const [sort, setSort] = useState(""); // To track the selected sort option

	// checkboxes
	const [isAttempted, setAttempted] = useState(true);
	const [isNotAttempted, setNotAttempted] = useState(true);
	const [isEasy, setEasy] = useState(true);
	const [isMedium, setMedium] = useState(true);
	const [isHard, setHard] = useState(true);
	const [isJs, setJs] = useState(true);
	const [isNode, setNode] = useState(true);
	const [isTs, setTs] = useState(true);
	const [isReact, setReact] = useState(true);
	const [isOthers, setOthers] = useState(true);

	// Listen for changes in the URL and update the state accordingly
	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);

		const currentURLWithoutParams =
			window.location.origin + window.location.pathname;
		setWindowUrl(currentURLWithoutParams);
		// console.log(currentURLWithoutParams);

		// Update state based on URL query parameters
		setSort(searchParams.get("sort") || "");

		if (!searchParams.has("s")) {
			setAttempted(true);
			setNotAttempted(true);
		} else {
			setAttempted(searchParams.getAll("s").includes("a"));
			setNotAttempted(searchParams.getAll("s").includes("not"));
		}

		if (!searchParams.has("d")) {
			setEasy(true);
			setMedium(true);
			setHard(true);
		} else {
			setEasy(
				searchParams.has("d") && searchParams.getAll("d").includes("e")
			);
			setMedium(
				searchParams.has("d") && searchParams.getAll("d").includes("m")
			);
			setHard(
				searchParams.has("d") && searchParams.getAll("d").includes("h")
			);
		}

		if (!searchParams.has("skills")) {
			setJs(true);
			setNode(true);
			setTs(true);
			setReact(true);
			setOthers(true);
		} else {
			setJs(
				searchParams.has("skills") &&
					searchParams.getAll("skills").includes("js")
			);
			setNode(
				searchParams.has("skills") &&
					searchParams.getAll("skills").includes("node")
			);
			setTs(
				searchParams.has("skills") &&
					searchParams.getAll("skills").includes("ts")
			);
			setReact(
				searchParams.has("skills") &&
					searchParams.getAll("skills").includes("react")
			);
			setOthers(
				searchParams.has("skills") &&
					searchParams.getAll("skills").includes("others")
			);
		}
	}, [location.search]);

	const [isFirstTime, setIsFirstTime] = useState(true)

	const updateURL = () => {
		const searchParams = new URLSearchParams();

		// Add sort option to URL query if selected
		if (sort) {
			searchParams.append("sort", sort);
		}

		// Add status options to URL query if selected
		const selectedStatus = [];
		if (isAttempted) {
			selectedStatus.push("a");
		}
		if (isNotAttempted) {
			selectedStatus.push("not");
		}
		if (selectedStatus.length === 2) {
			searchParams.delete("s");
		} else {
			selectedStatus.forEach((status) => {
				searchParams.append("s", status);
			});
		}

		// Add difficulty options to URL query if selected
		const selectedDifficulties = [];
		if (isEasy) {
			selectedDifficulties.push("e");
		}
		if (isMedium) {
			selectedDifficulties.push("m");
		}
		if (isHard) {
			selectedDifficulties.push("h");
		}

		// Check if all difficulty options are selected and add to URL query accordingly
		if (selectedDifficulties.length === 3) {
			searchParams.delete("d"); // Remove the 'd' parameter from the URL
		} else {
			selectedDifficulties.forEach((difficulty) => {
				searchParams.append("d", difficulty);
			});
		}

		// Add skill options to URL query if selected
		const selectedSkills = [];
		if (isJs) {
			selectedSkills.push("js");
		}
		if (isNode) {
			selectedSkills.push("node");
		}
		if (isTs) {
			selectedSkills.push("ts");
		}
		if (isReact) {
			selectedSkills.push("react");
		}
		if (isOthers) {
			selectedSkills.push("others");
		}

		if (selectedSkills.length === 5) {
			searchParams.delete("skills");
		} else {
			selectedSkills.forEach((skills) => {
				searchParams.append("skills", skills);
			});
		}

		// console.log(searchParams.toString());
		navigate(`?${searchParams.toString()}`);
		if(!isFirstTime){
			onChange(searchParams.toString())
		}
	};

	// Call the updateURL function whenever any option is selected or changed
	useEffect(() => {
		updateURL();
		setIsFirstTime(false)
	}, [
		sort,
		isAttempted,
		isNotAttempted,
		isEasy,
		isMedium,
		isHard,
		isJs,
		isNode,
		isTs,
		isReact,
		isOthers,
	]);

	const leftbar = () => {
		setIsLeftbarVisible(!isLeftbarVisible);
	};
	const handleSortChange = (e: any) => {
		setSort(e.target.value);
	};
	return (
		<div id="leftbar">
			{isLeftbarVisible ? (
				<div id="fillterdiv">
					<div id="sorting">
						<label htmlFor="">Sort by</label>
						<br />
						<select
							name=""
							id=""
							value={sort}
							onChange={handleSortChange}
						>
							<option value="">Tranding</option>
							<option value="po">Popularity</option>
							<option value="asc">Level: Easy to Hard</option>
							<option value="desc">Level: Hard to Low</option>
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
								checked={isMedium}
								onChange={() => setMedium(!isMedium)}
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
