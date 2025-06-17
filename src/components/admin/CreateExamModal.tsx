import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface CreateExamModalProps {
  onClose: () => void;
}

export const CreateExamModal: React.FC<CreateExamModalProps> = ({ onClose }) => {
  const { socialNaturals, getSchoolsBySocialNatural, getDepartmentsBySchool, addExam } = useData();
  const [selectedSocialNatural, setSelectedSocialNatural] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [examData, setExamData] = useState({
    title: '',
    description: '',
    isPaid: false,
    price: 0,
    studyModeEnabled: true
  });
  const [questions, setQuestions] = useState([{
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: ''
  }]);

  const schools = selectedSocialNatural ? getSchoolsBySocialNatural(selectedSocialNatural) : [];
  const departments = selectedSchool ? getDepartmentsBySchool(selectedSchool) : [];

  const addQuestion = () => {
    setQuestions([...questions, {
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    }]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const updated = [...questions];
    if (field === 'options') {
      updated[index].options = value;
    } else {
      (updated[index] as any)[field] = value;
    }
    setQuestions(updated);
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const updated = [...questions];
    updated[questionIndex].options[optionIndex] = value;
    setQuestions(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDepartment) return;

    const formattedQuestions = questions.map((q, index) => ({
      ...q,
      order: index + 1,
      id: '',
      examId: '',
      createdAt: ''
    }));

    addExam({
      ...examData,
      departmentId: selectedDepartment,
      questions: formattedQuestions
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Create New Exam</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
          {/* Exam Location */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedSocialNatural}
                onChange={(e) => {
                  setSelectedSocialNatural(e.target.value);
                  setSelectedSchool('');
                  setSelectedDepartment('');
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Category</option>
                {socialNaturals.map(socialNatural => (
                  <option key={socialNatural.id} value={socialNatural.id}>{socialNatural.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">School</label>
              <select
                value={selectedSchool}
                onChange={(e) => {
                  setSelectedSchool(e.target.value);
                  setSelectedDepartment('');
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
                disabled={!selectedSocialNatural}
              >
                <option value="">Select School</option>
                {schools.map(school => (
                  <option key={school.id} value={school.id}>{school.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
                disabled={!selectedSchool}
              >
                <option value="">Select Department</option>
                {departments.map(department => (
                  <option key={department.id} value={department.id}>{department.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Exam Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Exam Title</label>
              <input
                type="text"
                value={examData.title}
                onChange={(e) => setExamData({...examData, title: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={examData.isPaid}
                  onChange={(e) => setExamData({...examData, isPaid: e.target.checked})}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm font-medium text-gray-700">Paid Exam</span>
              </label>
              {examData.isPaid && (
                <div>
                  <input
                    type="number"
                    value={examData.price}
                    onChange={(e) => setExamData({...examData, price: Number(e.target.value)})}
                    className="w-24 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Price (ETB)"
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={examData.description}
              onChange={(e) => setExamData({...examData, description: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-24"
              required
            />
          </div>

          {/* Questions */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
              <h3 className="text-lg font-semibold text-gray-900">Questions</h3>
              <button
                type="button"
                onClick={addQuestion}
                className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add Question</span>
              </button>
            </div>

            <div className="space-y-6">
              {questions.map((question, qIndex) => (
                <div key={qIndex} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900">Question {qIndex + 1}</h4>
                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(qIndex)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Question Text</label>
                      <textarea
                        value={question.question}
                        onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows={2}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                      <div className="space-y-2">
                        {question.options.map((option, oIndex) => (
                          <div key={oIndex} className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name={`correct-${qIndex}`}
                              checked={question.correctAnswer === oIndex}
                              onChange={() => updateQuestion(qIndex, 'correctAnswer', oIndex)}
                              className="w-4 h-4 text-blue-600 flex-shrink-0"
                            />
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                              className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              placeholder={`Option ${oIndex + 1}`}
                              required
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Explanation</label>
                      <textarea
                        value={question.explanation}
                        onChange={(e) => updateQuestion(qIndex, 'explanation', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows={2}
                        placeholder="Explain why this is the correct answer..."
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto"
            >
              Create Exam
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};