// Client/src/Components/SectionHeader.jsx
import React from 'react';
import './SectionHeader.css';

export default function SectionHeader({ 
    title, 
    subtitle, 
    centered = true,
    accent = true 
}) {
    return (
        <div className={`section-header ${centered ? 'centered' : ''}`}>
            {title && (
                <h2 className={`section-title ${accent ? 'with-accent' : ''}`}>
                    {title}
                </h2>
            )}
            {subtitle && (
                <p className="section-subtitle">{subtitle}</p>
            )}
        </div>
    );
}
