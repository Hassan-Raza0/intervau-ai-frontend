import { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';

export interface RouteConfig {
  path: string;
  component: ReactNode;
  roles?: UserRole[];
  requiresAuth?: boolean;
}

interface RouterProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function useRouter(currentPath: string, onNavigate: (path: string) => void) {
  return {
    navigate: onNavigate,
    currentPath,
    goBack: () => {
      window.history.back();
    },
  };
}

export function ProtectedRoute({
  children,
  roles,
  requiresAuth = true
}: {
  children: ReactNode;
  roles?: UserRole[];
  requiresAuth?: boolean;
}) {
  const { user } = useAuth();

  if (requiresAuth && !user) {
    return null;
  }

  if (roles && user && !roles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}

export const ROUTES = {
  LANDING: 'landing',
  LOGIN: 'login',
  REGISTER: 'register',
  FORGOT_PASSWORD: 'forgot-password',

  CANDIDATE_DASHBOARD: 'dashboard',
  RESUME: 'resume',
  MOCK_INTERVIEW: 'mock-interview',
  MOCK_INTERVIEW_SESSION: 'mock-interview-session',

  HR_DASHBOARD: 'hr-dashboard',
  JOB_POSITIONS: 'job-positions',
  HR_CANDIDATES: 'hr-candidates',
  CANDIDATE_REVIEW: 'candidate-review',

  LIVE_INTERVIEW: 'live-interview',
  INTERVIEW_REPORT: 'interview-report',
  INTERVIEW_HISTORY: 'interview-history',
  PROFILE_SETTINGS: 'profile-settings',

  PRICING: 'pricing',
  ABOUT: 'about',
  FAQ: 'faq',
  CONTACT: 'contact',

  NOT_FOUND: '404',
} as const;

export function getDefaultRoute(role: UserRole | null): string {
  if (!role) return ROUTES.LANDING;
  return role === 'candidate' ? ROUTES.CANDIDATE_DASHBOARD : ROUTES.HR_DASHBOARD;
}
