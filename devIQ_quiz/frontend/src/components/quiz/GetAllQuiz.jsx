import React, { useEffect, useState } from "react";
import { deleteQuestion, getAllQuestions } from "../../../utils/QuizService";
import { Link } from "react-router-dom";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import "./GetAllQuiz.css"; 

const GetAllQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteSuccess, setDeleteSuccess] = useState("");

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const data = await getAllQuestions();
      setQuestions(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await deleteQuestion(id);
      setQuestions(questions.filter((question) => question.id !== id));
      setDeleteSuccess("Question deleted successfully.");
      setTimeout(() => setDeleteSuccess(""), 4000);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <p className="loading-text">Loading...</p>;
  }

  return (
    <section className="quiz-container">
      <div className="quiz-header">
        <h2>All Quiz Questions</h2>
        <Link to="/create-quiz" className="add-question-btn">
          <FaPlus /> Add Question
        </Link>
      </div>

      {deleteSuccess && <div className="alert">{deleteSuccess}</div>}

      {questions.map((question, index) => (
        <div key={question.id} className="quiz-card">
          <h4 className="quiz-question">{`${index + 1}. ${question.question}`}</h4>
          <ul className="quiz-choices">
            {question.choices.map((choice, i) => (
              <li key={i} className="quiz-choice">{choice}</li>
            ))}
          </ul>
          <p className="correct-answer">
            <strong>Correct Answer:</strong> {question.correctAnswers}
          </p>
          <div className="quiz-actions">
            <Link to={`/update-quiz/${question.id}`} className="edit-btn">
              <FaEdit /> Edit
            </Link>
            <button onClick={() => handleDeleteQuestion(question.id)} className="delete-btn">
              <FaTrash /> Delete
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default GetAllQuiz;
