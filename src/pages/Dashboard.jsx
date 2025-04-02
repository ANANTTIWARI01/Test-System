function Dashboard({ answerList }) {
  return (
    <div>
      <h2>Answers</h2>
      {answerList.map((answer, index) => (
        <p key={index}>{answer}</p>
      ))}
    </div>
  );
}

export default Dashboard;