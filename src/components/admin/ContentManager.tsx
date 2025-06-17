import React, { useState } from 'react';
import { Plus, Edit, Trash2, School, Building, BookOpen, GraduationCap } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const ContentManager: React.FC = () => {
  const { socialNaturals, schools, departments, exams, getSchoolsBySocialNatural, getDepartmentsBySchool, getExamsByDepartment } = useData();
  const [activeSection, setActiveSection] = useState<'socialNaturals' | 'schools' | 'departments' | 'exams'>('socialNaturals');

  const sections = [
    { id: 'socialNaturals', label: 'Social/Natural', icon: GraduationCap, data: socialNaturals },
    { id: 'schools', label: 'Schools', icon: School, data: schools },
    { id: 'departments', label: 'Departments', icon: Building, data: departments },
    { id: 'exams', label: 'Exams', icon: BookOpen, data: exams }
  ];

  const renderSocialNaturals = () => (
    <div className="space-y-4">
      {socialNaturals.map((socialNatural) => (
        <div key={socialNatural.id} className="bg-white p-4 sm:p-6 rounded-lg border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold text-gray-900 break-words">{socialNatural.name}</h3>
              <p className="text-gray-600 text-sm sm:text-base break-words">{socialNatural.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                {getSchoolsBySocialNatural(socialNatural.id).length} schools
              </p>
            </div>
            <div className="flex space-x-2 flex-shrink-0">
              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                <Edit className="w-4 h-4" />
              </button>
              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSchools = () => (
    <div className="space-y-4">
      {schools.map((school) => {
        const socialNatural = socialNaturals.find(s => s.id === school.socialNaturalId);
        return (
          <div key={school.id} className="bg-white p-4 sm:p-6 rounded-lg border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 break-words">{school.name}</h3>
                <p className="text-gray-600 text-sm sm:text-base break-words">{school.description}</p>
                <p className="text-sm text-gray-500 mt-1">Category: {socialNatural?.name}</p>
                <p className="text-sm text-gray-500">
                  {getDepartmentsBySchool(school.id).length} departments
                </p>
              </div>
              <div className="flex space-x-2 flex-shrink-0">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderDepartments = () => (
    <div className="space-y-4">
      {departments.map((department) => {
        const school = schools.find(s => s.id === department.schoolId);
        const socialNatural = socialNaturals.find(s => s.id === school?.socialNaturalId);
        return (
          <div key={department.id} className="bg-white p-4 sm:p-6 rounded-lg border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 break-words">{department.name}</h3>
                <p className="text-gray-600 text-sm sm:text-base break-words">{department.description}</p>
                <p className="text-sm text-gray-500 mt-1 break-words">
                  {socialNatural?.name} → {school?.name}
                </p>
                <p className="text-sm text-gray-500">
                  {getExamsByDepartment(department.id).length} exams
                </p>
              </div>
              <div className="flex space-x-2 flex-shrink-0">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderExams = () => (
    <div className="space-y-4">
      {exams.map((exam) => {
        const department = departments.find(d => d.id === exam.departmentId);
        const school = schools.find(s => s.id === department?.schoolId);
        const socialNatural = socialNaturals.find(s => s.id === school?.socialNaturalId);
        
        return (
          <div key={exam.id} className="bg-white p-4 sm:p-6 rounded-lg border">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 break-words">{exam.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base break-words">{exam.description}</p>
                <p className="text-sm text-gray-500 mt-1 break-words">
                  {socialNatural?.name} → {school?.name} → {department?.name}
                </p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    exam.isPaid ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {exam.isPaid ? `Paid (${exam.price} ETB)` : 'Free'}
                  </span>
                  <span className="text-sm text-gray-500">
                    {exam.questions.length} questions
                  </span>
                </div>
              </div>
              <div className="flex space-x-2 flex-shrink-0">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Content Management</h2>
        <button className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto">
          <Plus className="w-5 h-5" />
          <span>Add New</span>
        </button>
      </div>

      {/* Section Tabs */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <nav className="-mb-px flex space-x-4 sm:space-x-8 min-w-max">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as any)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeSection === section.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <section.icon className="w-5 h-5" />
              <span className="hidden sm:inline">{section.label}</span>
              <span className="sm:hidden">{section.label.split('/')[0] || section.label.split(' ')[0]}</span>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                {section.data.length}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div>
        {activeSection === 'socialNaturals' && renderSocialNaturals()}
        {activeSection === 'schools' && renderSchools()}
        {activeSection === 'departments' && renderDepartments()}
        {activeSection === 'exams' && renderExams()}
      </div>
    </div>
  );
};