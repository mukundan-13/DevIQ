import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSubjects } from "../../../utils/QuizService";
import "./Progress.css";
const QuizStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();
  const defaultNumQuestions = 10;

  useEffect(() => {
    fetchSubjectData();
  }, []);

  const fetchSubjectData = async () => {
    try {
      const subjectsData = await getSubjects();
      setSubjects(subjectsData);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const handleNext = () => {
    if (currentStep === 2) {
      if (selectedSubject) {
        navigate("/take-quiz", {
          state: { selectedNumQuestions: defaultNumQuestions, selectedSubject },
        });
      } else {
        alert("Please select a subject.");
      }
    } else {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  return (
    <div className="quiz-stepper">
      <div className="stepper-header">
        <h2>Get Ready for Your Quiz!</h2>
      </div>
      <div className="stepper-content">
        {currentStep === 1 && (
          <div className="step step-one">
            <label>Select Subject:</label>
            <select value={selectedSubject} onChange={handleSubjectChange}>
              <option value="">Choose a subject</option>
              {subjects.map((subject, index) => (
                <option key={index} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        )}
        {currentStep === 2 && (
          <div className="step step-two">
            <h3>Confirmation</h3>
            <p><strong>Subject:</strong> {selectedSubject}</p>
            <p><strong>Questions:</strong> {defaultNumQuestions}</p>
          </div>
        )}
      </div>
      <div className="stepper-footer">
        {currentStep > 1 && <button onClick={handlePrevious}>Back</button>}
        <button onClick={handleNext}>{currentStep === 2 ? "Start Quiz" : "Next"}</button>
      </div>
    </div>
  );
};

export default QuizStepper;