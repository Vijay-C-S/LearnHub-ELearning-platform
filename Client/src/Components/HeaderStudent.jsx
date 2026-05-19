import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaBook, FaUser, FaSignOutAlt, FaTimes, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HeaderStudent.css';

export default function HeaderStudent({ onLogout }) {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [courses, setCourses] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [purchasedCourses, setPurchasedCourses] = useState([]);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [userName, setUserName] = useState('');
    const searchRef = useRef(null);
    const userEmail = localStorage.getItem('userEmail');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/users/courses`,
                    { headers: { 'x-auth-token': localStorage.getItem('studentToken') } }
                );
                setCourses(res.data);
            } catch (err) {
                console.error('Error fetching courses:', err);
            }
        };

        const fetchUserData = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/users/${userEmail}`,
                    { headers: { 'x-auth-token': localStorage.getItem('studentToken') } }
                );
                setPurchasedCourses(res.data.purchasedCourses || []);
            } catch (err) {
                console.error('Error fetching user data:', err);
            }
        };

        const fetchUserName = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/users/name`,
                    {
                        params: { email: userEmail },
                        headers: { 'x-auth-token': localStorage.getItem('studentToken') }
                    }
                );
                setUserName(res.data.name || '');
            } catch (err) {
                console.error('Error fetching user name:', err);
            }
        };

        fetchCourses();
        fetchUserData();
        fetchUserName();
    }, [userEmail]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handler = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setSearchResults([]);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleSearchChange = (e) => {
        const val = e.target.value;
        setQuery(val);
        if (val.length > 1) {
            setSearchResults(
                courses.filter(c => c.title.toLowerCase().includes(val.toLowerCase())).slice(0, 6)
            );
        } else {
            setSearchResults([]);
        }
    };

    const handleCourseClick = (course) => {
        const isPurchased = purchasedCourses.includes(course._id);
        navigate(isPurchased ? `/my-courses/${course._id}` : `/course/${course._id}`);
        setQuery('');
        setSearchResults([]);
    };

    const getInitials = (name, email) => {
        if (name) return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        if (email) return email[0].toUpperCase();
        return 'U';
    };

    return (
        <header className="hs-header">
            <div className="hs-inner">
                {/* Logo — navigates to /dashboard, keeps session alive */}
                <div className="hs-logo" onClick={() => navigate('/dashboard')} role="button" tabIndex={0}>
                    <div className="hs-logo-icon">
                        <FaBook size={15} />
                    </div>
                    <span className="hs-logo-text">LearnHub</span>
                </div>

                {/* Search bar */}
                <div className="hs-search-wrap" ref={searchRef}>
                    <div className="hs-search-box">
                        <FaSearch className="hs-search-icon" size={13} />
                        <input
                            className="hs-search-input"
                            type="text"
                            placeholder="Search courses..."
                            value={query}
                            onChange={handleSearchChange}
                        />
                        {query && (
                            <button
                                className="hs-search-clear"
                                onClick={() => { setQuery(''); setSearchResults([]); }}
                                aria-label="Clear search"
                            >
                                <FaTimes size={11} />
                            </button>
                        )}
                    </div>

                    {searchResults.length > 0 && (
                        <div className="hs-search-dropdown">
                            {searchResults.map((course) => (
                                <button
                                    key={course._id}
                                    className="hs-search-item"
                                    onClick={() => handleCourseClick(course)}
                                >
                                    <FaBook size={11} className="hs-search-item-icon" />
                                    <span>{course.title}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Desktop actions */}
                <div className="hs-actions">
                    <button
                        className="hs-btn-profile"
                        onClick={() => navigate('/student-profile')}
                    >
                        <div className="hs-avatar">
                            {getInitials(userName, userEmail)}
                        </div>
                        <span className="hs-btn-label">Profile</span>
                    </button>
                    <button className="hs-btn-logout" onClick={onLogout}>
                        <FaSignOutAlt size={14} />
                        <span className="hs-btn-label">Logout</span>
                    </button>
                </div>

                {/* Mobile hamburger */}
                <button
                    className="hs-mobile-toggle"
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                    aria-label="Toggle menu"
                >
                    {showMobileMenu ? <FaTimes size={18} /> : <FaBars size={18} />}
                </button>
            </div>

            {/* Mobile menu */}
            {showMobileMenu && (
                <div className="hs-mobile-menu">
                    <button
                        className="hs-mobile-item"
                        onClick={() => { navigate('/student-profile'); setShowMobileMenu(false); }}
                    >
                        <FaUser size={14} /> Profile
                    </button>
                    <button className="hs-mobile-item hs-mobile-logout" onClick={onLogout}>
                        <FaSignOutAlt size={14} /> Logout
                    </button>
                </div>
            )}
        </header>
    );
}
