import React from 'react';
import {
    FaStar, FaChevronRight, FaCode, FaChartBar, FaBriefcase, FaPaintBrush,
    FaBullhorn, FaLaptopCode, FaUsers, FaBook, FaAward, FaArrowRight, FaPlay
} from 'react-icons/fa';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

/* ── Static data ──────────────────────────────────────── */
const FEATURED_COURSES = [
    { title: 'JavaScript for Beginners',  instructor: 'Sarah Johnson',  rating: 4.5, students: '12,430', badge: 'Bestseller' },
    { title: 'Mastering Python',          instructor: 'Michael Lee',    rating: 4.7, students: '18,920', badge: 'Top Rated'  },
    { title: 'Advanced Web Design',       instructor: 'Emma Wilson',    rating: 4.3, students: '8,760',  badge: 'New'        },
];

const TESTIMONIALS = [
    { name: 'Alice Brown',    course: 'JavaScript for Beginners', text: 'An excellent course that made learning JavaScript so much easier! The instructor explained everything clearly.', rating: 5 },
    { name: 'John Smith',     course: 'Mastering Python',         text: 'Loved the depth of this course. I feel confident working with Python now. Great experience!',             rating: 5 },
    { name: 'Linda Thompson', course: 'Advanced Web Design',      text: 'The projects in this course were fantastic! The instructor\'s approach was practical and easy to follow.', rating: 4 },
];

const CATEGORIES = [
    { label: 'Web Development', icon: FaCode,      count: '320+ courses' },
    { label: 'Data Science',    icon: FaChartBar,  count: '180+ courses' },
    { label: 'Business',        icon: FaBriefcase, count: '240+ courses' },
    { label: 'Design',          icon: FaPaintBrush,count: '150+ courses' },
    { label: 'Marketing',       icon: FaBullhorn,  count: '110+ courses' },
    { label: 'IT & Software',   icon: FaLaptopCode,count: '290+ courses' },
];

const STATS = [
    { icon: FaUsers, value: '50,000+', label: 'Active Students'    },
    { icon: FaBook,  value: '1,200+',  label: 'Expert Courses'     },
    { icon: FaAward, value: '98%',     label: 'Satisfaction Rate'  },
];

const StarRow = ({ rating }) => (
    <span className="lp-stars">
        {[1,2,3,4,5].map(i => (
            <FaStar key={i} size={13} color={i <= Math.floor(rating) ? '#F59E0B' : '#E2E8F0'} />
        ))}
        <span className="lp-rating-text">{rating.toFixed(1)}</span>
    </span>
);

