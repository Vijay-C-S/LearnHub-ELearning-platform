import React, { useState } from 'react';
import { FaBook, FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="learnhub-header">
            <div className="container-fluid">
                <div className="header-content">
                    {/* Logo */}
                    <div className="logo-section" onClick={() => navigate('/')}>
                        <div className="logo-icon">
                            <FaBook />
                        </div>
                        <span className="logo-text">LearnHub</span>
                    </div>

                    {/* Navigation */}
                    <nav className={`navbar-menu ${isOpen ? 'active' : ''}`}>
                        <ul className="nav-list">
                            <li className="nav-item">
                                <a href="/courses" className="nav-link">Courses</a>
                            </li>
                            <li className="nav-item">
                                <a href="/categories" className="nav-link">Categories</a>
                            </li>
                            <li className="nav-item">
                                <a href="/teach" className="nav-link">Teach</a>
                            </li>
                            <li className="nav-item">
                                <a href="/blog" className="nav-link">Blog</a>
                            </li>
                        </ul>
                    </nav>

                    {/* Auth Buttons */}
                    <div className="auth-buttons">
                        <button 
                            className="btn-auth login" 
                            onClick={() => navigate('/login')}
                        >
                            Log in
                        </button>
                        <button 
                            className="btn-auth signup" 
                            onClick={() => navigate('/signup')}
                        >
                            Sign up
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="mobile-toggle" onClick={toggleMenu}>
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </div>
                </div>
            </div>
        </header>
    );
}