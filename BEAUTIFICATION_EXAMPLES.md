# LearnHub - Beautification Examples

This file shows practical examples of how to use the beautified components in real pages.

---

## Example 1: Updated Landing Page with All Components

**File:** `Client/src/Pages/LandingPage.jsx`

```jsx
import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import SectionHeader from '../Components/SectionHeader';
import CourseCard from '../Components/CourseCard';
import FeatureBox from '../Components/FeatureBox';
import TestimonialCard from '../Components/TestimonialCard';
import Button from '../Components/Button';
import { FaUsers, FaAward, FaClock, FaCertificate, FaGlobe } from 'react-icons/fa';
import './LandingPage.css';

export default function LandingPage() {
    const [loading, setLoading] = React.useState(false);

    const featuredCourses = [
        {
            id: 1,
            title: "JavaScript for Beginners",
            instructor: "Sarah Johnson",
            rating: 4.5,
            students: 2500,
            duration: "12h",
            price: 49.99,
            image: "https://via.placeholder.com/300x200?text=JavaScript"
        },
        {
            id: 2,
            title: "Mastering Python",
            instructor: "Michael Lee",
            rating: 4.7,
            students: 3200,
            duration: "16h",
            price: 59.99,
            image: "https://via.placeholder.com/300x200?text=Python"
        },
        {
            id: 3,
            title: "Advanced Web Design",
            instructor: "Emma Wilson",
            rating: 4.3,
            students: 1800,
            duration: "14h",
            price: 54.99,
            image: "https://via.placeholder.com/300x200?text=WebDesign"
        }
    ];

    const testimonials = [
        {
            name: "Alice Brown",
            role: "Student",
            course: "JavaScript for Beginners",
            content: "An excellent course! The instructor explained concepts so clearly. I went from complete beginner to writing real applications. Highly recommend!",
            rating: 5,
        },
        {
            name: "John Smith",
            role: "Professional",
            course: "Mastering Python",
            content: "Loved the depth of this course. Practical exercises helped me land a new job. The instructor's approach was practical and engaging throughout.",
            rating: 5,
        },
        {
            name: "Linda Thompson",
            role: "Entrepreneur",
            course: "Advanced Web Design",
            content: "The projects in this course were fantastic! I used what I learned to redesign my business website. Great experience overall!",
            rating: 5,
        }
    ];

    const features = [
        {
            icon: FaUsers,
            title: "Expert Instructors",
            description: "Learn from industry professionals with years of real-world experience."
        },
        {
            icon: FaCertificate,
            title: "Certifications",
            description: "Earn recognized certificates upon course completion."
        },
        {
            icon: FaClock,
            title: "Lifetime Access",
            description: "Learn at your own pace with lifetime access to course materials."
        },
        {
            icon: FaGlobe,
            title: "Global Community",
            description: "Connect with thousands of learners from around the world."
        },
        {
            icon: FaAward,
            title: "Project-Based",
            description: "Build real projects and develop practical skills."
        },
    ];

    const handleEnroll = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert('Welcome! Redirecting to course...');
        }, 1500);
    };

    return (
        <>
            <Header />
            
            <main>
                {/* Hero Section */}
                <section className="hero-section primary">
                    <div className="container">
                        <div className="row align-items-center gap-4">
                            <div className="col-lg-6 animate-fade-in-up">
                                <h1 className="text-white mb-4">
                                    Learn Without Limits
                                </h1>
                                <p className="lead text-white mb-4">
                                    Start, switch, or advance your career with thousands of courses from expert instructors worldwide.
                                </p>
                                <div className="d-flex gap-3 flex-wrap">
                                    <Button 
                                        variant="primary" 
                                        size="lg"
                                        onClick={handleEnroll}
                                        loading={loading}
                                    >
                                        {loading ? 'Processing...' : 'Explore Courses'}
                                    </Button>
                                    <Button variant="outline" size="lg">
                                        Learn More
                                    </Button>
                                </div>
                            </div>
                            <div className="col-lg-6 animate-fade-in">
                                <img 
                                    src="https://via.placeholder.com/450x400?text=Learning" 
                                    alt="Learning Hero" 
                                    className="img-fluid rounded-xl"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="light py-5">
                    <div className="container">
                        <SectionHeader 
                            title="Why Choose LearnHub?"
                            subtitle="Everything you need to succeed in your learning journey"
                            centered={true}
                            accent={true}
                        />
                        <div className="grid-2">
                            {features.slice(0, 2).map((feature, idx) => (
                                <div key={idx} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                                    <FeatureBox
                                        icon={feature.icon}
                                        title={feature.title}
                                        description={feature.description}
                                        gradient={idx === 1}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="grid-3 mt-4">
                            {features.slice(2).map((feature, idx) => (
                                <div key={idx} className="animate-fade-in-up" style={{ animationDelay: `${(idx + 2) * 100}ms` }}>
                                    <FeatureBox
                                        icon={feature.icon}
                                        title={feature.title}
                                        description={feature.description}
                                        gradient={idx % 2 === 0}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Courses Section */}
                <section className="py-5">
                    <div className="container">
                        <SectionHeader 
                            title="Featured Courses"
                            subtitle="Popular courses from top instructors"
                            centered={true}
                            accent={true}
                        />
                        <div className="grid-3">
                            {featuredCourses.map((course, idx) => (
                                <div key={course.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                                    <CourseCard
                                        {...course}
                                        onClick={() => console.log('Course:', course.title)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="light py-5">
                    <div className="container">
                        <div className="grid-3 text-center">
                            <div className="animate-fade-in-up">
                                <h2 className="text-primary mb-2">50K+</h2>
                                <p className="lead">Active Students</p>
                            </div>
                            <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                                <h2 className="text-primary mb-2">200+</h2>
                                <p className="lead">Expert Courses</p>
                            </div>
                            <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                                <h2 className="text-primary mb-2">4.8★</h2>
                                <p className="lead">Average Rating</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="py-5">
                    <div className="container">
                        <SectionHeader 
                            title="Student Success Stories"
                            subtitle="Real feedback from our learners"
                            centered={true}
                            accent={true}
                        />
                        <div className="grid-3">
                            {testimonials.map((testimonial, idx) => (
                                <div key={idx} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                                    <TestimonialCard {...testimonial} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="primary py-5">
                    <div className="container text-center">
                        <h2 className="text-white mb-3">Ready to Start Learning?</h2>
                        <p className="lead text-white mb-4">
                            Join thousands of students learning on LearnHub today
                        </p>
                        <Button variant="primary" size="lg">
                            Sign Up Now
                        </Button>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
```

