import { useEffect, useState } from "react";
import DisplayQuestion from "./DisplayQuestion";
import Dashboard from "./Dashboard";

function AttemptTest({ fetchQuestions, testID }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [time, setTime] = useState(2);
  const [answerList, setAnswerList] = useState([]);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    if (testID) {
      fetchData(testID);
    }
  }, [testID]);

  useEffect(() => {
    if (questions.length) {
      const interval = setInterval(() => {
        if (time === 1) {
          if (questionNumber >= questions.length - 1) {
            clearInterval(interval);
            setShowDashboard(true); 
          } else {
            setTime(2);
            setQuestionNumber((prev) => prev + 1);
          }
        } else {
          setTime((prev) => prev - 1);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [time, questions, questionNumber]);

  async function fetchData(testID) {
    setLoading(true);
    const fetchedQuestions = await fetchQuestions(testID);
    setQuestions(fetchedQuestions);
    setLoading(false);
  }

  function storingAnswer(answer) {
    setAnswerList([...answerList, answer]);
  }

  if (loading) return <div>Loading...</div>;

  if (showDashboard) return <Dashboard answerList={answerList} />; 

  return (
    <div>
      <DisplayQuestion question={questions[questionNumber]} storingAnswer={storingAnswer} />
      <h1>Time Remaining: {time}s</h1>
    </div>
  );
}

export default AttemptTest;