// Client/src/Components/Button.jsx
import React from 'react';
import './Button.css';

export default function Button({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    loading = false,
    disabled = false,
    fullWidth = false,
    ...props 
}) {
    const classes = `btn btn-${variant} btn-${size} ${fullWidth ? 'full-width' : ''}`;
    
    return (
        <button 
            className={classes} 
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <>
                    <span className="spinner"></span>
                    {children}
                </>
            ) : (
                children
            )}
        </button>
    );
}