/* ── Component ────────────────────────────────────────── */
export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="lp-root">
            <Header />

            <main>
                {/* ═══ HERO ══════════════════════════════ */}
                <section className="lp-hero">
                    <div className="lp-hero-bg" />
                    <div className="lp-container lp-hero-inner">
                        <div className="lp-hero-text">
                            <div className="lp-hero-badge">
                                <FaStar size={12} color="#F59E0B" /> Trusted by 50,000+ learners worldwide
                            </div>
                            <h1 className="lp-hero-h1">
                                Learn Without<br />
                                <span className="lp-hero-gradient">Limits</span>
                            </h1>
                            <p className="lp-hero-desc">
                                Start, switch, or advance your career with thousands of courses from world-class instructors. Learn at your own pace, anytime and anywhere.
                            </p>
                            <div className="lp-hero-actions">
                                <button className="lp-btn-primary lp-btn-lg" onClick={() => navigate('/signup')}>
                                    Get Started Free <FaArrowRight size={14} />
                                </button>
                                <button className="lp-btn-ghost lp-btn-lg" onClick={() => navigate('/instructor-auth')}>
                                    <FaPlay size={12} /> Become an Instructor
                                </button>
                            </div>
                            {/* Mini stats */}
                            <div className="lp-hero-minis">
                                {STATS.map(({ icon: Icon, value, label }) => (
                                    <div key={label} className="lp-hero-mini">
                                        <Icon size={16} className="lp-hero-mini-icon" />
                                        <span className="lp-hero-mini-val">{value}</span>
                                        <span className="lp-hero-mini-lbl">{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lp-hero-img-col">
                            <div className="lp-hero-img-wrap">
                                <img src="hero image.jpg" alt="Students learning" className="lp-hero-img"
                                    onError={e => { e.target.style.display = 'none'; }} />
                                {/* Floating card */}
                                <div className="lp-hero-float-card">
                                    <FaAward size={18} color="#4F46E5" />
                                    <div>
                                        <div className="lp-hero-float-val">98%</div>
                                        <div className="lp-hero-float-lbl">Satisfaction</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══ FEATURED COURSES ══════════════════ */}
                <section className="lp-section">
                    <div className="lp-container">
                        <div className="lp-section-header">
                            <div>
                                <h2 className="lp-section-h2">Featured Courses</h2>
                                <p className="lp-section-sub">Hand-picked by our editorial team</p>
                            </div>
                            <button className="lp-link-btn" onClick={() => navigate('/signup')}>
                                View all courses <FaChevronRight size={12} />
                            </button>
                        </div>

                        <div className="lp-course-grid">
                            {FEATURED_COURSES.map((c, i) => (
                                <div key={i} className="lp-course-card" onClick={() => navigate('/login')}>
                                    <div className="lp-course-img-wrap">
                                        <div className="lp-course-img-placeholder" />
                                        {c.badge && <span className="lp-course-badge">{c.badge}</span>}
                                    </div>
                                    <div className="lp-course-body">
                                        <h4 className="lp-course-title">{c.title}</h4>
                                        <p className="lp-course-inst">{c.instructor}</p>
                                        <div className="lp-course-meta">
                                            <StarRow rating={c.rating} />
                                            <span className="lp-course-students">
                                                <FaUsers size={11} /> {c.students}
                                            </span>
                                        </div>
                                        <button className="lp-course-enroll">Enroll Now</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══ CATEGORIES ════════════════════════ */}
                <section className="lp-section lp-section--alt">
                    <div className="lp-container">
                        <div className="lp-section-header">
                            <div>
                                <h2 className="lp-section-h2">Top Categories</h2>
                                <p className="lp-section-sub">Explore our most popular learning areas</p>
                            </div>
                        </div>
                        <div className="lp-cat-grid">
                            {CATEGORIES.map(({ label, icon: Icon, count }) => (
                                <div key={label} className="lp-cat-card" onClick={() => navigate('/signup')}>
                                    <div className="lp-cat-icon">
                                        <Icon size={22} />
                                    </div>
                                    <div>
                                        <div className="lp-cat-label">{label}</div>
                                        <div className="lp-cat-count">{count}</div>
                                    </div>
                                    <FaChevronRight size={12} className="lp-cat-arrow" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══ BECOME AN INSTRUCTOR ══════════════ */}
                <section className="lp-section lp-instructor-section">
                    <div className="lp-container lp-instructor-inner">
                        <div className="lp-instructor-text">
                            <div className="lp-instructor-badge">For Educators</div>
                            <h2 className="lp-instructor-h2">Share Your Knowledge, <br />Earn While You Teach</h2>
                            <p className="lp-instructor-desc">
                                Join thousands of expert instructors worldwide. Create engaging courses, set your own prices, and build a passive income stream while making a real difference in students' lives.
                            </p>
                            <div className="lp-instructor-perks">
                                {['Flexible scheduling', 'Competitive payouts', 'Global reach', 'Dedicated support'].map(p => (
                                    <div key={p} className="lp-perk">
                                        <div className="lp-perk-dot" />{p}
                                    </div>
                                ))}
                            </div>
                            <button className="lp-btn-primary lp-btn-lg" onClick={() => navigate('/instructor-auth')}>
                                Start Teaching Today <FaArrowRight size={14} />
                            </button>
                        </div>
                        <div className="lp-instructor-img-col">
                            <img src="instructor.jpg" alt="Instructor" className="lp-instructor-img"
                                onError={e => { e.target.style.display = 'none'; }} />
                        </div>
                    </div>
                </section>

                {/* ═══ TESTIMONIALS ══════════════════════ */}
                <section className="lp-section lp-section--alt">
                    <div className="lp-container">
                        <div className="lp-section-header lp-section-header--center">
                            <h2 className="lp-section-h2">What Our Students Say</h2>
                            <p className="lp-section-sub">Real stories from real learners</p>
                        </div>
                        <div className="lp-testimonial-grid">
                            {TESTIMONIALS.map(({ name, course, text, rating }, i) => (
                                <div key={i} className="lp-testimonial-card">
                                    <div className="lp-testimonial-stars">
                                        {[...Array(rating)].map((_, j) => (
                                            <FaStar key={j} size={14} color="#F59E0B" />
                                        ))}
                                    </div>
                                    <p className="lp-testimonial-text">"{text}"</p>
                                    <div className="lp-testimonial-author">
                                        <div className="lp-testimonial-avatar">
                                            {name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <div className="lp-testimonial-name">{name}</div>
                                            <div className="lp-testimonial-course">{course}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══ CTA BANNER ════════════════════════ */}
                <section className="lp-cta">
                    <div className="lp-container lp-cta-inner">
                        <div className="lp-cta-text">
                            <h2 className="lp-cta-h2">Start Your Learning Journey Today</h2>
                            <p className="lp-cta-desc">
                                Join millions of learners and unlock unlimited access to thousands of expert-led courses.
                            </p>
                        </div>
                        <div className="lp-cta-actions">
                            <button className="lp-cta-btn-main" onClick={() => navigate('/signup')}>
                                Sign Up Free <FaArrowRight size={14} />
                            </button>
                            <button className="lp-cta-btn-ghost" onClick={() => navigate('/login')}>
                                Log In
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
