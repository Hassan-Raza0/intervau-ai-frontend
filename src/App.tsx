import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import AppLayout from './components/layout/AppLayout';
import Navbar from './components/Navbar';
import NotificationToast from './components/common/NotificationToast';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Resume from './pages/Resume';
import MockInterview from './pages/MockInterview';
import MockInterviewSession from './pages/MockInterviewSession';
import LiveInterview from './pages/LiveInterview';
import InterviewReport from './pages/InterviewReport';
import InterviewHistory from './pages/InterviewHistory';
import ProfileSettings from './pages/ProfileSettings';
import HRDashboard from './pages/HRDashboard';
import JobPositions from './pages/JobPositions';
import HRCandidates from './pages/HRCandidates';
import CandidateReview from './pages/CandidateReview';
import Pricing from './pages/Pricing';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

import { ROUTES } from './router';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('landing');
  const { user } = useAuth();

  const publicPages = [
    ROUTES.LANDING,
    ROUTES.LOGIN,
    ROUTES.REGISTER,
    ROUTES.FORGOT_PASSWORD,
    ROUTES.PRICING,
    ROUTES.ABOUT,
    ROUTES.FAQ,
    ROUTES.CONTACT,
  ];

  const isPublicPage = publicPages.includes(currentPage);

  const renderPage = () => {
    switch (currentPage) {
      case ROUTES.LANDING:
        return <Landing onNavigate={setCurrentPage} />;
      case ROUTES.LOGIN:
        return <Login onNavigate={setCurrentPage} />;
      case ROUTES.REGISTER:
        return <Register onNavigate={setCurrentPage} />;
      case ROUTES.FORGOT_PASSWORD:
        return <ForgotPassword onNavigate={setCurrentPage} />;
      case ROUTES.CANDIDATE_DASHBOARD:
        return user && user.role === 'candidate' ? (
          <Dashboard onNavigate={setCurrentPage} />
        ) : (
          <Login onNavigate={setCurrentPage} />
        );
      case ROUTES.RESUME:
        return user && user.role === 'candidate' ? (
          <Resume />
        ) : (
          <Login onNavigate={setCurrentPage} />
        );
      case ROUTES.MOCK_INTERVIEW:
        return user && user.role === 'candidate' ? (
          <MockInterview onNavigate={setCurrentPage} />
        ) : (
          <Login onNavigate={setCurrentPage} />
        );
      case ROUTES.MOCK_INTERVIEW_SESSION:
        return user && user.role === 'candidate' ? (
          <MockInterviewSession />
        ) : (
          <Login onNavigate={setCurrentPage} />
        );
      case ROUTES.LIVE_INTERVIEW:
        return user ? (
          <LiveInterview userRole={user.role} />
        ) : (
          <Login onNavigate={setCurrentPage} />
        );
      case ROUTES.INTERVIEW_REPORT:
        return user ? <InterviewReport /> : <Login onNavigate={setCurrentPage} />;
      case ROUTES.INTERVIEW_HISTORY:
        return user ? <InterviewHistory /> : <Login onNavigate={setCurrentPage} />;
      case ROUTES.PROFILE_SETTINGS:
        return user ? <ProfileSettings /> : <Login onNavigate={setCurrentPage} />;
      case ROUTES.PRICING:
        return <Pricing />;
      case ROUTES.ABOUT:
        return <About />;
      case ROUTES.FAQ:
        return <FAQ />;
      case ROUTES.CONTACT:
        return <Contact />;
      case ROUTES.HR_DASHBOARD:
        return user && user.role === 'hr' ? (
          <HRDashboard onNavigate={setCurrentPage} />
        ) : (
          <Login onNavigate={setCurrentPage} />
        );
      case ROUTES.JOB_POSITIONS:
        return user && user.role === 'hr' ? (
          <JobPositions onNavigate={setCurrentPage} />
        ) : (
          <Login onNavigate={setCurrentPage} />
        );
      case ROUTES.HR_CANDIDATES:
        return user && user.role === 'hr' ? (
          <HRCandidates onNavigate={setCurrentPage} />
        ) : (
          <Login onNavigate={setCurrentPage} />
        );
      case ROUTES.CANDIDATE_REVIEW:
        return user && user.role === 'hr' ? (
          <CandidateReview />
        ) : (
          <Login onNavigate={setCurrentPage} />
        );
      default:
        return <NotFound onNavigate={setCurrentPage} />;
    }
  };

  if (isPublicPage || !user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        {!isPublicPage && <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />}
        {renderPage()}
      </div>
    );
  }

  const getPageTitle = () => {
    switch (currentPage) {
      case ROUTES.CANDIDATE_DASHBOARD:
      case ROUTES.HR_DASHBOARD:
        return 'Dashboard';
      case ROUTES.RESUME:
        return 'Resume';
      case ROUTES.MOCK_INTERVIEW:
        return 'Mock Interview';
      case ROUTES.JOB_POSITIONS:
        return 'Job Positions';
      case ROUTES.HR_CANDIDATES:
        return 'Candidates';
      case ROUTES.INTERVIEW_HISTORY:
        return 'Interview History';
      case ROUTES.PROFILE_SETTINGS:
        return 'Profile Settings';
      default:
        return undefined;
    }
  };

  return (
    <AppLayout currentPage={currentPage} onNavigate={setCurrentPage} title={getPageTitle()}>
      {renderPage()}
    </AppLayout>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <NotificationToast />
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
