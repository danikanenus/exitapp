import React from 'react';
import { ArrowLeft, BookOpen, Zap, Clock, Target, Lock } from 'lucide-react';
import { Exam, StudyMode } from '../../types';

interface StudyModeSelectorProps {
  exam: Exam;
  onBack: () => void;
  onModeSelect: (mode: StudyMode) => void;
}

export const StudyModeSelector: React.FC<StudyModeSelectorProps> = ({ exam, onBack, onModeSelect }) => {
  const studyModes = [
    {
      id: 'full' as StudyMode,
      title: 'Full Test Mode',
      description: 'Complete the entire exam, then review results and explanations',
      icon: BookOpen,
      features: [
        'Answer all questions first',
        'Timed exam experience',
        'Comprehensive results at the end',
        'Review correct answers and explanations'
      ],
      color: 'blue'
    },
    {
      id: 'guided' as StudyMode,
      title: 'Guided Practice Mode',
      description: 'Get immediate feedback and explanations after each question',
      icon: Zap,
      features: [
        'Instant feedback per question',
        'Learn as you progress',
        'Detailed explanations immediately',
        'Self-paced learning experience'
      ],
      color: 'green'
    }
  ];

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

      {/* Exam Info */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{exam.title}</h1>
            <p className="text-gray-600 mb-4">{exam.description}</p>
            
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <BookOpen className="w-4 h-4" />
                <span>{exam.questions.length} questions</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>~{Math.ceil(exam.questions.length * 1.5)} minutes</span>
              </div>
              <div className="flex items-center space-x-1">
                <Target className="w-4 h-4" />
                <span>Multiple choice</span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
              exam.isPaid 
                ? 'bg-orange-100 text-orange-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {exam.isPaid ? <Lock className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
              <span>{exam.isPaid ? `${exam.price} ETB` : 'Free'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Study Mode Selection */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Study Mode</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {studyModes.map((mode) => (
            <div
              key={mode.id}
              onClick={() => onModeSelect(mode.id)}
              className={`bg-white p-6 rounded-xl shadow-sm border-2 hover:shadow-md transition-all cursor-pointer ${
                mode.color === 'blue' 
                  ? 'border-blue-200 hover:border-blue-300' 
                  : 'border-green-200 hover:border-green-300'
              }`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 rounded-lg ${
                  mode.color === 'blue' ? 'bg-blue-100' : 'bg-green-100'
                }`}>
                  <mode.icon className={`w-6 h-6 ${
                    mode.color === 'blue' ? 'text-blue-600' : 'text-green-600'
                  }`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{mode.title}</h3>
                  <p className="text-gray-600 text-sm">{mode.description}</p>
                </div>
              </div>

              <ul className="space-y-2">
                {mode.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                    <div className={`w-2 h-2 rounded-full ${
                      mode.color === 'blue' ? 'bg-blue-600' : 'bg-green-600'
                    }`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <button className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  mode.color === 'blue'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}>
                  Start {mode.title}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Target className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">Study Tips</h4>
            <p className="text-blue-800 text-sm mt-1">
              Choose <strong>Full Test Mode</strong> to simulate real exam conditions, or 
              <strong> Guided Practice Mode</strong> for interactive learning with immediate feedback. 
              Both modes provide detailed explanations to help you understand the concepts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};