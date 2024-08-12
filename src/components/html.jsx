import { useEffect, useState } from "react";
import "./html.css"; 

const ProgressBar = ({ bgcolor, progress, height }) => {
  const Parentdiv = {
    height: height,
    width: '95%',
    backgroundColor: 'whitesmoke',
    borderRadius: 40,
    margin: 20,
  };

  const Childdiv = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: bgcolor,
    borderRadius: 40,
    textAlign: 'right',
  };

  const progresstext = {
    padding: 10,
    color: 'black',
    fontWeight: 900,
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${progress}%`}</span>
      </div>
    </div>
  );
};

function Quiz({ quizType, onReturn }) { // Accept the onReturn prop
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  useEffect(() => {
    fetch(`/${quizType}question.json`) // Use quizType to fetch the correct questions
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const shuffledQuestions = shuffleArray(data);
        setQuestions(shuffledQuestions);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, [quizType]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleAnswerOption = (option) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[currentQuestionIndex] = option;
    setSelectedOptions(updatedSelectedOptions);

    const isCorrect = option === questions[currentQuestionIndex].answer;

    if (!answeredQuestions.includes(currentQuestionIndex)) {
      if (isCorrect) {
        setScore(score + 1);
      }
      setAnsweredQuestions((prev) => [...prev, currentQuestionIndex]);
    }

    setIsOptionSelected(true);
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    setIsOptionSelected(false);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setIsOptionSelected(false);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptions([]);
    setScore(0);
    setShowResults(false);
    setIsOptionSelected(false);
    setAnsweredQuestions([]);
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }
  
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="main">
      {showResults ? (
        <div className="results">
          <h2>Quiz Results</h2>
          <p>You scored {score} out of {questions.length}</p>
          <button onClick={handleRestart}>Restart Quiz</button>
        </div>
      ) : (
        <div className="question">
          <span className="problems">
            Q{currentQuestionIndex + 1}. {questions[currentQuestionIndex].question}
          </span>
          <ProgressBar bgcolor="skyblue" progress={parseInt(progressPercentage)} height={20} />
          <ul>
            {questions[currentQuestionIndex].options.map((option, index) => {
              const isSelected = selectedOptions[currentQuestionIndex] === option;
              const isCorrect = option === questions[currentQuestionIndex].answer;
              let className = "";

              if (isSelected) {
                className = isCorrect ? "correct" : "incorrect";
              } else if (isCorrect && isOptionSelected) {
                className = "correct";
              }

              return (
                <li
                  key={index}
                  className={className}
                  onClick={() => handleAnswerOption(option)}
                >
                  {option}
                </li>
              );
            })}
          </ul>
          <div className="controls">
            {currentQuestionIndex > 0 && (
              <button onClick={handlePrevQuestion}>Previous Question</button>
            )}
            <button onClick={handleNextQuestion}>
              Next Question
            </button>
          </div>
          <div className="score-display">
            <h3>Your Score: {score}</h3>
          </div>
        </div>
      )}
      <button id='btn' onClick={onReturn}>Return</button>
    </div>
  );
}

export default Quiz;
