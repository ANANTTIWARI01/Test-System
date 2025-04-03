// import { useState } from "react";
import { Link } from "react-router-dom";
// import AttemptTest from "./AttemptTest";
import Dashboard from "./Dashboard";

function DisplayQuestion({ question ,storingAnswer }) {


  return (
    <>
      <h3 className="question">{question.question}</h3>
      <div className="options">
        {question.options.map((option, index) => {
          return (
            <p key={index} onClick={() => storingAnswer(option)}>
              {option}
            </p>
          );
        })}
      </div>
      <Link to="/">Quit Quiz</Link>
    </>
  );
}

export default DisplayQuestion;