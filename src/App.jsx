import { useState } from 'react';
import './App.css';
import image from './images/dark.png';
import Quiz from './components/html';

function App() {
  const [Mode, setMode] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [qutype, setQuizType] = useState('');

  function darkMode() {
    setMode((prevMode) => !prevMode);
  }

  function startQuiz(type) {
    setQuizType(type);
    setShowQuiz(true);
  }

  function returnToMainScreen() {
    setShowQuiz(false);
  }

  return (
    <>
      {showQuiz ? (
        <Quiz quizType={qutype} onReturn={returnToMainScreen} />  
      ) : (
        <div className={`main ${Mode ? 'dark-mode' : ''}`}>
          <img onClick={darkMode} className='photo' src={image} alt="Toggle Mode" />
          <div className='content'>
            <div className='text'>
              <h1>🌟Welcome to the <span id='end'>Front End Quiz🌟</span></h1>
              <p>Are you ready to <strong>test your knowledge</strong> and <strong>skills</strong> in front-end development? 🚀 This quiz is your chance to shine and evaluate your proficiency in various subjects related to front-end technologies! 💻✨</p>
              <p>Join us on this exciting journey and discover just how much you know! 🧠💡 Let's get started and have some fun! 🎉</p>
            </div>
            <div className='buttons'>
              <button onClick={() => startQuiz('html')} className='button'>
                <img className='img' src='https://cdn-icons-png.freepik.com/256/1216/1216733.png' alt='HTML' /> HTML
              </button>
              <button onClick={() => startQuiz('css')} className='button'>
                <img className='img' src="https://cdn-icons-png.freepik.com/256/732/732190.png" alt="CSS" /> CSS
              </button>
              <button onClick={() => startQuiz('js')} className='button'>
                <img className='img' src='https://cdn-icons-png.freepik.com/256/5968/5968292.png' alt='JavaScript' /> JavaScript
              </button>
              <button onClick={() => startQuiz('advancejs')} className='button'>
                <img className='img' src='https://cdn-icons-png.freepik.com/256/5968/5968292.png' alt='advance JavaScript' /> Advance JavaScript
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
