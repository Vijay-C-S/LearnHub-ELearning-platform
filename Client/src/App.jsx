import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axiosInstance from './utils/axiosInstance';
import LoadingSpinner from './Components/LoadingSpinner';

// Lazy load page components for code splitting - significantly improves initial load
const Signup = React.lazy(() => import('./Pages/User/Signup'));
const Login = React.lazy(() => import('./Pages/User/Login'));
const ForgotPassword = React.lazy(() => import('./Pages/User/ForgotPassword'));
const StudentDashboard = React.lazy(() => import('./Pages/User/StudentDashboard'));
const CourseDetails = React.lazy(() => import('./Pages/User/CourseDetails'));
const Payment = React.lazy(() => import('./Pages/User/Payment'));
const CourseContent = React.lazy(() => import('./Pages/User/CourseContent'));
const StudentProfile = React.lazy(() => import('./Pages/User/StudentProfile'));
const InstructorAuth = React.lazy(() => import('./Pages/Instructor/InstructorAuth'));
const InstructorDashboard = React.lazy(() => import('./Pages/Instructor/InstructorDashboard'));
const CreateCourse = React.lazy(() => import('./Pages/Instructor/CreateCourse'));
const Earnings = React.lazy(() => import('./Pages/Instructor/earnings'));
const EditCourse = React.lazy(() => import('./Pages/Instructor/EditCourse'));
const Profile = React.lazy(() => import('./Pages/Instructor/Profile'));
const EnrolledStudents = React.lazy(() => import('./Pages/Instructor/EnrolledStudents'));
const LandingPage = React.lazy(() => import('./Pages/LandingPage'));
const AdminPage = React.lazy(() => import('./Pages/Admin/Admin'));
const ContactUs = React.lazy(() => import('./Pages/Navs/Contactus'));
const Blog = React.lazy(() => import('./Pages/Navs/blog'));
const Careers = React.lazy(() => import('./Pages/Navs/careers'));
const TeacherGuidelines = React.lazy(() => import('./Pages/Navs/TeacherGuidelines'));

// Fallback component for lazy loading
const PageFallback = () => <LoadingSpinner fullScreen />;

export default function App() {
    const [studentToken, setStudentToken] = useState(null);
    const [instructorToken, setInstructorToken] = useState(null);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    // On mount, check localStorage for tokens
    useEffect(() => {
        const token = localStorage.getItem('studentToken');
        const instructorToken = localStorage.getItem('instructorToken');

        if (token) {
            setStudentToken(token);
        }
        if (instructorToken) {
            setInstructorToken(instructorToken);
        }

        setIsCheckingAuth(false);
    }, []);

    const handleLogout = () => {
        setStudentToken(null);
        setInstructorToken(null);
        localStorage.removeItem('studentToken');
        localStorage.removeItem('instructorToken');
        localStorage.removeItem('instructorEmail');
        localStorage.removeItem('userEmail');
    };

    // Show a loading screen until auth is checked
    if (isCheckingAuth) {
        return <LoadingSpinner fullScreen />;
    }

    return (
        <Router>
            <Suspense fallback={<PageFallback />}>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login setStudentToken={setStudentToken} />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/instructor-auth" element={<InstructorAuth setInstructorToken={setInstructorToken} />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/TeacherGuidelines" element={<TeacherGuidelines />} />

                    {/* LandingPage — redirect authenticated users to their dashboard */}
                    <Route
                        path="/"
                        element={
                            studentToken
                                ? <Navigate to="/dashboard" />
                                : instructorToken
                                    ? <Navigate to="/instructor-dashboard" />
                                    : <LandingPage />
                        }
                    />

                    {/* Protected route for Student Dashboard */}
                    <Route
                        path="/dashboard"
                        element={studentToken ? <StudentDashboard onLogout={handleLogout} /> : <Navigate to="/login" />}
                    />
                    {/* Protected route for Instructor Dashboard */}
                    <Route
                        path="/instructor-dashboard"
                        element={instructorToken ? <InstructorDashboard onLogout={handleLogout} /> : <Navigate to="/instructor-auth" />}
                    />
                    <Route
                        path="/create-course"
                        element={instructorToken ? <CreateCourse onLogout={handleLogout} /> : <Navigate to="/instructor-auth" />}
                    />
                    <Route
                        path="/earnings"
                        element={instructorToken ? <Earnings onLogout={handleLogout} /> : <Navigate to="/instructor-auth" />}
                    />
                    <Route
                        path="/enrolled-students"
                        element={instructorToken ? <EnrolledStudents onLogout={handleLogout} /> : <Navigate to="/instructor-auth" />}
                    />
                    <Route
                        path="/edit-course/:courseId"
                        element={instructorToken ? <EditCourse onLogout={handleLogout} /> : <Navigate to="/instructor-auth" />}
                    />
                    <Route
                        path="/profile"
                        element={instructorToken ? <Profile onLogout={handleLogout} /> : <Navigate to="/instructor-auth" />}
                    />
                    <Route
                        path="/course/:courseId"
                        element={studentToken ? <CourseDetails onLogout={handleLogout} /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/payment"
                        element={studentToken ? <Payment /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/my-courses/:courseId"
                        element={studentToken ? <CourseContent onLogout={handleLogout} /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/student-profile"
                        element={studentToken ? <StudentProfile onLogout={handleLogout} /> : <Navigate to="/login" />}
                    />

                    {/* Redirect any undefined routes to home */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Suspense>
        </Router>
    );
}
