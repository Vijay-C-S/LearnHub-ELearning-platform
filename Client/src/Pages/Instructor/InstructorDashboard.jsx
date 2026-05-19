import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Components/SideBar';
import { FaBook, FaUsers, FaDollarSign, FaPlus, FaEdit, FaTrash, FaStar } from 'react-icons/fa';
import './InstructorDashboard.css';

/* ─── Course card ──────────────────────────────────────── */
const CourseCard = ({ course, onEdit, onDelete }) => (
    <div className="id-card">
        <div className="id-card-img-wrap">
            <img
                src={course.imageUrl || '/vite.svg'}
                alt={course.title}
                className="id-card-img"
                onError={e => { e.target.style.opacity = '0.3'; }}
            />
        </div>
        <div className="id-card-body">
            <h5 className="id-card-title">{course.title}</h5>
            <p className="id-card-desc">
                {course.description
                    ? course.description.slice(0, 90) + (course.description.length > 90 ? '…' : '')
                    : 'No description provided.'}
            </p>
            {course.price !== undefined && (
                <div className="id-card-price">${course.price}</div>
            )}
            <div className="id-card-actions">
                <button className="id-btn-edit" onClick={onEdit}>
                    <FaEdit size={12} /> Edit
                </button>
                <button className="id-btn-delete" onClick={onDelete}>
                    <FaTrash size={12} /> Delete
                </button>
            </div>
        </div>
    </div>
);

/* ─── Stat card ────────────────────────────────────────── */
const StatCard = ({ icon: Icon, label, value, color, bg }) => (
    <div className="id-stat">
        <div className="id-stat-icon" style={{ background: bg }}>
            <Icon size={20} color={color} />
        </div>
        <div>
            <div className="id-stat-val">{value}</div>
            <div className="id-stat-lbl">{label}</div>
        </div>
    </div>
);

/* ─── Main Component ───────────────────────────────────── */
const InstructorDashboard = ({ onLogout }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    const toggleSidebar = () => setIsSidebarOpen(p => !p);

    useEffect(() => {
        const handleResize = () => setIsSidebarOpen(window.innerWidth >= 768);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const instructorEmail = localStorage.getItem('instructorEmail');
                const res = await axios.post(
                    `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/instructors/courses`,
                    { instructorEmail },
                    { headers: { 'x-auth-token': localStorage.getItem('instructorToken') } }
                );
                setCourses(res.data);
            } catch (err) {
                console.error('Error fetching courses:', err);
            }
        };
        fetchCourses();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this course?')) return;
        try {
            await axios.delete(
                `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/instructors/courses/${id}`,
                { headers: { 'x-auth-token': localStorage.getItem('instructorToken') } }
            );
            setCourses(prev => prev.filter(c => c._id !== id));
        } catch (err) {
            console.error('Error deleting course:', err);
        }
    };

    const sidebarW = isSidebarOpen ? '260px' : '72px';
    const totalValue = courses.reduce((s, c) => s + (parseFloat(c.price) || 0), 0);

    return (
        <div className="id-layout">
            <Sidebar onLogout={onLogout} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <main className="id-main" style={{ marginLeft: sidebarW }}>
                {/* ── Page Header ──────────────────────── */}
                <div className="id-page-header">
                    <div>
                        <h2 className="id-page-title">My Courses</h2>
                        <p className="id-page-sub">Manage and monitor your published courses</p>
                    </div>
                    <button className="id-create-btn" onClick={() => navigate('/create-course')}>
                        <FaPlus size={12} /> Create Course
                    </button>
                </div>

                <div className="id-body">
                    {/* ── Stats ───────────────────────── */}
                    <div className="id-stats-row">
                        <StatCard icon={FaBook}       label="Total Courses" value={courses.length}          color="#4F46E5" bg="#EEF2FF" />
                        <StatCard icon={FaUsers}      label="Students"      value="—"                      color="#059669" bg="#ECFDF5" />
                        <StatCard icon={FaDollarSign} label="Catalogue Value" value={`$${totalValue.toFixed(0)}`} color="#D97706" bg="#FFFBEB" />
                        <StatCard icon={FaStar}       label="Avg. Rating"   value="—"                      color="#7C3AED" bg="#F5F3FF" />
                    </div>

                    {/* ── Courses grid ─────────────────── */}
                    {courses.length === 0 ? (
                        <div className="id-empty">
                            <div className="id-empty-icon">
                                <FaBook size={34} color="#4F46E5" />
                            </div>
                            <h3 className="id-empty-title">No courses yet</h3>
                            <p className="id-empty-desc">Create your first course and start teaching today!</p>
                            <button className="id-empty-btn" onClick={() => navigate('/create-course')}>
                                <FaPlus size={12} /> Create Your First Course
                            </button>
                        </div>
                    ) : (
                        <div className="id-grid">
                            {courses.map(c => (
                                <CourseCard
                                    key={c._id}
                                    course={c}
                                    onEdit={() => navigate(`/edit-course/${c._id}`)}
                                    onDelete={() => handleDelete(c._id)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default InstructorDashboard;
