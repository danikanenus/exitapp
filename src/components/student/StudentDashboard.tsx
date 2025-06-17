import React, { useState } from 'react';
import { BookOpen, Clock, Trophy, Search, ChevronRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { BrowseExams } from './BrowseExams';
import { ExamInterface } from './ExamInterface';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { examAttempts, analytics } = useData();
  const [currentView, setCurrentView] = useState<'dashboard' | 'browse' | 'exam'>('dashboard');
  const [selectedExamId, setSelectedExamId] = useState<string>('');

  const userAttempts = examAttempts.filter(attempt => attempt.userId === user?.id);
  const averageScore = userAttempts.length > 0 
    ? userAttempts.reduce((sum, attempt) => sum + attempt.score, 0) / userAttempts.length 
    : 0;

  const stats = [
    {
      label: 'Exams Completed',
      value: userAttempts.length,
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    {
      label: 'Average Score',
      value: `${Math.round(averageScore)}%`,
      icon: Trophy,
      color: 'bg-green-500'
    },
    {
      label: 'Study Hours',
      value: Math.round(userAttempts.length * 0.5), // Rough estimate
      icon: Clock,
      color: 'bg-orange-500'
    }
  ];

  if (currentView === 'browse') {
    return (
      <BrowseExams 
        onBack={() => setCurrentView('dashboard')} 
        onSelectExam={(examId) => {
          setSelectedExamId(examId);
          setCurrentView('exam');
        }}
      />
    );
  }

  if (currentView === 'exam' && selectedExamId) {
    return (
      <ExamInterface 
        examId={selectedExamId}
        onBack={() => setCurrentView('browse')}
      />
    );
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
          <p className="text-gray-600 mt-1">Ready to continue your studies?</p>
        </div>
        <button
          onClick={() => setCurrentView('browse')}
          className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 sm:px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          <Search className="w-5 h-5" />
          <span>Browse Exams</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-2 sm:p-3 rounded-lg text-white`}>
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Exam Results</h3>
          {userAttempts.length > 0 ? (
            <div className="space-y-4">
              {userAttempts.slice(-5).reverse().map((attempt, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 truncate">Exam #{attempt.examId}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(attempt.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className={`font-bold ${
                      attempt.score >= 80 ? 'text-green-600' : 
                      attempt.score >= 60 ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {attempt.score}%
                    </p>
                    <p className="text-sm text-gray-500">{attempt.studyMode} mode</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">No exams completed yet</p>
              <button
                onClick={() => setCurrentView('browse')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Start your first exam
              </button>
            </div>
          )}
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => setCurrentView('browse')}
              className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">Browse All Exams</span>
              </div>
              <ChevronRight className="w-5 h-5 text-blue-600" />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <Trophy className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-900">View Achievements</span>
              </div>
              <ChevronRight className="w-5 h-5 text-green-600" />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-orange-900">Study Schedule</span>
              </div>
              <ChevronRight className="w-5 h-5 text-orange-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Study Progress</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {analytics.popularDepartments.map((dept, index) => {
            const userDeptAttempts = userAttempts.filter(attempt => 
              // This would need proper exam-department mapping in real implementation
              attempt.examId === '1' || attempt.examId === '2'
            ).length;
            
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                </div>
                <h4 className="font-medium text-gray-900 break-words">{dept.name}</h4>
                <p className="text-sm text-gray-500 mt-1">{userDeptAttempts} exams completed</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};