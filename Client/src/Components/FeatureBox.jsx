// Client/src/Components/FeatureBox.jsx
import React from 'react';
import './FeatureBox.css';

export default function FeatureBox({ 
    icon: Icon, 
    title, 
    description,
    gradient = false 
}) {
    return (
        <div className={`feature-box ${gradient ? 'gradient' : ''}`}>
            <div className="feature-icon">
                {Icon && <Icon />}
            </div>
            <h3 className="feature-title">{title}</h3>
            <p className="feature-description">{description}</p>
        </div>
    );
}
