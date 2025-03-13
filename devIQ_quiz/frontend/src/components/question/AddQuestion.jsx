import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createQuestion, getSubjects } from "../../../utils/QuizService";
import "./AddQuestion.css";
const AddQuestion = () => {
  const [question, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("single");
  const [choices, setChoices] = useState([""]);
  const [correctAnswers, setCorrectAnswers] = useState([""]);
  const [subject, setSubject] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [subjectOptions, setSubjectOptions] = useState([""]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const subjectsData = await getSubjects();
      setSubjectOptions(subjectsData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddChoice = () => {
    setChoices([...choices, ""]);
  };

  const handleRemoveChoice = (index) => {
    setChoices(choices.filter((_, i) => i !== index));
  };

  const handleChoiceChange = (index, value) => {
    setChoices(choices.map((choice, i) => (i === index ? value : choice)));
  };

  const handleCorrectAnswerChange = (index, value) => {
    setCorrectAnswers(correctAnswers.map((answer, i) => (i === index ? value : answer)));
  };

  const handleAddCorrectAnswer = () => {
    setCorrectAnswers([...correctAnswers, ""]);
  };

  const handleRemoveCorrectAnswer = (index) => {
    setCorrectAnswers(correctAnswers.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = {
        question,
        questionType,
        choices,
        correctAnswers,
        subject
      };

      await createQuestion(result);

      setQuestionText("");
      setQuestionType("single");
      setChoices([""]);
      setCorrectAnswers([""]);
      setSubject("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddSubject = () => {
    if (newSubject.trim()) {
      setSubject(newSubject.trim());
      setSubjectOptions([...subjectOptions, newSubject.trim()]);
      setNewSubject("");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header">
              <h5 className="card-title mb-0">Add New Question</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Select a Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="form-select">
                    <option value="">Select Subject</option>
                    <option value="New">Add New</option>
                    {subjectOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                {subject === "New" && (
                  <div className="mb-3">
                    <label className="form-label">Add New Subject</label>
                    <input
                      type="text"
                      value={newSubject}
                      onChange={(event) => setNewSubject(event.target.value)}
                      className="form-control"
                    />
                    <button
                      type="button"
                      onClick={handleAddSubject}
                      className="btn btn-outline-secondary mt-2">
                      Add Subject
                    </button>
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">Question</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    value={question}
                    onChange={(e) => setQuestionText(e.target.value)}
                  ></textarea>
                </div>

                

                <div className="mb-3">
                  <label className="form-label">Choices</label>
                  {choices.map((choice, index) => (
                    <div key={index} className="input-group mb-3">
                      <input
                        type="text"
                        value={choice}
                        onChange={(e) => handleChoiceChange(index, e.target.value)}
                        className="form-control"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveChoice(index)}
                        className="btn btn-outline-danger">
                        Remove
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={handleAddChoice} className="btn btn-outline-secondary">
                    Add Choice
                  </button>
                </div>

                {questionType === "multiple" && (
                  <div className="mb-3">
                    <label className="form-label">Correct Answer</label>
                    {correctAnswers.map((answer, index) => (
                      <div key={index} className="d-flex mb-2">
                        <input
                          type="text"
                          className="form-control me-2"
                          value={answer}
                          onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleRemoveCorrectAnswer(index)}>
                          Remove
                        </button>
                      </div>
                    ))}
                    <button type="button" className="btn btn-outline-secondary" onClick={handleAddCorrectAnswer}>
                      Add Correct Answer
                    </button>
                  </div>
                )}

                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-success">Save Question</button>
                  <Link to="/all-quizzes" className="btn btn-outline-secondary">Back to Questions</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;