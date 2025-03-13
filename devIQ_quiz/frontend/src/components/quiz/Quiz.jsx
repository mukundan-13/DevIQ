import React, { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { fetchQuizForUser } from "../../../utils/QuizService"
import AnswerOptions from "../../../utils/AnswerOptions"
import "./Quiz.css" 

const Quiz = () => {
	const [quizQuestions, setQuizQuestions] = useState([
		{ id: "", correctAnswers: "", question: "", questionType: "" }
	])
	const [selectedAnswers, setSelectedAnswers] = useState([{ id: "", answer: "" }])
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
	const [totalScores, setTotalScores] = useState(0)
	const location = useLocation()
	const navigate = useNavigate()
	const { selectedSubject, selectedNumQuestions } = location.state

	useEffect(() => {
		fetchQuizData()
	}, [])
	const [answeredQuestions, setAnsweredQuestions] = useState({})

const handleAnswerSelection = (questionId, answer) => {
    if (answeredQuestions[questionId]) return 

    const correctAnswer = quizQuestions.find(q => q.id === questionId)?.correctAnswers;
    const isCorrect = correctAnswer.includes(answer);

    setAnsweredQuestions(prev => ({
        ...prev,
        [questionId]: { selected: answer, correct: correctAnswer, isCorrect }
    }));
}

	const fetchQuizData = async () => {
		if (selectedNumQuestions && selectedSubject) {
			const questions = await fetchQuizForUser(selectedNumQuestions, selectedSubject)
			setQuizQuestions(questions)
		}
	}

	const handleAnswerChange = (questionId, answer) => {
		setSelectedAnswers((prevAnswers) => {
			const existingAnswerIndex = prevAnswers.findIndex((answerObj) => answerObj.id === questionId)
			const selectedAnswer = Array.isArray(answer)
				? answer.map((a) => a.charAt(0))
				: answer.charAt(0)

			if (existingAnswerIndex !== -1) {
				const updatedAnswers = [...prevAnswers]
				updatedAnswers[existingAnswerIndex] = { id: questionId, answer: selectedAnswer }
				return updatedAnswers
			} else {
				const newAnswer = { id: questionId, answer: selectedAnswer }
				return [...prevAnswers, newAnswer]
			}
		})
	}

	const isChecked = (questionId, choice) => {
		const selectedAnswer = selectedAnswers.find((answer) => answer.id === questionId)
		if (!selectedAnswer) {
			return false
		}
		if (Array.isArray(selectedAnswer.answer)) {
			return selectedAnswer.answer.includes(choice.charAt(0))
		}
		return selectedAnswer.answer === choice.charAt(0)
	}

	const handleCheckboxChange = (questionId, choice) => {
		setSelectedAnswers((prevAnswers) => {
			const existingAnswerIndex = prevAnswers.findIndex((answerObj) => answerObj.id === questionId)
			const selectedAnswer = Array.isArray(choice)
				? choice.map((c) => c.charAt(0))
				: choice.charAt(0)

			if (existingAnswerIndex !== -1) {
				const updatedAnswers = [...prevAnswers]
				const existingAnswer = updatedAnswers[existingAnswerIndex].answer
				let newAnswer
				if (Array.isArray(existingAnswer)) {
					newAnswer = existingAnswer.includes(selectedAnswer)
						? existingAnswer.filter((a) => a !== selectedAnswer)
						: [...existingAnswer, selectedAnswer]
				} else {
					newAnswer = [existingAnswer, selectedAnswer]
				}
				updatedAnswers[existingAnswerIndex] = { id: questionId, answer: newAnswer }
				return updatedAnswers
			} else {
				const newAnswer = { id: questionId, answer: [selectedAnswer] }
				return [...prevAnswers, newAnswer]
			}
		})
	}

	const handleSubmit = () => {
		let scores = 0
		quizQuestions.forEach((question) => {
			const selectedAnswer = selectedAnswers.find((answer) => answer.id === question.id)
			if (selectedAnswer) {
				const selectedOptions = Array.isArray(selectedAnswer.answer)
					? selectedAnswer.answer.map((option) => option.charAt(0))
					: [selectedAnswer.answer.charAt(0)]
				const correctOptions = Array.isArray(question.correctAnswers)
					? question.correctAnswers.map((option) => option.charAt(0))
					: [question.correctAnswers.charAt(0)]
				const isCorrect = selectedOptions.length === correctOptions.length && selectedOptions.every((option) => correctOptions.includes(option))
				if (isCorrect) {
					scores++
				}
			}
		})
		setTotalScores(scores)
		setSelectedAnswers([])
		setCurrentQuestionIndex(0)
		navigate("/quiz-result", { state: { quizQuestions, totalScores: scores } })
	}

	const handleNextQuestion = () => {
		if (currentQuestionIndex < quizQuestions.length - 1) {
			setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
		} else {
			handleSubmit()
		}
	}

	const handlePreviousQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex((prevIndex) => prevIndex - 1)
		}
	}

	return (
		<div className="quiz-container">
			<h3 className="quiz-header">
				Question {quizQuestions.length > 0 ? currentQuestionIndex + 1 : 0} of {quizQuestions.length}
			</h3>

			<div className="quiz-card">
				<h4 className="quiz-question">{quizQuestions[currentQuestionIndex]?.question}</h4>

				<AnswerOptions
					question={quizQuestions[currentQuestionIndex]}
					isChecked={isChecked}
					handleAnswerChange={handleAnswerChange}
					handleCheckboxChange={handleCheckboxChange}
				/>

				<div className="quiz-buttons">
					<button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0} className="quiz-btn prev">
						Previous
					</button>
					<button
						onClick={handleNextQuestion}
						disabled={!selectedAnswers.find((answer) => answer.id === quizQuestions[currentQuestionIndex]?.id)}
						className="quiz-btn next"
					>
						{currentQuestionIndex === quizQuestions.length - 1 ? "Submit" : "Next"}
					</button>
				</div>
			</div>
		</div>
	)
}

export default Quiz
