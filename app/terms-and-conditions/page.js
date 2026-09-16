'use client';

import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="page-container" style={{ maxWidth: '600px' }}>
      <main className="auth-card">
        <header className="auth-header">
          <h1 className="glow-title">Terms & Conditions</h1>
          <p>Last updated: September 2026</p>
        </header>

        <div className="terms-content">
          <section className="terms-section">
            <h2>1. Introduction</h2>
            <p>
              Welcome to our platform. By creating an account or accessing our services, 
              you agree to be bound by these Terms and Conditions. Please read them carefully.
            </p>
          </section>

          <section className="terms-section">
            <h2>2. User Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials 
              and password. You agree to accept responsibility for all activities that occur 
              under your account.
            </p>
          </section>
        </div>

        <footer className="auth-footer" style={{ marginTop: '1.5rem' }}>
          <Link 
            href="/register" 
            className="btn-glow" 
            style={{ display: 'block', textAlign: 'center', textDecoration: 'none', color: '#000000' }}
          >
            Back to Sign Up
          </Link>
        </footer>
      </main>
    </div>
  );
}