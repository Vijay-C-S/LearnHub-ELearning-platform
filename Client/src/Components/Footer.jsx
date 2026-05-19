// Client/src/Components/Footer.jsx
import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="learnhub-footer">
            {/* Main Footer Content */}
            <div className="footer-container">
                <div className="container">
                    <div className="footer-content grid-4">
                        {/* About */}
                        <div className="footer-section">
                            <h4 className="footer-title">About LearnHub</h4>
                            <p className="footer-text">
                                Empowering learners worldwide with quality education and professional instructors.
                            </p>
                            <div className="social-links">
                                <a href="#facebook" className="social-link" aria-label="Facebook">
                                    <FaFacebook />
                                </a>
                                <a href="#twitter" className="social-link" aria-label="Twitter">
                                    <FaTwitter />
                                </a>
                                <a href="#linkedin" className="social-link" aria-label="LinkedIn">
                                    <FaLinkedin />
                                </a>
                                <a href="#instagram" className="social-link" aria-label="Instagram">
                                    <FaInstagram />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="footer-section">
                            <h4 className="footer-title">Quick Links</h4>
                            <ul className="footer-links">
                                <li><a href="/courses">Browse Courses</a></li>
                                <li><a href="/teach">Become Instructor</a></li>
                                <li><a href="/blog">Blog</a></li>
                                <li><a href="/careers">Careers</a></li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div className="footer-section">
                            <h4 className="footer-title">Support</h4>
                            <ul className="footer-links">
                                <li><a href="/help">Help Center</a></li>
                                <li><a href="/contact-us">Contact Us</a></li>
                                <li><a href="/faq">FAQ</a></li>
                                <li><a href="/status">System Status</a></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="footer-section">
                            <h4 className="footer-title">Contact</h4>
                            <div className="contact-item">
                                <FaEnvelope className="contact-icon" />
                                <a href="mailto:support@learnhub.com">support@learnhub.com</a>
                            </div>
                            <div className="contact-item">
                                <FaPhone className="contact-icon" />
                                <a href="tel:+1234567890">+1 (234) 567-890</a>
                            </div>
                            <div className="contact-item">
                                <FaMapMarkerAlt className="contact-icon" />
                                <span>123 Learning St, Tech City</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <div className="container">
                    <div className="footer-bottom-content">
                        <p className="copyright">
                            &copy; {currentYear} LearnHub. All rights reserved.
                        </p>
                        <div className="legal-links">
                            <a href="/privacy">Privacy Policy</a>
                            <a href="/terms">Terms of Service</a>
                            <a href="/cookies">Cookie Settings</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}