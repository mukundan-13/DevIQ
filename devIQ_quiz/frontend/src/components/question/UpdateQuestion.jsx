import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getQuestionById, updateQuestion } from "../../../utils/QuizService";
import "./UpdateQuestion.css"; 

const UpdateQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState([""]);
  const [correctAnswers, setCorrectAnswers] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const data = await getQuestionById(id);
      if (data) {
        setQuestion(data.question);
        setChoices(data.choices);
        setCorrectAnswers(data.correctAnswers.join(", "));
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedQuestion = {
        question,
        choices,
        correctAnswers: correctAnswers.split(",").map((answer) => answer.trim()),
      };
      await updateQuestion(id, updatedQuestion);
      navigate("/all-quizzes");
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <p className="loading-text">Loading...</p>;
  }

  return (
    <div className="update-container">
      <h2 className="update-title">Update Question</h2>
      <form onSubmit={handleUpdate} className="update-form">
        <div className="form-group">
          <label>Question:</label>
          <textarea
            className="form-input"
            rows={4}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label>Choices:</label>
          {choices.map((choice, index) => (
            <input
              key={index}
              type="text"
              className="form-input choice-input"
              value={choice}
              onChange={(e) => {
                const updatedChoices = [...choices];
                updatedChoices[index] = e.target.value;
                setChoices(updatedChoices);
              }}
            />
          ))}
        </div>

        <div className="form-group">
          <label>Correct Answer</label>
          <input
            type="text"
            className="form-input"
            value={correctAnswers}
            onChange={(e) => setCorrectAnswers(e.target.value)}
          />
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-update">Update Question</button>
          <Link to="/all-quizzes" className="btn btn-back">Back</Link>
        </div>
      </form>
    </div>
  );
};

export default UpdateQuestion;
