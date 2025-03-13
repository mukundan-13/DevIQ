import React from "react";
import { useLocation } from "react-router-dom";
import "./QuizResult.css"; 
const QuizResult = () => {
  const location = useLocation();
  const { quizQuestions = [], totalScores = 0 } = location.state || {};

  const numQuestions = quizQuestions.length;
  const percentage = numQuestions > 0 ? Math.round((totalScores / numQuestions) * 100) : 0;

  return (
    <section className="quiz-result-container">
      <div className="result-card">
        <h3 className="result-title">🎉 Quiz Completed! 🎉</h3>
        <p className="result-text">
          You got <span className="highlight">{totalScores}</span> out of <span className="highlight">{numQuestions}</span> correct!
        </p>
        <div className="score-circle">
          <span className="score">{percentage}%</span>
        </div>
        <p className="result-score">Final Score: <span className="highlight">{totalScores} points</span></p>
      </div>
    </section>
  );
};

export default QuizResult;
