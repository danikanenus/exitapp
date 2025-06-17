import React, { useState } from 'react';
import { ArrowLeft, Search, ChevronRight, Lock, BookOpen, Clock, GraduationCap, School, Building } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface BrowseExamsProps {
  onBack: () => void;
  onSelectExam: (examId: string) => void;
}

export const BrowseExams: React.FC<BrowseExamsProps> = ({ onBack, onSelectExam }) => {
  const { socialNaturals, getSchoolsBySocialNatural, getDepartmentsBySchool, getExamsByDepartment } = useData();
  const [selectedSocialNatural, setSelectedSocialNatural] = useState<string>('');
  const [selectedSchool, setSelectedSchool] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const schools = selectedSocialNatural ? getSchoolsBySocialNatural(selectedSocialNatural) : [];
  const departments = selectedSchool ? getDepartmentsBySchool(selectedSchool) : [];
  const exams = selectedDepartment ? getExamsByDepartment(selectedDepartment) : [];

  const filteredExams = exams.filter(exam =>
    exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetSelections = (level: 'socialNatural' | 'school' | 'department') => {
    if (level === 'socialNatural') {
      setSelectedSocialNatural('');
      setSelectedSchool('');
      setSelectedDepartment('');
    } else if (level === 'school') {
      setSelectedSchool('');
      setSelectedDepartment('');
    } else if (level === 'department') {
      setSelectedDepartment('');
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors self-start"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
        <div className="hidden sm:block h-6 border-l border-gray-300" />
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Browse Exams</h1>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Search exams..."
        />
      </div>

      {/* Breadcrumb Navigation */}
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <button
          onClick={() => resetSelections('socialNatural')}
          className={`px-3 py-2 rounded-lg transition-colors ${
            !selectedSocialNatural ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Categories
        </button>
        {selectedSocialNatural && (
          <>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <button
              onClick={() => resetSelections('school')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                !selectedSchool ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Schools
            </button>
          </>
        )}
        {selectedSchool && (
          <>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <button
              onClick={() => resetSelections('department')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                !selectedDepartment ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Departments
            </button>
          </>
        )}
        {selectedDepartment && (
          <>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg">Exams</span>
          </>
        )}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Social/Natural Categories */}
        {!selectedSocialNatural && socialNaturals.map((socialNatural) => (
          <div
            key={socialNatural.id}
            onClick={() => setSelectedSocialNatural(socialNatural.id)}
            className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 break-words">{socialNatural.name}</h3>
            <p className="text-gray-600 text-sm mb-3 break-words">{socialNatural.description}</p>
            <p className="text-sm text-purple-600 font-medium">
              {getSchoolsBySocialNatural(socialNatural.id).length} schools
            </p>
          </div>
        ))}

        {/* Schools */}
        {selectedSocialNatural && !selectedSchool && schools.map((school) => (
          <div
            key={school.id}
            onClick={() => setSelectedSchool(school.id)}
            className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <School className="w-6 h-6 text-blue-600" />
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 break-words">{school.name}</h3>
            <p className="text-gray-600 text-sm mb-3 break-words">{school.description}</p>
            <p className="text-sm text-blue-600 font-medium">
              {getDepartmentsBySchool(school.id).length} departments
            </p>
          </div>
        ))}

        {/* Departments */}
        {selectedSchool && !selectedDepartment && departments.map((department) => (
          <div
            key={department.id}
            onClick={() => setSelectedDepartment(department.id)}
            className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Building className="w-6 h-6 text-green-600" />
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 break-words">{department.name}</h3>
            <p className="text-gray-600 text-sm mb-3 break-words">{department.description}</p>
            <p className="text-sm text-green-600 font-medium">
              {getExamsByDepartment(department.id).length} exams
            </p>
          </div>
        ))}

        {/* Exams */}
        {selectedDepartment && filteredExams.map((exam) => (
          <div
            key={exam.id}
            onClick={() => onSelectExam(exam.id)}
            className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${exam.isPaid ? 'bg-orange-100' : 'bg-green-100'}`}>
                {exam.isPaid ? (
                  <Lock className="w-6 h-6 text-orange-600" />
                ) : (
                  <BookOpen className="w-6 h-6 text-green-600" />
                )}
              </div>
              <div className="flex items-center space-x-2">
                {exam.isPaid && (
                  <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">
                    {exam.price} ETB
                  </span>
                )}
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2 break-words">{exam.title}</h3>
            <p className="text-gray-600 text-sm mb-4 break-words">{exam.description}</p>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center space-x-1 text-gray-500">
                  <BookOpen className="w-4 h-4" />
                  <span>{exam.questions.length} questions</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>~{Math.ceil(exam.questions.length * 1.5)} min</span>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium self-start ${
                exam.isPaid 
                  ? 'bg-orange-100 text-orange-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {exam.isPaid ? 'Paid' : 'Free'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {selectedDepartment && filteredExams.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No exams found</h3>
          <p className="text-gray-500">
            {searchTerm ? 'Try adjusting your search terms' : 'No exams available for this department yet'}
          </p>
        </div>
      )}
    </div>
  );
};