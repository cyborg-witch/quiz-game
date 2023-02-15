import React from "react"

export default function Intro(props) {
    return (
        
        <div className="intro-container">
           
            <h1>Quizical</h1>
            <p>Answer general geographic knowledge questions</p>
            <button className="main-btn" onClick={props.onToggle}>Start quiz</button>
           
        </div>
        
    )

}