import React from 'react';
import { TrendingUp, Users, BookOpen, Clock } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const AnalyticsPanel: React.FC = () => {
  const { analytics, examAttempts } = useData();

  const chartData = [
    { day: 'Mon', attempts: 45 },
    { day: 'Tue', attempts: 52 },
    { day: 'Wed', attempts: 38 },
    { day: 'Thu', attempts: 61 },
    { day: 'Fri', attempts: 55 },
    { day: 'Sat', attempts: 43 },
    { day: 'Sun', attempts: 39 }
  ];

  const maxAttempts = Math.max(...chartData.map(d => d.attempts));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analytics Overview</h2>
        <p className="text-gray-600 mt-1">Detailed insights into platform performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">87.3%</p>
              <p className="text-sm text-gray-600">Average Score</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">12.5</p>
              <p className="text-sm text-gray-600">Avg. Minutes/Exam</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">78%</p>
              <p className="text-sm text-gray-600">Completion Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Exam Attempts</h3>
        <div className="flex items-end space-x-2 h-64">
          {chartData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-gray-100 rounded-t">
                <div 
                  className="bg-blue-600 rounded-t transition-all duration-500"
                  style={{ height: `${(data.attempts / maxAttempts) * 200}px` }}
                />
              </div>
              <div className="mt-2 text-center">
                <p className="text-sm font-medium text-gray-900">{data.attempts}</p>
                <p className="text-xs text-gray-500">{data.day}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Popular Exams</h3>
          <div className="space-y-4">
            {[
              { name: 'Data Structures Fundamentals', attempts: 145, category: 'Computer Science' },
              { name: 'Advanced Algorithms', attempts: 98, category: 'Computer Science' },
              { name: 'Clinical Medicine Basics', attempts: 87, category: 'Medicine' },
              { name: 'Circuit Analysis', attempts: 76, category: 'Electrical Engineering' }
            ].map((exam, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{exam.name}</p>
                  <p className="text-sm text-gray-500">{exam.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{exam.attempts}</p>
                  <p className="text-sm text-gray-500">attempts</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Revenue</span>
              <span className="text-2xl font-bold text-green-600">12,450 ETB</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Paid Exams Sold</span>
              <span className="font-medium text-gray-900">83</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Price</span>
              <span className="font-medium text-gray-900">150 ETB</span>
            </div>
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">This Month</span>
                <span className="text-lg font-bold text-blue-600">+23%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};