function Dashboard({ answerList }) {
  console.log(answerList);
  
  return (
    <div>
      <h2>Your Answers</h2>
      {answerList.map((answer, index) => (
        <p key={index}>{answer}</p>
      ))}
    </div>
  );
}

export default Dashboard;