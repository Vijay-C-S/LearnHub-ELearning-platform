// Client/src/Components/LoadingSpinner.jsx
import React from 'react';
import './LoadingSpinner.css';

export default function LoadingSpinner({ size = 'medium', fullScreen = false }) {
    if (fullScreen) {
        return (
            <div className="loading-spinner-fullscreen">
                <div className={`spinner ${size}`}></div>
                <p className="mt-3 text-muted">Loading...</p>
            </div>
        );
    }

    return (
        <div className={`spinner ${size}`}></div>
    );
}
