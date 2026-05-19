// Client/src/Components/CourseCard.jsx
import React from 'react';
import { FaStar, FaUsers, FaClock } from 'react-icons/fa';
import './CourseCard.css';

export default function CourseCard({ 
    title, 
    instructor, 
    rating = 4.5, 
    students = 1200, 
    duration = '12h', 
    price = 49.99,
    image,
    onClick 
}) {
    return (
        <div className="course-card" onClick={onClick}>
            {/* Course Image */}
            <div className="course-image">
                <img 
                    src={image || 'https://via.placeholder.com/300x200?text=Course'} 
                    alt={title}
                    loading="lazy"
                />
                <div className="course-overlay">
                    <button className="btn-course-action">Explore Course</button>
                </div>
            </div>

            {/* Course Info */}
            <div className="course-info">
                <h3 className="course-title">{title}</h3>
                <p className="course-instructor">by {instructor}</p>

                {/* Rating & Stats */}
                <div className="course-stats">
                    <div className="stat-item">
                        <FaStar className="stat-icon" />
                        <span className="stat-value">{rating}</span>
                    </div>
                    <div className="stat-item">
                        <FaUsers className="stat-icon" />
                        <span className="stat-value">{students.toLocaleString()}</span>
                    </div>
                    <div className="stat-item">
                        <FaClock className="stat-icon" />
                        <span className="stat-value">{duration}</span>
                    </div>
                </div>

                {/* Price & CTA */}
                <div className="course-footer">
                    <span className="course-price">${price}</span>
                    <button className="btn-enroll">Enroll Now</button>
                </div>
            </div>
        </div>
    );
}
