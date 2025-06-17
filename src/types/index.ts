export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'student';
  createdAt: string;
}

export interface SocialNatural {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface School {
  id: string;
  socialNaturalId: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface Department {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface Question {
  id: string;
  examId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  order: number;
  createdAt: string;
}

export interface Exam {
  id: string;
  departmentId: string;
  title: string;
  description: string;
  isPaid: boolean;
  price: number;
  studyModeEnabled: boolean;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
}

export interface ExamAttempt {
  id: string;
  userId: string;
  examId: string;
  answers: Record<string, number>;
  score: number;
  completedAt: string;
  studyMode: 'full' | 'guided';
}

export interface Analytics {
  totalUsers: number;
  totalExams: number;
  totalAttempts: number;
  popularDepartments: Array<{ name: string; attempts: number }>;
  recentActivity: Array<{ type: string; description: string; timestamp: string }>;
}

export type StudyMode = 'full' | 'guided';