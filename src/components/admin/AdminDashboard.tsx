import React, { useState } from 'react';
import { Users, BookOpen, TrendingUp, Activity, Plus, School, Building2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { CreateExamModal } from './CreateExamModal';
import { ContentManager } from './ContentManager';
import { AnalyticsPanel } from './AnalyticsPanel';

export const AdminDashboard: React.FC = () => {
  const { analytics, schools, exams } = useData();
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'analytics'>('overview');
  const [showCreateExam, setShowCreateExam] = useState(false);

  const stats = [
    {
      label: 'Total Users',
      value: analytics.totalUsers,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      label: 'Total Exams',
      value: analytics.totalExams,
      icon: BookOpen,
      color: 'bg-green-500'
    },
    {
      label: 'Schools',
      value: schools.length,
      icon: School,
      color: 'bg-purple-500'
    },
    {
      label: 'Total Attempts',
      value: analytics.totalAttempts,
      icon: Activity,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your exam platform</p>
        </div>
        <button
          onClick={() => setShowCreateExam(true)}
          className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          <Plus className="w-5 h-5" />
          <span>Create Exam</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
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

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <nav className="-mb-px flex space-x-4 sm:space-x-8 min-w-max">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'content', label: 'Content Management', icon: Building2 },
            { id: 'analytics', label: 'Analytics', icon: Activity }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6 lg:mt-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Departments</h3>
              <div className="space-y-4">
                {analytics.popularDepartments.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700 text-sm sm:text-base">{dept.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 sm:w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(dept.attempts / analytics.totalAttempts) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 min-w-[2rem] text-right">{dept.attempts}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {analytics.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-gray-700 text-sm break-words">{activity.description}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && <ContentManager />}
        {activeTab === 'analytics' && <AnalyticsPanel />}
      </div>

      {showCreateExam && (
        <CreateExamModal onClose={() => setShowCreateExam(false)} />
      )}
    </div>
  );
};