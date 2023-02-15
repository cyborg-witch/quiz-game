import React from "react"
import { nanoid } from 'nanoid';

export default function Quiz(props) {
  const answerButtonsJSX = props.allAnswers.map((answer, index) => {

    //Held Button Styles
    let styles = {
        backgroundColor: answer.isHeld ? '#D6DBF5'  : 'transparent',
    };
    
    if(props.isShowAnswers) {
        
        if(answer.isHeld && answer.isCorrect){
            styles = { backgroundColor: '#94D7A2', color: '#293264' };

        } else if (answer.isHeld && answer.isCorrect === false) {
            styles = { backgroundColor: '#F8BCBC', opacity: '50%', border: 'none', color: '#293264' };

        } else if (answer.isCorrect) {
            styles = { backgroundColor: '#94D7A2', color: '#293264' };

        } else if (answer.isCorrect === false) {
            styles = { opacity: '50%' };
        }
    }

    return (
        <button key = {nanoid()} 
            onClick={() => props.onToggle(props.qID, answer.id)}
            className = 'answer'
            style = {styles}
            data-testid = {`button${index}`}
        >
            {props.allAnswers[index].value}
        </button>
    );
});

  
  


    return (
      <div className="q-container"> 
          <h3>{props.question}</h3>
          <div className="question-pull">
          {answerButtonsJSX}
          </div>
          <hr></hr>
      </div>
    )
}