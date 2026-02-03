import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ClassSelectionPage from './pages/ClassSelectionPage';
import SubjectPage from './pages/SubjectPage';
import ChapterPage from './pages/ChapterPage';
import NotesPage from './pages/NotesPage';
import ResourcesPage from './pages/ResourcesPage';
import MockTestPage from './pages/MockTestPage';
import TestResultPage from './pages/TestResultPage';
import { AuthProvider, useAuth } from './context/AuthContext';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AppRoutes() {
  return (
    <>
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/classes"
            element={
              <PrivateRoute>
                <ClassSelectionPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/classes/:classLevel/subjects"
            element={
              <PrivateRoute>
                <SubjectPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/subjects/:subjectId/chapters"
            element={
              <PrivateRoute>
                <ChapterPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/chapters/:chapterId/notes"
            element={
              <PrivateRoute>
                <NotesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/chapters/:chapterId/resources"
            element={
              <PrivateRoute>
                <ResourcesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/tests/:testId"
            element={
              <PrivateRoute>
                <MockTestPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/tests/:testId/result/:attemptId"
            element={
              <PrivateRoute>
                <TestResultPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

