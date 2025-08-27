'use client';

import React from 'react';
import Link from 'next/link';

export default function ReferralPage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #dbeafe 0%, #ffffff 50%, #cffafe 100%)',
      padding: '32px'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '32px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <Link href="/dashboard" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            color: 'white',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '16px',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
          }}>
            ←
          </Link>
          <div>
            <h1 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '4px'
            }}>Send a Referral</h1>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              margin: 0
            }}>Connect your patients with trusted colleagues</p>
          </div>
        </div>

        <div style={{
          background: 'rgba(16, 185, 129, 0.1)',
          borderRadius: '12px',
          padding: '24px',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '12px'
          }}>Referral System Coming Soon</h2>
          <p style={{
            fontSize: '16px',
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            This page will include practitioner selection, patient information, 
            voice-to-text notes, and easy referral management.
          </p>
          <Link href="/dashboard" style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
          }}>
            Back to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
