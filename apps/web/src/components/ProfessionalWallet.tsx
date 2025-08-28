'use client';
import React from 'react';

export default function ProfessionalWallet() {
  return (
    <section style={{
      background: "rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      padding: "24px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)"
    }}>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{
          fontSize: "24px",
          fontWeight: "700",
          color: "#111827",
          marginBottom: "8px"
        }}>💼 Professional Wallet</h2>
        <p style={{
          fontSize: "16px",
          color: "#6b7280",
          margin: 0
        }}>Your Secure Digital Credential Vault</p>
      </div>

      {/* Quick Stats */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
        gap: "16px", 
        marginBottom: "32px" 
      }}>
        <div style={{
          background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
          borderRadius: "16px",
          padding: "20px",
          color: "white",
          boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)"
        }}>
          <div style={{ fontSize: "24px", marginBottom: "8px" }}>📋</div>
          <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>Licenses</h3>
          <p style={{ fontSize: "14px", opacity: 0.9, margin: 0 }}>2 Active</p>
          <p style={{ fontSize: "12px", opacity: 0.8, margin: "4px 0 0 0" }}>1 Renewal in 45 days</p>
        </div>
        
        <div style={{
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          borderRadius: "16px",
          padding: "20px",
          color: "white",
          boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)"
        }}>
          <div style={{ fontSize: "24px", marginBottom: "8px" }}>🎓</div>
          <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>Education</h3>
          <p style={{ fontSize: "14px", opacity: 0.9, margin: 0 }}>3 Credentials</p>
          <p style={{ fontSize: "12px", opacity: 0.8, margin: "4px 0 0 0" }}>2 Verified ✓</p>
        </div>
        
        <div style={{
          background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
          borderRadius: "16px",
          padding: "20px",
          color: "white",
          boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)"
        }}>
          <div style={{ fontSize: "24px", marginBottom: "8px" }}>🛡️</div>
          <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>Insurance</h3>
          <p style={{ fontSize: "14px", opacity: 0.9, margin: 0 }}>1 Policy</p>
          <p style={{ fontSize: "12px", opacity: 0.8, margin: "4px 0 0 0" }}>Expires in 120 days</p>
        </div>
        
        <div style={{
          background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
          borderRadius: "16px",
          padding: "20px",
          color: "white",
          boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)"
        }}>
          <div style={{ fontSize: "24px", marginBottom: "8px" }}>🏆</div>
          <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>Certifications</h3>
          <p style={{ fontSize: "14px", opacity: 0.9, margin: 0 }}>5 Verified</p>
          <p style={{ fontSize: "12px", opacity: 0.8, margin: "4px 0 0 0" }}>3 CEU credits earned</p>
        </div>
      </div>

      {/* Smart Features Section */}
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "16px",
        padding: "24px",
        color: "white",
        boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)"
      }}>
        <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "16px" }}>✨ Smart Features</h3>
        <div style={{ display: "grid", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ fontSize: "20px" }}>🔔</div>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>Automated Renewal Reminders</h4>
              <p style={{ fontSize: "14px", opacity: 0.9, margin: 0 }}>Get notified 90, 60, and 30 days before important deadlines</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ fontSize: "20px" }}>✓</div>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>Verification Badges</h4>
              <p style={{ fontSize: "14px", opacity: 0.9, margin: 0 }}>Build trust with verified credentials on your public profile</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ fontSize: "20px" }}>🔗</div>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>One-Click Profile Integration</h4>
              <p style={{ fontSize: "14px", opacity: 0.9, margin: 0 }}>Selectively showcase credentials without re-entering data</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
