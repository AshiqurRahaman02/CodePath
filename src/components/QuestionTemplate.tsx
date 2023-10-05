import React,{useState, useEffect} from "react";

import "../styles/QuestionTemplate.css";

function QuestionTemplate() {
  const [question, setQuestion] = useState([1,2,3,4,5 ,6,7,8,9,10,11,12,13 ,14,15])

	return (
		<div id="parent">
			{/* <span className="skeleton-loader"></span>  */}
			
      {question.map((q:any)=>(
        <div>
				<div>
					<span className="skeleton-loader" id="tamplate-question"></span>
				</div>
				<div>
					<p>
						<span className="skeleton-loader" id="tamplate-skill"></span>
						<span className="skeleton-loader" id="tamplate-attemped"></span>
					</p>
					<p>
						<span className="skeleton-loader" id="tamplate-difficulty"></span>
					</p>
					<p>
						<span className="skeleton-loader" id="tamplate-creator"></span>
						<span className="skeleton-loader" id="tamplate-likes"></span>
					</p>
				</div>
			</div>
      ))}
		</div>
	);
}

export default QuestionTemplate;
