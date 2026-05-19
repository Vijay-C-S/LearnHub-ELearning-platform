// Client/src/Components/TestimonialCard.jsx
import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import './TestimonialCard.css';

export default function TestimonialCard({ 
    name, 
    role, 
    content, 
    rating = 5,
    image,
    course
}) {
    return (
        <div className="testimonial-card">
            {/* Quote Icon */}
            <div className="quote-icon">
                <FaQuoteLeft />
            </div>

            {/* Content */}
            <p className="testimonial-content">{content}</p>

            {/* Rating */}
            {rating > 0 && (
                <div className="testimonial-rating">
                    {[...Array(rating)].map((_, i) => (
                        <FaStar key={i} className="star" />
                    ))}
                </div>
            )}

            {/* Author Info */}
            <div className="testimonial-author">
                {image && (
                    <img src={image} alt={name} className="author-image" />
                )}
                <div className="author-info">
                    <p className="author-name">{name}</p>
                    {role && <p className="author-role">{role}</p>}
                    {course && <p className="author-course">{course}</p>}
                </div>
            </div>
        </div>
    );
}
