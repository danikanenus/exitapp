import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { StudyMode } from '../../types';
import { StudyModeSelector } from './StudyModeSelector';
import { PaymentScreen } from './PaymentScreen';

interface ExamInterfaceProps {
  examId: string;
  onBack: () => void;
}

export const ExamInterface: React.FC<ExamInterfaceProps> = ({ examId, onBack }) => {
  const { getExamById, submitExamAttempt } = useData();
  const { user } = useAuth();
  const exam = getExamById(examId);

  const [currentStep, setCurrentStep] = useState<'mode-select' | 'payment' | 'exam' | 'results'>('mode-select');
  const [studyMode, setStudyMode] = useState<StudyMode>('full');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (currentStep === 'exam') {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentStep]);

  if (!exam) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">Exam not found</h2>
        <button onClick={onBack} className="mt-4 text-blue-600 hover:text-blue-700">
          Go back
        </button>
      </div>
    );
  }

  const handleModeSelect = (mode: StudyMode) => {
    setStudyMode(mode);
    if (exam.isPaid) {
      setCurrentStep('payment');
    } else {
      setCurrentStep('exam');
    }
  };

  const handlePaymentComplete = () => {
    setCurrentStep('exam');
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));

    if (studyMode === 'guided') {
      setShowExplanation(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowExplanation(false);
    } else if (studyMode === 'guided') {
      handleCompleteExam();
    }
  };

  const handleCompleteExam = () => {
    const score = calculateScore();
    const attempt = {
      userId: user!.id,
      examId: exam.id,
      answers,
      score,
      completedAt: new Date().toISOString(),
      studyMode
    };

    submitExamAttempt(attempt);
    setCurrentStep('results');
  };

  const calculateScore = () => {
    const correctAnswers = exam.questions.filter(question => 
      answers[question.id] === question.correctAnswer
    ).length;
    return Math.round((correctAnswers / exam.questions.length) * 100);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (currentStep === 'mode-select') {
    return (
      <StudyModeSelector 
        exam={exam}
        onBack={onBack}
        onModeSelect={handleModeSelect}
      />
    );
  }

  if (currentStep === 'payment') {
    return (
      <PaymentScreen 
        exam={exam}
        onBack={() => setCurrentStep('mode-select')}
        onComplete={handlePaymentComplete}
      />
    );
  }

  if (currentStep === 'results') {
    const score = calculateScore();
    const correctAnswers = exam.questions.filter(question => 
      answers[question.id] === question.correctAnswer
    ).length;

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Browse</span>
          </button>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border text-center">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
            score >= 80 ? 'bg-green-100' : score >= 60 ? 'bg-orange-100' : 'bg-red-100'
          }`}>
            {score >= 60 ? (
              <CheckCircle className={`w-10 h-10 ${
                score >= 80 ? 'text-green-600' : 'text-orange-600'
              }`} />
            ) : (
              <XCircle className="w-10 h-10 text-red-600" />
            )}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">Exam Complete!</h2>
          <p className="text-gray-600 mb-6">Here are your results</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{score}%</p>
              <p className="text-gray-600">Final Score</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{correctAnswers}</p>
              <p className="text-gray-600">Correct Answers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">{formatTime(timeElapsed)}</p>
              <p className="text-gray-600">Time Taken</p>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                setCurrentQuestionIndex(0);
                setAnswers({});
                setTimeElapsed(0);
                setCurrentStep('mode-select');
              }}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Try Again</span>
            </button>
            <button
              onClick={onBack}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Browse More Exams
            </button>
          </div>
        </div>

        {/* Review Answers */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Review Your Answers</h3>
          <div className="space-y-6">
            {exam.questions.map((question, index) => {
              const userAnswer = answers[question.id];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCorrect ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-3">
                        {index + 1}. {question.question}
                      </h4>
                      <div className="space-y-2 mb-4">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-2 rounded border ${
                              optionIndex === question.correctAnswer
                                ? 'bg-green-50 border-green-200 text-green-800'
                                : optionIndex === userAnswer && !isCorrect
                                ? 'bg-red-50 border-red-200 text-red-800'
                                : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            {option}
                            {optionIndex === question.correctAnswer && (
                              <span className="ml-2 text-green-600 font-medium">(Correct)</span>
                            )}
                            {optionIndex === userAnswer && !isCorrect && (
                              <span className="ml-2 text-red-600 font-medium">(Your answer)</span>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded p-3">
                        <p className="text-blue-800 text-sm">
                          <strong>Explanation:</strong> {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = exam.questions[currentQuestionIndex];
  const isAnswered = answers[currentQuestion.id] !== undefined;
  const isLastQuestion = currentQuestionIndex === exam.questions.length - 1;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{exam.title}</h1>
            <p className="text-gray-600">{studyMode === 'full' ? 'Full Test Mode' : 'Guided Practice Mode'}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="w-5 h-5" />
            <span>{formatTime(timeElapsed)}</span>
          </div>
          <div className="text-sm text-gray-600">
            {currentQuestionIndex + 1} of {exam.questions.length}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestionIndex + 1) / exam.questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="bg-white p-8 rounded-xl shadow-sm border">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {currentQuestionIndex + 1}. {currentQuestion.question}
        </h2>

        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(currentQuestion.id, index)}
              disabled={studyMode === 'guided' && showExplanation}
              className={`w-full text-left p-4 rounded-lg border transition-colors ${
                answers[currentQuestion.id] === index
                  ? 'bg-blue-50 border-blue-300 text-blue-900'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              } ${studyMode === 'guided' && showExplanation ? 'cursor-not-allowed opacity-60' : ''}`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  answers[currentQuestion.id] === index
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {answers[currentQuestion.id] === index && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Guided Mode Explanation */}
        {studyMode === 'guided' && showExplanation && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-3">
              {answers[currentQuestion.id] === currentQuestion.correctAnswer ? (
                <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600 mt-1" />
              )}
              <div>
                <p className="font-medium text-gray-900 mb-2">
                  {answers[currentQuestion.id] === currentQuestion.correctAnswer 
                    ? 'Correct!' 
                    : `Incorrect. The correct answer is: ${currentQuestion.options[currentQuestion.correctAnswer]}`
                  }
                </p>
                <p className="text-blue-800 text-sm">{currentQuestion.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex space-x-3">
            {studyMode === 'full' && (
              <button
                onClick={handleCompleteExam}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Submit Exam
              </button>
            )}

            {studyMode === 'guided' && showExplanation && (
              <button
                onClick={handleNextQuestion}
                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <span>{isLastQuestion ? 'Complete' : 'Next Question'}</span>
                {!isLastQuestion && <ArrowRight className="w-4 h-4" />}
              </button>
            )}

            {studyMode === 'full' && !isLastQuestion && (
              <button
                onClick={handleNextQuestion}
                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};