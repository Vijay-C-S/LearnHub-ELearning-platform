import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HeaderStudent from '../../Components/HeaderStudent';
import {
    FaBook, FaGraduationCap, FaCheckCircle, FaComments,
    FaSearch, FaArrowRight, FaPlay, FaStar, FaPaperPlane
} from 'react-icons/fa';
import './StudentDashboard.css';

/* ─── helpers ──────────────────────────────────────── */
const getInitials = (name) =>
    name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U';

/* ─── sub-components (defined outside to avoid re-render) ─ */

const StatCard = ({ icon: Icon, label, value, color, bg }) => (
    <div className="sd-stat-card">
        <div className="sd-stat-icon" style={{ background: bg }}>
            <Icon size={20} color={color} />
        </div>
        <div>
            <div className="sd-stat-value">{value}</div>
            <div className="sd-stat-label">{label}</div>
        </div>
    </div>
);

const CourseCardAll = ({ course, onClick }) => (
    <div className="sd-course-card" onClick={onClick} role="button" tabIndex={0}
         onKeyDown={e => e.key === 'Enter' && onClick()}>
        <div className="sd-card-img-wrap">
            <img
                src={course.imageUrl || '/vite.svg'}
                alt={course.title}
                className="sd-card-img"
                onError={e => { e.target.style.opacity = '0'; }}
            />
            <span className="sd-card-badge">Course</span>
        </div>
        <div className="sd-card-body">
            <h5 className="sd-card-title">{course.title}</h5>
            <p className="sd-card-desc">{course.description}</p>
            <div className="sd-card-footer">
                {course.price !== undefined && (
                    <span className="sd-card-price">
                        {course.price === 0 ? 'Free' : `$${course.price}`}
                    </span>
                )}
                <span className="sd-card-cta">
                    View Details <FaArrowRight size={10} />
                </span>
            </div>
        </div>
    </div>
);

const CourseCardMy = ({ course, onClick }) => {
    const progress = course.completionPercentage || 0;
    const done = progress >= 100;
    return (
        <div className="sd-course-card" onClick={onClick} role="button" tabIndex={0}
             onKeyDown={e => e.key === 'Enter' && onClick()}>
            <div className="sd-card-img-wrap">
                <img
                    src={course.imageUrl || '/vite.svg'}
                    alt={course.title}
                    className="sd-card-img"
                    onError={e => { e.target.style.opacity = '0'; }}
                />
                {done && <div className="sd-card-done-overlay">Completed!</div>}
            </div>
            <div className="sd-card-body">
                <h5 className="sd-card-title">{course.title}</h5>
                <div className="sd-progress-wrap">
                    <div className="sd-progress-header">
                        <span className="sd-progress-label">Progress</span>
                        <span className="sd-progress-pct" style={{ color: done ? '#059669' : '#4F46E5' }}>
                            {progress}%
                        </span>
                    </div>
                    <div className="sd-progress-track">
                        <div
                            className="sd-progress-fill"
                            style={{
                                width: `${progress}%`,
                                background: done
                                    ? 'linear-gradient(90deg,#10B981,#059669)'
                                    : 'linear-gradient(90deg,#4F46E5,#7C3AED)',
                            }}
                        />
                    </div>
                </div>
                <button className={`sd-continue-btn${done ? ' sd-continue-btn--done' : ''}`}>
                    <FaPlay size={10} />
                    {done ? 'Review Course' : 'Continue Learning'}
                </button>
            </div>
        </div>
    );
};

const EmptyState = ({ icon: Icon, title, desc, actionLabel, onAction }) => (
    <div className="sd-empty">
        <div className="sd-empty-icon"><Icon size={34} color="#4F46E5" /></div>
        <h3 className="sd-empty-title">{title}</h3>
        <p className="sd-empty-desc">{desc}</p>
        {onAction && (
            <button className="sd-empty-btn" onClick={onAction}>{actionLabel}</button>
        )}
    </div>
);

