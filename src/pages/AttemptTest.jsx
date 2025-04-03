/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/Auth";
import instance from "../axiosConfig";

import DisplayQuestion from "./DisplayQuestion";
import Dashboard from "./Dashboard";

function AttemptTest() {
  const navigate = useNavigate();
  const { fetchQuestions } = useAuth();

  const { testID } = useParams();
  if (!testID) navigate("/home", { replace: true });

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [time, setTime] = useState(2);
  const [answerList, setAnswerList] = useState({
    questionNumber: "",
    answer: ""
  })
  const [userAnswers, setUserAnswers] = useState([])
  const [showDashboard, setShowDashboard] = useState(false)

  useEffect(() => {
    if (testID) {
      fetchData(testID);
    }
  }, [testID]);

  useEffect(() => {
    let interval;

    interval = setInterval(() => {
      if (time === 1) {
        if (questionNumber >= questions.length - 1) {
          postingData()

          clearInterval(interval);
          setShowDashboard(true)
        } else {
          console.log(questions.length, questionNumber);
          setTime(2);
          setQuestionNumber((prev) => prev + 1);
        }
      } else {
        setTime((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [questions, time]);

  async function fetchData(testID) {
    setLoading(true);
    setQuestions(await fetchQuestions(testID));
    setLoading(false);
  }

  function changeQuestion() {
    setQuestionNumber((prev) => prev + 1)
    setTime(2)
  }

  function storingAnswer(answer) {
    setAnswerList((prev) => ({ ...prev, answer: answer, questionNumber: questionNumber }))
    // setUserAnswers((prev)=>([...prev,answerList]))

  }


  useEffect(() => {
    if (answerList.questionNumber !== "" && answerList.answer !== "") {
      setUserAnswers((prev) => [...prev, answerList]);
    }
  }, [answerList]);
  console.log(answerList, userAnswers);


  async function postingData() {
    try {
      const response = await instance.put("/user/test/submit/" + testID, userAnswers)
      console.log(response);
    }
    catch (error) {
      console.log(error);

    }
  }

  // console.log(userAnswers);

  if (loading) return <div id="loading">LOADING...</div>;
  if (showDashboard) return <Dashboard userAnswers={userAnswers} />
  return (
    <div className="quizBlock" >
      <DisplayQuestion question={questions[questionNumber]} storingAnswer={storingAnswer} />
      <button onClick={() => changeQuestion()}>Next Question</button>

      <h1>{time}</h1>
    </div>
  );
}

export default AttemptTest;