---

## Example 2: Course Details Page with Beautified Design

```jsx
// Client/src/Pages/User/CourseDetails.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import Button from '../../Components/Button';
import { FaStar, FaUsers, FaClock, FaLanguage } from 'react-icons/fa';
import './CourseDetails.css';

export default function CourseDetails() {
    const { courseId } = useParams();
    const [isEnrolled, setIsEnrolled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const course = {
        title: "JavaScript Mastery - From Basics to Advanced",
        instructor: "Sarah Johnson",
        rating: 4.8,
        students: 15000,
        price: 79.99,
        duration: "40 hours",
        level: "Beginner to Advanced",
        description: "Master JavaScript from the ground up. Learn all the concepts you need to become a professional JavaScript developer.",
        image: "https://via.placeholder.com/600x400"
    };

    const handleEnroll = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setIsEnrolled(true);
        }, 1500);
    };

    return (
        <>
            <Header />
            
            <main>
                {/* Course Header */}
                <section className="primary py-5">
                    <div className="container">
                        <div className="row gap-4">
                            <div className="col-lg-7">
                                <h1 className="text-white mb-3">{course.title}</h1>
                                <p className="lead text-white mb-3">by {course.instructor}</p>
                                <div className="d-flex align-items-center gap-3">
                                    <span className="badge bg-warning text-dark">
                                        <FaStar /> {course.rating}
                                    </span>
                                    <span className="text-white">
                                        <FaUsers className="me-2" />{course.students.toLocaleString()} students
                                    </span>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <img 
                                    src={course.image} 
                                    alt={course.title}
                                    className="img-fluid rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Course Info */}
                <section className="py-5">
                    <div className="container">
                        <div className="row gap-4">
                            <div className="col-lg-7">
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <h3 className="card-title mb-3">About This Course</h3>
                                        <p>{course.description}</p>
                                        
                                        <h4 className="mt-4 mb-3">What You'll Learn</h4>
                                        <ul className="list-unstyled">
                                            <li className="mb-2">
                                                <span className="text-primary me-2">✓</span>
                                                JavaScript fundamentals and syntax
                                            </li>
                                            <li className="mb-2">
                                                <span className="text-primary me-2">✓</span>
                                                Advanced concepts and ES6+
                                            </li>
                                            <li className="mb-2">
                                                <span className="text-primary me-2">✓</span>
                                                Build real-world projects
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="col-lg-5">
                                <div className="card sticky-top">
                                    <div className="card-body text-center">
                                        <h2 className="text-primary mb-2">${course.price}</h2>
                                        <p className="text-muted mb-4">Lifetime access</p>
                                        
                                        <div className="mb-4">
                                            <div className="d-flex align-items-center gap-2 mb-2 text-start">
                                                <FaClock /> {course.duration}
                                            </div>
                                            <div className="d-flex align-items-center gap-2 mb-2 text-start">
                                                <span className="badge bg-info">Level</span>
                                                {course.level}
                                            </div>
                                        </div>

                                        {isEnrolled ? (
                                            <Button variant="success" size="lg" fullWidth disabled>
                                                ✓ Already Enrolled
                                            </Button>
                                        ) : (
                                            <Button 
                                                variant="primary" 
                                                size="lg" 
                                                fullWidth
                                                onClick={handleEnroll}
                                                loading={loading}
                                            >
                                                Enroll Now
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
```