const ForumSection = ({
    myCourses, selectedCourse, setSelectedCourse,
    threads, newMessage, setNewMessage, handlePostMessage,
}) => (
    <div className="sd-forum">
        {/* Course list */}
        <div className="sd-forum-list">
            <div className="sd-forum-list-header">Enrolled Courses</div>
            {myCourses.length === 0 ? (
                <p className="sd-forum-empty">No enrolled courses yet.</p>
            ) : (
                myCourses.map(c => (
                    <button
                        key={c._id}
                        className={`sd-forum-course-btn${selectedCourse?._id === c._id ? ' active' : ''}`}
                        onClick={() => setSelectedCourse(c)}
                    >
                        {c.title}
                    </button>
                ))
            )}
        </div>

        {/* Thread area */}
        <div className="sd-forum-thread">
            {selectedCourse ? (
                <>
                    <div className="sd-forum-thread-header">
                        <FaComments size={15} />
                        <strong>{selectedCourse.title}</strong> — Discussion
                    </div>
                    <div className="sd-forum-messages">
                        {threads.length === 0 ? (
                            <p className="sd-forum-no-msg">No messages yet — start the conversation!</p>
                        ) : (
                            threads.map((t, i) => (
                                <div key={i} className="sd-forum-msg">
                                    <div className="sd-forum-msg-avatar">{getInitials(t.userName)}</div>
                                    <div>
                                        <span className="sd-forum-msg-user">{t.userName}</span>
                                        <p className="sd-forum-msg-text">{t.message}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="sd-forum-composer">
                        <input
                            className="sd-forum-input"
                            type="text"
                            placeholder="Write a message… (Enter to send)"
                            value={newMessage}
                            onChange={e => setNewMessage(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handlePostMessage()}
                        />
                        <button className="sd-forum-send" onClick={handlePostMessage}>
                            <FaPaperPlane size={14} /> Post
                        </button>
                    </div>
                </>
            ) : (
                <div className="sd-forum-placeholder">
                    <FaComments size={40} color="#CBD5E1" />
                    <p>Select a course to view its discussion board</p>
                </div>
            )}
        </div>
    </div>
);

/* ─── Main Component ───────────────────────────────── */
const StudentDashboard = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState('allCourses');
    const [courses, setCourses] = useState([]);
    const [myCourses, setMyCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [threads, setThreads] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [userName, setUserName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const userEmail = localStorage.getItem('userEmail');

    /* fetch user name */
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/users/name`, {
            params: { email: userEmail },
            headers: { 'x-auth-token': localStorage.getItem('studentToken') },
        }).then(r => setUserName(r.data.name || '')).catch(console.error);
    }, [userEmail]);

    /* fetch courses */
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/users/student-dashboard/courses`, {
            headers: { 'x-auth-token': localStorage.getItem('studentToken') },
        }).then(r => setCourses(r.data)).catch(console.error);

        if (activeTab === 'myCourses' || activeTab === 'forums') {
            axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/users/student-dashboard/my-courses`, {
                params: { email: userEmail },
                headers: { 'x-auth-token': localStorage.getItem('studentToken') },
            }).then(r => setMyCourses(r.data)).catch(console.error);
        }
    }, [activeTab, userEmail]);

    /* fetch threads */
    useEffect(() => {
        if (!selectedCourse) return;
        axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/forums/${selectedCourse._id}/threads`, {
            headers: { 'x-auth-token': localStorage.getItem('studentToken') },
        }).then(r => setThreads(r.data)).catch(console.error);
    }, [selectedCourse]);

    const handlePostMessage = async () => {
        if (!newMessage.trim()) return;
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/forums/${selectedCourse._id}/threads`,
                { userName, message: newMessage },
                { headers: { 'x-auth-token': localStorage.getItem('studentToken') } }
            );
            setThreads(prev => [...prev, res.data]);
            setNewMessage('');
        } catch (err) { console.error(err); }
    };

    const filteredCourses = searchQuery
        ? courses.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
        : courses;

    const completedCount = myCourses.filter(c => (c.completionPercentage || 0) >= 100).length;

    const TABS = [
        { key: 'allCourses', label: 'All Courses',   icon: FaBook },
        { key: 'myCourses',  label: 'My Learning',   icon: FaGraduationCap },
        { key: 'forums',     label: 'Discussions',   icon: FaComments },
    ];

    return (
        <div className="sd-root">
            <HeaderStudent onLogout={onLogout} />

            {/* ── Hero / Welcome Banner ─────────────────── */}
            <div className="sd-hero">
                <div className="sd-hero-inner">
                    <div className="sd-hero-welcome">
                        <div className="sd-hero-avatar">{getInitials(userName)}</div>
                        <div>
                            <p className="sd-hero-sub">Welcome back,</p>
                            <h2 className="sd-hero-name">{userName || 'Student'}</h2>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="sd-hero-stats">
                        <div className="sd-hero-stat">
                            <FaBook size={18} className="sd-hero-stat-icon" />
                            <div>
                                <div className="sd-hero-stat-val">{courses.length}</div>
                                <div className="sd-hero-stat-label">Available</div>
                            </div>
                        </div>
                        <div className="sd-hero-stat">
                            <FaGraduationCap size={18} className="sd-hero-stat-icon" />
                            <div>
                                <div className="sd-hero-stat-val">{myCourses.length}</div>
                                <div className="sd-hero-stat-label">Enrolled</div>
                            </div>
                        </div>
                        <div className="sd-hero-stat">
                            <FaCheckCircle size={18} className="sd-hero-stat-icon" />
                            <div>
                                <div className="sd-hero-stat-val">{completedCount}</div>
                                <div className="sd-hero-stat-label">Completed</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Main Content ──────────────────────────── */}
            <div className="sd-content">

                {/* Tabs */}
                <div className="sd-tabs">
                    {TABS.map(({ key, label, icon: Icon }) => (
                        <button
                            key={key}
                            className={`sd-tab${activeTab === key ? ' active' : ''}`}
                            onClick={() => setActiveTab(key)}
                        >
                            <Icon size={14} />
                            {label}
                        </button>
                    ))}
                </div>

                {/* Search (All Courses tab) */}
                {activeTab === 'allCourses' && (
                    <div className="sd-search-wrap">
                        <FaSearch className="sd-search-icon" size={13} />
                        <input
                            className="sd-search-input"
                            type="text"
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                )}

                {/* All Courses */}
                {activeTab === 'allCourses' && (
                    filteredCourses.length === 0
                        ? <EmptyState
                            icon={FaBook}
                            title={searchQuery ? 'No courses found' : 'No courses available'}
                            desc={searchQuery ? 'Try a different search term.' : 'Check back later for new courses.'}
                          />
                        : <div className="sd-grid">
                            {filteredCourses.map(c => (
                                <CourseCardAll
                                    key={c._id}
                                    course={c}
                                    onClick={() => navigate(`/course/${c._id}`)}
                                />
                            ))}
                          </div>
                )}

                {/* My Courses */}
                {activeTab === 'myCourses' && (
                    myCourses.length === 0
                        ? <EmptyState
                            icon={FaGraduationCap}
                            title="No enrolled courses yet"
                            desc="Browse all courses and start learning today!"
                            actionLabel="Explore Courses"
                            onAction={() => setActiveTab('allCourses')}
                          />
                        : <div className="sd-grid">
                            {myCourses.map(c => (
                                <CourseCardMy
                                    key={c._id}
                                    course={c}
                                    onClick={() => navigate(`/my-courses/${c._id}`)}
                                />
                            ))}
                          </div>
                )}

                {/* Forums */}
                {activeTab === 'forums' && (
                    <ForumSection
                        myCourses={myCourses}
                        selectedCourse={selectedCourse}
                        setSelectedCourse={setSelectedCourse}
                        threads={threads}
                        newMessage={newMessage}
                        setNewMessage={setNewMessage}
                        handlePostMessage={handlePostMessage}
                    />
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;
