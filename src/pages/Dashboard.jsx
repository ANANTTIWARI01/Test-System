function Dashboard({ answerList ,questionNumber }) {
  console.log(questionNumber);
  
  return (
    <div>
      <h2>Your Answers</h2>
      {answerList.map((answer, index) => (
        
        <p key={index}>{index +1 }{answer} </p>
      ))}
    </div>
  );
}

export default Dashboard;