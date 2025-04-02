function DisplayQuestion({ question, storingAnswer }) {
  return (
    <div>
      <h3>{question.question}</h3>
      <div>
        {question.options.map((option, index) => (
          <p key={index} onClick={() => storingAnswer(option)}>
            {option}
          </p>
        ))}
      </div>
    </div>
  );
}

export default DisplayQuestion;