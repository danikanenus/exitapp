import React, { createContext, useContext, useState } from 'react';
import { SocialNatural, School, Department, Exam, Question, ExamAttempt, Analytics } from '../types';

interface DataContextType {
  socialNaturals: SocialNatural[];
  schools: School[];
  departments: Department[];
  exams: Exam[];
  examAttempts: ExamAttempt[];
  analytics: Analytics;
  addSocialNatural: (socialNatural: Omit<SocialNatural, 'id' | 'createdAt'>) => void;
  addSchool: (school: Omit<School, 'id' | 'createdAt'>) => void;
  addDepartment: (department: Omit<Department, 'id' | 'createdAt'>) => void;
  addExam: (exam: Omit<Exam, 'id' | 'createdAt' | 'updatedAt'>) => void;
  addQuestion: (examId: string, question: Omit<Question, 'id' | 'examId' | 'createdAt'>) => void;
  submitExamAttempt: (attempt: Omit<ExamAttempt, 'id'>) => void;
  getExamById: (id: string) => Exam | undefined;
  getSchoolsBySocialNatural: (socialNaturalId: string) => School[];
  getDepartmentsBySchool: (schoolId: string) => Department[];
  getExamsByDepartment: (departmentId: string) => Exam[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Demo data
  const [socialNaturals, setSocialNaturals] = useState<SocialNatural[]>([
    {
      id: '1',
      name: 'Natural Sciences',
      description: 'Science, technology, engineering, and mathematics fields',
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      name: 'Social Sciences',
      description: 'Humanities, social studies, and liberal arts',
      createdAt: '2024-01-01T00:00:00Z'
    }
  ]);

  const [schools, setSchools] = useState<School[]>([
    {
      id: '1',
      socialNaturalId: '1',
      name: 'School of Engineering',
      description: 'Engineering disciplines and technology',
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      socialNaturalId: '1',
      name: 'School of Health Sciences',
      description: 'Medical and health-related programs',
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: '3',
      socialNaturalId: '2',
      name: 'School of Business',
      description: 'Business administration and management',
      createdAt: '2024-01-01T00:00:00Z'
    }
  ]);

  const [departments, setDepartments] = useState<Department[]>([
    {
      id: '1',
      schoolId: '1',
      name: 'Computer Science',
      description: 'Software development and computer systems',
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      schoolId: '1',
      name: 'Electrical Engineering',
      description: 'Electrical systems and power engineering',
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: '3',
      schoolId: '2',
      name: 'Medicine',
      description: 'General medicine and clinical practice',
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: '4',
      schoolId: '3',
      name: 'Marketing',
      description: 'Marketing strategies and consumer behavior',
      createdAt: '2024-01-01T00:00:00Z'
    }
  ]);

  const [exams, setExams] = useState<Exam[]>([
    {
      id: '1',
      departmentId: '1',
      title: 'Data Structures Fundamentals',
      description: 'Basic concepts of data structures and their applications',
      isPaid: false,
      price: 0,
      studyModeEnabled: true,
      questions: [
        {
          id: '1',
          examId: '1',
          question: 'What is the time complexity of accessing an element in an array?',
          options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
          correctAnswer: 0,
          explanation: 'Array access is O(1) because elements are stored in contiguous memory locations.',
          order: 1,
          createdAt: '2024-01-01T00:00:00Z'
        },
        {
          id: '2',
          examId: '1',
          question: 'Which data structure follows LIFO principle?',
          options: ['Queue', 'Stack', 'Array', 'Tree'],
          correctAnswer: 1,
          explanation: 'Stack follows Last In First Out (LIFO) principle.',
          order: 2,
          createdAt: '2024-01-01T00:00:00Z'
        }
      ],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      departmentId: '1',
      title: 'Advanced Algorithms',
      description: 'Complex algorithmic concepts and problem solving',
      isPaid: true,
      price: 150,
      studyModeEnabled: true,
      questions: [
        {
          id: '3',
          examId: '2',
          question: 'What is the best case time complexity of Quick Sort?',
          options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'],
          correctAnswer: 0,
          explanation: 'Quick Sort has O(n log n) time complexity in the best and average cases.',
          order: 1,
          createdAt: '2024-01-01T00:00:00Z'
        }
      ],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    }
  ]);

  const [examAttempts, setExamAttempts] = useState<ExamAttempt[]>([]);

  const [analytics] = useState<Analytics>({
    totalUsers: 156,
    totalExams: 25,
    totalAttempts: 342,
    popularDepartments: [
      { name: 'Computer Science', attempts: 145 },
      { name: 'Medicine', attempts: 98 },
      { name: 'Electrical Engineering', attempts: 67 }
    ],
    recentActivity: [
      { type: 'exam_created', description: 'New exam created: Advanced Algorithms', timestamp: '2024-01-15T10:30:00Z' },
      { type: 'user_registered', description: 'New student registered: John Doe', timestamp: '2024-01-15T09:15:00Z' },
      { type: 'exam_completed', description: 'Student completed Data Structures exam', timestamp: '2024-01-15T08:45:00Z' }
    ]
  });

  const addSocialNatural = (socialNatural: Omit<SocialNatural, 'id' | 'createdAt'>) => {
    const newSocialNatural: SocialNatural = {
      ...socialNatural,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setSocialNaturals(prev => [...prev, newSocialNatural]);
  };

  const addSchool = (school: Omit<School, 'id' | 'createdAt'>) => {
    const newSchool: School = {
      ...school,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setSchools(prev => [...prev, newSchool]);
  };

  const addDepartment = (department: Omit<Department, 'id' | 'createdAt'>) => {
    const newDepartment: Department = {
      ...department,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setDepartments(prev => [...prev, newDepartment]);
  };

  const addExam = (exam: Omit<Exam, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newExam: Exam = {
      ...exam,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setExams(prev => [...prev, newExam]);
  };

  const addQuestion = (examId: string, question: Omit<Question, 'id' | 'examId' | 'createdAt'>) => {
    const newQuestion: Question = {
      ...question,
      id: Date.now().toString(),
      examId,
      createdAt: new Date().toISOString()
    };

    setExams(prev => prev.map(exam => 
      exam.id === examId 
        ? { ...exam, questions: [...exam.questions, newQuestion] }
        : exam
    ));
  };

  const submitExamAttempt = (attempt: Omit<ExamAttempt, 'id'>) => {
    const newAttempt: ExamAttempt = {
      ...attempt,
      id: Date.now().toString()
    };
    setExamAttempts(prev => [...prev, newAttempt]);
  };

  const getExamById = (id: string) => exams.find(exam => exam.id === id);
  const getSchoolsBySocialNatural = (socialNaturalId: string) => schools.filter(school => school.socialNaturalId === socialNaturalId);
  const getDepartmentsBySchool = (schoolId: string) => departments.filter(dept => dept.schoolId === schoolId);
  const getExamsByDepartment = (departmentId: string) => exams.filter(exam => exam.departmentId === departmentId);

  return (
    <DataContext.Provider value={{
      socialNaturals,
      schools,
      departments,
      exams,
      examAttempts,
      analytics,
      addSocialNatural,
      addSchool,
      addDepartment,
      addExam,
      addQuestion,
      submitExamAttempt,
      getExamById,
      getSchoolsBySocialNatural,
      getDepartmentsBySchool,
      getExamsByDepartment
    }}>
      {children}
    </DataContext.Provider>
  );
};