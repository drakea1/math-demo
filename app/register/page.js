'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '../supabaseClient';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [hasViewedTerms, setHasViewedTerms] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const requirements = [
    { label: '8+ Characters', met: formData.password.length >= 8 },
    { label: '1 Uppercase Letter', met: /[A-Z]/.test(formData.password) },
    { label: '1 Number', met: /[0-9]/.test(formData.password) },
    { label: '1 Special Char', met: /[!@#$%^&*]/.test(formData.password) },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const openTermsModal = (e) => {
    e.preventDefault();
    setIsTermsOpen(true);
    setHasViewedTerms(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.name,
        },
      },
    });

    setIsLoading(false);

    if (error) {
      setErrorMessage(error.message);
    } else {
      setIsSuccessModalOpen(true);
    }
  };

  return (
    <div className="page-container">
      <main className="auth-card">
        <header className="auth-header">
          <h1 className="glow-title">Create Account</h1>
          <p>Enter details to set up your account</p>
        </header>

        {errorMessage && (
          <p style={{ color: '#ff6b6b', fontSize: '0.85rem', textAlign: 'center', marginBottom: '1rem' }}>
            {errorMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                autoComplete="name"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="user@domain.com"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <div className="password-requirements-grid">
              {requirements.map((req, idx) => (
                <div key={idx} className={`req-tag ${req.met ? 'met' : ''}`}>
                  <span className="req-dot"></span>
                  <span className="req-text">{req.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                autoComplete="new-password"
              />
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me" style={{ opacity: hasViewedTerms ? 1 : 0.6 }}>
              <input
                type="checkbox"
                name="acceptTerms"
                id="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                disabled={!hasViewedTerms}
                required
              />
              <span>
                I agree to{' '}
                <button type="button" className="terms-link-btn" onClick={openTermsModal}>
                  Terms & Conditions
                </button>
                {!hasViewedTerms && (
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8', marginLeft: '0.4rem' }}>
                    (Read terms first)
                  </span>
                )}
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="btn-glow"
            disabled={isLoading || !formData.acceptTerms}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <footer className="auth-footer">
          <p>
            Already have an account?
            <Link href="/">Sign in</Link>
          </p>
        </footer>
      </main>

      {/* Terms & Conditions Modal */}
      {isTermsOpen && (
        <div className="modal-overlay" onClick={() => setIsTermsOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <header className="auth-header" style={{ marginBottom: '1.25rem' }}>
              <h2 className="glow-title" style={{ fontSize: '1.5rem' }}>Terms & Conditions</h2>
              <p>Last updated: September 2026</p>
            </header>

            <div className="terms-content">
              <section className="terms-section">
                <h2>1. Introduction</h2>
                <p>
                  Welcome to our platform. By creating an account or accessing our services, 
                  you agree to be bound by these Terms and Conditions.
                </p>
              </section>

              <section className="terms-section">
                <h2>2. User Accounts</h2>
                <p>
                  You are responsible for maintaining the confidentiality of your account credentials.
                </p>
              </section>
            </div>

            <button
              type="button"
              className="btn-glow"
              onClick={() => setIsTermsOpen(false)}
            >
              I Understand & Close
            </button>
          </div>
        </div>
      )}

      {/* Registration Success / Verify Email Modal */}
      {isSuccessModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card" style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                margin: '0 auto 1.25rem auto',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(255, 255, 255, 0.15)',
              }}
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>

            <header className="auth-header" style={{ marginBottom: '1.25rem' }}>
              <h2 className="glow-title" style={{ fontSize: '1.5rem' }}>Check Your Email</h2>
              <p style={{ marginTop: '0.4rem', lineHeight: '1.5', fontSize: '0.85rem' }}>
                We sent a confirmation link to <strong style={{ color: '#fff' }}>{formData.email}</strong>. Please check your inbox and verify your email to complete registration.
              </p>
            </header>

            <Link href="/" className="btn-glow" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
              Back to Sign In
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}