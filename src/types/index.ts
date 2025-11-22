export type UserRole = 'candidate' | 'hr';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Interview {
  id: string;
  candidateId: string;
  type: 'mock' | 'live';
  position: string;
  date: string;
  status: 'completed' | 'in-progress' | 'scheduled';
  score?: number;
}

export interface Resume {
  id: string;
  candidateId: string;
  fileName: string;
  uploadDate: string;
  skills: string[];
  summary: string;
  experience: string[];
}

export interface Question {
  id: string;
  text: string;
  category: string;
}
