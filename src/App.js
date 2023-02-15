import logo from './logo.svg';
import './App.css';
import Intro from "./Intro";
import Quiz from './Quiz';
import React, { useState } from 'react';

import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

function App() {
  const [startQuiz, setStartQuiz] = useState(false)
  const [allAnswers, setAllAnswers] = useState([])
  const [isShowAnswers, setIsShowAnswers] = useState(false);
  const [resetQuiz, setResetQuiz] = useState(0);
  const [allcorrect, setAllCorrect] = useState(false)
  function handleClick () {
      setStartQuiz(true)
  }

  var myHeaders = new Headers();
  myHeaders.append('Content-Type','text/plain; charset=charset=UTF-8');
  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=22&type=multiple", myHeaders)
        .then(res => res.json())
        .then(data => { 
              setAllAnswers(() => {
              return data.results.map(question => {
                  
                  const incorrect = question.incorrect_answers.map(answer => {
                      return {value: answer, id: nanoid(), isHeld: false, isCorrect: false};
                  });
                  
                  const correct = {value: question.correct_answer, id: nanoid(), isHeld: false, isCorrect: true};
                  
                  let allAnswerArr = [...incorrect];
                  const randomNum = Math.floor(Math.random() * 4);
                  allAnswerArr.splice(randomNum, 0, correct);

                  
                  
                  return {...question, allAnswer: allAnswerArr, id: nanoid()}; 
              });
          });
      })
}, [resetQuiz])




function updateHeld(qID, aID) {
  setAllAnswers(prevQuizData => {
      return prevQuizData.map( question => {
          if(qID !== question.id ){

              return question;
          } else {
              const newAnswers = question.allAnswer.map(answer => {

                  return answer.id === aID 
                      ? {...answer, isHeld: !answer.isHeld}
                      : {...answer, isHeld: false};
              });
              
              return {...question, allAnswer: newAnswers};
          }
      });
  });
}
function checkAnswers() {
  setIsShowAnswers(true);
}

let score = 0;

if(isShowAnswers){
  allAnswers.map((question) => {
      return question.allAnswer.forEach(answer => {

          return answer.isHeld && answer.isCorrect ? score++ : score;
      });
  });
 
}


function reset() {
  setIsShowAnswers(false);
  setResetQuiz(prev => prev + 1);  
}

const quizElements = allAnswers.map((question, index) => (
  <Quiz
      question={question.question}
      allAnswers = {question.allAnswer}
      key = {nanoid()}
      qID = {question.id}
      questionIndex = {index}
      onToggle={updateHeld}
      isShowAnswers = {isShowAnswers}
  />
))
let btnElement = !isShowAnswers 
        ? 
        
            <button className='main-btn check' onClick={checkAnswers}>Check Answers</button>
        
        :
        <div className='score-data'>
            <h4 className='text'>{`You scored ${score}/5 answers`}</h4>
            <button className='main-btn check' onClick={reset}>Play Again</button>
        </div>
  return (
    <div className="App">
      <div className="blob1"></div>
    {startQuiz === false && <Intro onToggle={handleClick}
       />}  
     {startQuiz  && quizElements} 
     {startQuiz  && btnElement}
     {score === 5 && <Confetti />}
      <div className="blob2"></div>
    </div>
  );
}

export default App;
