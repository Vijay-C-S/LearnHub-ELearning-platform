import React from 'react';
import { FaBars, FaBook, FaPlusCircle, FaDollarSign, FaUsers, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import './SideBar.css';

const NAV_ITEMS = [
    { href: '/instructor-dashboard', icon: FaBook,       label: 'My Courses'  },
    { href: '/create-course',        icon: FaPlusCircle, label: 'Create Course' },
    { href: '/earnings',             icon: FaDollarSign, label: 'Earnings'     },
    { href: '/enrolled-students',    icon: FaUsers,      label: 'Students'     },
];

const Sidebar = ({ onLogout, isSidebarOpen, toggleSidebar }) => {
    const { pathname } = useLocation();
    const expanded = isSidebarOpen;

    return (
        <div className={`lh-sidebar ${expanded ? 'expanded' : 'collapsed'}`}>

            {/* ── Header ─────────────────────────────────── */}
            <div className="lhs-header">
                <button
                    className="lhs-toggle"
                    onClick={toggleSidebar}
                    aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
                >
                    <FaBars size={15} />
                </button>

                {expanded && (
                    <div className="lhs-brand">
                        <div className="lhs-brand-icon">
                            <FaBook size={14} />
                        </div>
                        <span className="lhs-brand-name">LearnHub</span>
                    </div>
                )}
            </div>

            {/* ── Navigation ─────────────────────────────── */}
            <nav className="lhs-nav">
                {expanded && <div className="lhs-section-label">Navigation</div>}

                {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
                    const active = pathname === href;
                    return (
                        <a
                            key={href}
                            href={href}
                            className={`lhs-nav-item${active ? ' active' : ''}`}
                            title={!expanded ? label : undefined}
                            aria-current={active ? 'page' : undefined}
                        >
                            <span className="lhs-nav-icon"><Icon size={16} /></span>
                            {expanded && <span className="lhs-nav-label">{label}</span>}
                        </a>
                    );
                })}
            </nav>

            {/* ── Footer ─────────────────────────────────── */}
            <div className="lhs-footer">
                <a
                    href="/profile"
                    className={`lhs-footer-item${pathname === '/profile' ? ' active' : ''}`}
                    title={!expanded ? 'Profile' : undefined}
                >
                    <span className="lhs-nav-icon"><FaUser size={16} /></span>
                    {expanded && <span className="lhs-nav-label">Profile</span>}
                </a>

                <button
                    className="lhs-footer-item lhs-logout"
                    onClick={onLogout}
                    title={!expanded ? 'Logout' : undefined}
                >
                    <span className="lhs-nav-icon"><FaSignOutAlt size={16} /></span>
                    {expanded && <span className="lhs-nav-label">Logout</span>}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