---

## Example 3: Custom Styled Login Page

```jsx
// Client/src/Pages/User/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import './Login.css';

export default function Login({ setStudentToken }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setStudentToken('fake-token');
            navigate('/dashboard');
        } catch (err) {
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            
            <main className="login-page">
                <div className="login-container">
                    <div className="login-box">
                        <div className="login-header">
                            <h1>Welcome Back</h1>
                            <p>Log in to continue your learning journey</p>
                        </div>

                        {error && (
                            <div className="alert alert-danger">{error}</div>
                        )}

                        <form onSubmit={handleLogin}>
                            <div className="form-group mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    className="form-control"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group mb-4">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <Button 
                                variant="primary" 
                                size="lg" 
                                fullWidth
                                loading={loading}
                                type="submit"
                            >
                                Log In
                            </Button>
                        </form>

                        <p className="login-footer">
                            Don't have an account? 
                            <a href="/signup"> Sign up</a>
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
```

**Login Page CSS:**
```css
/* Client/src/Pages/User/Login.css */

.login-page {
    min-height: calc(100vh - 200px);
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
    padding: 2rem 0;
}

.login-container {
    width: 100%;
    max-width: 400px;
}

.login-box {
    background: white;
    border-radius: var(--border-radius-xl);
    padding: 3rem 2rem;
    box-shadow: var(--shadow-lg);
    animation: fadeInUp 0.6s ease-out;
}

.login-header {
    text-align: center;
    margin-bottom: 2rem;
}

.login-header h1 {
    font-size: 1.75rem;
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
    margin-bottom: 0.5rem;
}

.login-header p {
    color: var(--color-text-secondary);
    margin: 0;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-label {
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    margin-bottom: 0.5rem;
    display: block;
    font-size: 0.95rem;
}

.form-control {
    border: 1.5px solid var(--color-border);
    border-radius: var(--border-radius-md);
    padding: 0.85rem 1rem;
    font-size: 1rem;
    transition: all var(--transition-normal);
    font-family: var(--font-family-sans);
}

.form-control:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-light);
    outline: none;
}

.login-footer {
    text-align: center;
    margin-top: 1.5rem;
    color: var(--color-text-secondary);
    font-size: 0.95rem;
}

.login-footer a {
    color: var(--color-primary);
    font-weight: var(--font-weight-semibold);
    text-decoration: none;
    transition: color var(--transition-normal);
}

.login-footer a:hover {
    color: var(--color-primary-dark);
}

@media (max-width: 768px) {
    .login-box {
        padding: 2rem 1.5rem;
    }

    .login-header h1 {
        font-size: 1.5rem;
    }
}
```

---

## Example 4: Dashboard with Beautified Components

```jsx
// Client/src/Pages/User/StudentDashboard.jsx
import React from 'react';
import CourseCard from '../../Components/CourseCard';
import Button from '../../Components/Button';
import SectionHeader from '../../Components/SectionHeader';

export default function StudentDashboard({ onLogout }) {
    const enrolledCourses = [
        {
            title: "JavaScript for Beginners",
            instructor: "Sarah Johnson",
            rating: 4.5,
            students: 1200,
            duration: "12h",
            price: 49.99,
            progress: 65
        },
        // More courses...
    ];

    return (
        <main className="dashboard">
            <section className="py-5">
                <div className="container">
                    <SectionHeader 
                        title="My Learning Journey"
                        subtitle="Continue with your courses"
                        centered={false}
                    />
                    
                    <div className="grid-3">
                        {enrolledCourses.map((course) => (
                            <div key={course.title}>
                                <CourseCard {...course} />
                                <div className="mt-3">
                                    <div className="progress">
                                        <div 
                                            className="progress-bar" 
                                            style={{width: `${course.progress}%`}}
                                        >
                                            {course.progress}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
```

---

## Quick Integration Checklist

- [ ] Update Header imports in pages
- [ ] Replace Footer component in layout pages
- [ ] Add CourseCard to course listing pages
- [ ] Use SectionHeader for all section titles
- [ ] Replace button components with new Button
- [ ] Add TestimonialCard to testimonials section
- [ ] Use FeatureBox for feature sections
- [ ] Import theme CSS in index.css
- [ ] Test on mobile devices
- [ ] Verify all animations work
- [ ] Check accessibility with keyboard navigation
- [ ] Test in different browsers

---

**All examples follow the theme system and best practices!** ✨
