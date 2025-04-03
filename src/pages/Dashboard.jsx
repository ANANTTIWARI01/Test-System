import { Link } from "react-router-dom";

function Dashboard({ answerList }) {
  

  return (
    <div>
      <h2>Your Answers</h2>
      {answerList.map((answer, index) => (
        <p key={index}>{index + 1}{answer} </p>
      ))}
      <Link to="/">Main Menu</Link>
    </div>
  );
}

export default Dashboard;