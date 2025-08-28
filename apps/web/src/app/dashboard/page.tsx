'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ProfileCircles from '../../components/ProfileCircles';
import ProfessionalWallet from '../../components/ProfessionalWallet';
export default function DashboardPage() {
  const [tab, setTab] = useState<'overview' | 'referrals' | 'network' | 'plans' | 'wallet'>('overview');

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #dbeafe 0%, #ffffff 50%, #cffafe 100%)',
      position: 'relative'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        height: '128px',
        width: '128px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.4) 0%, rgba(251, 146, 60, 0.4) 100%)',
        filter: 'blur(32px)',
        zIndex: 0
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        height: '96px',
        width: '96px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.4) 0%, rgba(34, 211, 238, 0.4) 100%)',
        filter: 'blur(24px)',
        zIndex: 0
      }}></div>
      
      {/* Top bar */}
      <header style={{
        borderBottom: '1px solid rgba(229, 231, 235, 0.5)',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          margin: '0 auto',
          display: 'flex',
          maxWidth: '72rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              height: '40px',
              width: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
              color: 'white',
              display: 'grid',
              placeItems: 'center',
              fontWeight: 'bold',
              fontSize: '18px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}>BC</div>
            <h1 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#111827'
            }}>Dashboard</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/login" style={{
              fontSize: '14px',
              color: '#4b5563',
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}>Sign out</Link>
          </div>
        </div>
      </header>

      <div style={{
        margin: '0 auto',
        maxWidth: '72rem',
        padding: '2rem 1rem',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Tabs */}
        <div style={{
          marginBottom: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '12px'
        }}>
          {([
            ['overview', 'Overview'],
            ['referrals', 'Referrals'],
            ['network', 'Network'],
            ['plans', 'Plans'],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{
                borderRadius: '12px',
                border: tab === key ? '1px solid #06b6d4' : '1px solid #e5e7eb',
                padding: '10px 16px',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s',
                background: tab === key 
                  ? 'linear-gradient(90deg, #06b6d4 0%, #0891b2 100%)'
                  : 'rgba(255, 255, 255, 0.9)',
                color: tab === key ? 'white' : '#4b5563',
                boxShadow: tab === key ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none',
                backdropFilter: 'blur(10px)'
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <section style={{
            display: 'grid',
            gap: '24px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
          }}>
            <div style={{
              borderRadius: '16px',
              border: '1px solid rgba(229, 231, 235, 0.5)',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              padding: '24px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px'
              }}>
                <p style={{ fontSize: '14px', color: '#4b5563' }}>Referrals sent</p>
                <div style={{
                  height: '32px',
                  width: '32px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #cffafe 0%, #fed7aa 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    height: '16px',
                    width: '16px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #06b6d4 0%, #f97316 100%)'
                  }}></div>
                </div>
              </div>
              <p style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827' }}>12</p>
              <p style={{ fontSize: '12px', color: '#059669', marginTop: '4px' }}>+3 this week</p>
            </div>
            <div style={{
              borderRadius: '16px',
              border: '1px solid rgba(229, 231, 235, 0.5)',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              padding: '24px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px'
              }}>
                <p style={{ fontSize: '14px', color: '#4b5563' }}>Referrals received</p>
                <div style={{
                  height: '32px',
                  width: '32px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #fed7aa 0%, #cffafe 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    height: '16px',
                    width: '16px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f97316 0%, #06b6d4 100%)'
                  }}></div>
                </div>
              </div>
              <p style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827' }}>8</p>
              <p style={{ fontSize: '12px', color: '#059669', marginTop: '4px' }}>+1 this week</p>
            </div>
            <div style={{
              borderRadius: '16px',
              border: '1px solid rgba(229, 231, 235, 0.5)',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              padding: '24px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px'
              }}>
                <p style={{ fontSize: '14px', color: '#4b5563' }}>Trust Points</p>
                <div style={{
                  height: '32px',
                  width: '32px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #cffafe 0%, #fed7aa 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    height: '16px',
                    width: '16px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #06b6d4 0%, #f97316 100%)'
                  }}></div>
                </div>
              </div>
              <p style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827' }}>340</p>
              <p style={{ fontSize: '12px', color: '#059669', marginTop: '4px' }}>+25 this week</p>
            </div>
            
            <div style={{
              gridColumn: 'span 3',
              borderRadius: '16px',
              border: '1px solid rgba(229, 231, 235, 0.5)',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              padding: '24px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <ProfileCircles />
            </div>

            <div style={{
              gridColumn: 'span 2',
              borderRadius: '16px',
              border: '1px solid rgba(229, 231, 235, 0.5)',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              padding: '24px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>Getting started</h3>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                  <div style={{
                    display: 'flex',
                    height: '24px',
                    width: '24px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    background: '#dcfce7',
                    marginTop: '2px'
                  }}>
                    <div style={{ height: '8px', width: '8px', borderRadius: '50%', background: '#22c55e' }}></div>
                  </div>
                  <p style={{ fontSize: '14px', color: '#4b5563' }}>Complete your profile to help colleagues refer with confidence.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                  <div style={{
                    display: 'flex',
                    height: '24px',
                    width: '24px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    background: '#dcfce7',
                    marginTop: '2px'
                  }}>
                    <div style={{ height: '8px', width: '8px', borderRadius: '50%', background: '#22c55e' }}></div>
                  </div>
                  <p style={{ fontSize: '14px', color: '#4b5563' }}>Invite your circle to start sending and receiving referrals.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{
                    display: 'flex',
                    height: '24px',
                    width: '24px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    background: '#dcfce7',
                    marginTop: '2px'
                  }}>
                    <div style={{ height: '8px', width: '8px', borderRadius: '50%', background: '#22c55e' }}></div>
                  </div>
                  <p style={{ fontSize: '14px', color: '#4b5563' }}>Connect your calendar to enable direct booking.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Link href="/onboarding/practitioner" style={{
                  borderRadius: '12px',
                  background: 'linear-gradient(90deg, #06b6d4 0%, #0891b2 100%)',
                  padding: '10px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'white',
                  textDecoration: 'none',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.2s'
                }}>Complete profile</Link>
                <Link href="/network/invite" style={{
                  borderRadius: '12px',
                  border: '1px solid #d1d5db',
                  padding: '10px 16px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#111827',
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}>Invite colleagues</Link>
              </div>
            </div>

            <div style={{
              borderRadius: '16px',
              border: '1px solid rgba(229, 231, 235, 0.5)',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              padding: '24px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>Recent activity</h3>
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ height: '8px', width: '8px', borderRadius: '50%', background: '#22c55e', marginTop: '8px' }}></div>
                  <p style={{ fontSize: '14px', color: '#4b5563' }}>Referral accepted by Dr. Chen</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ height: '8px', width: '8px', borderRadius: '50%', background: '#06b6d4', marginTop: '8px' }}></div>
                  <p style={{ fontSize: '14px', color: '#4b5563' }}>New colleague joined your network</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ height: '8px', width: '8px', borderRadius: '50%', background: '#f97316', marginTop: '8px' }}></div>
                  <p style={{ fontSize: '14px', color: '#4b5563' }}>Outcome recorded for patient #1245</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {tab === 'referrals' && (
          <section style={{
            display: 'grid',
            gap: '24px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
          }}>
            <div style={{
              borderRadius: '16px',
              border: '1px solid rgba(229, 231, 235, 0.5)',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              padding: '24px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>Send a referral</h3>
              <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '24px' }}>Share context and preferred availability. Track outcomes automatically.</p>
              <div>
                <Link href="/referrals/send" style={{
                  display: 'inline-flex',
                  borderRadius: '12px',
                  background: 'linear-gradient(90deg, #06b6d4 0%, #0891b2 100%)',
                  padding: '10px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'white',
                  textDecoration: 'none',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.2s'
                }}>New referral</Link>
              </div>
            </div>
            <div style={{
              borderRadius: '16px',
              border: '1px solid rgba(229, 231, 235, 0.5)',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              padding: '24px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>Your recent referrals</h3>
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'rgba(249, 250, 251, 0.8)',
                  marginBottom: '12px'
                }}>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>To Dr. Nguyen</p>
                    <p style={{ fontSize: '12px', color: '#4b5563' }}>Patient referral</p>
                  </div>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    fontWeight: '500',
                    background: '#fef3c7',
                    color: '#92400e'
                  }}>Pending</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'rgba(249, 250, 251, 0.8)',
                  marginBottom: '12px'
                }}>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>From Dr. Patel</p>
                    <p style={{ fontSize: '12px', color: '#4b5563' }}>Consultation request</p>
                  </div>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    fontWeight: '500',
                    background: '#dcfce7',
                    color: '#166534'
                  }}>Booked</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'rgba(249, 250, 251, 0.8)'
                }}>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>To Dr. Rivera</p>
                    <p style={{ fontSize: '12px', color: '#4b5563' }}>Follow-up care</p>
                  </div>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    fontWeight: '500',
                    background: '#cffafe',
                    color: '#0891b2'
                  }}>Completed</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {tab === 'network' && (
          <section style={{
            display: 'grid',
            gap: '24px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
          }}>
            <div style={{
              borderRadius: '16px',
              border: '1px solid rgba(229, 231, 235, 0.5)',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              padding: '24px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>Your network</h3>
              <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '24px' }}>Build a circle you trust for fast, confident handoffs.</p>
              <div>
                <Link href="/network" style={{
                  display: 'inline-flex',
                  borderRadius: '12px',
                  border: '1px solid #d1d5db',
                  padding: '10px 16px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#111827',
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}>View network</Link>
              </div>
            </div>
            <div style={{
              borderRadius: '16px',
              border: '1px solid rgba(229, 231, 235, 0.5)',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              padding: '24px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>Invite colleagues</h3>
              <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '24px' }}>Earn Trust Points for each accepted invite.</p>
              <div>
                <Link href="/network/invite" style={{
                  display: 'inline-flex',
                  borderRadius: '12px',
                  background: 'linear-gradient(90deg, #06b6d4 0%, #0891b2 100%)',
                  padding: '10px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'white',
                  textDecoration: 'none',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.2s'
                }}>Invite</Link>
              </div>
            </div>
          </section>
        )}

        {tab === 'plans' && (
          <section style={{
            display: 'grid',
            gap: '24px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
          }}>
            <div style={{
              borderRadius: '16px',
              border: '1px solid rgba(229, 231, 235, 0.5)',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              padding: '24px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>Starter</h4>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>Free</p>
              <p style={{ color: '#4b5563', marginBottom: '24px' }}>Basics to get going</p>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '14px', color: '#4b5563' }}>
                  <div style={{ height: '8px', width: '8px', borderRadius: '50%', background: '#22c55e' }}></div>
                  Up to 10 referrals/month
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '14px', color: '#4b5563' }}>
                  <div style={{ height: '8px', width: '8px', borderRadius: '50%', background: '#22c55e' }}></div>
                  Basic scheduling
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#4b5563' }}>
                  <div style={{ height: '8px', width: '8px', borderRadius: '50%', background: '#22c55e' }}></div>
                  Trust Points tracking
                </div>
              </div>
              <button style={{
                width: '100%',
                borderRadius: '12px',
                border: '1px solid #d1d5db',
                padding: '10px 16px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#111827',
                background: 'rgba(255, 255, 255, 0.9)',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}>Choose</button>
            </div>
            <div style={{
              position: 'relative',
              borderRadius: '16px',
              border: '2px solid #06b6d4',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              padding: '24px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                borderRadius: '9999px',
                background: 'linear-gradient(90deg, #06b6d4 0%, #f97316 100%)',
                padding: '4px 12px',
                fontSize: '12px',
                fontWeight: '600',
                color: 'white'
              }}>Current</div>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>Pro</h4>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>$29<span style={{ fontSize: '14px', color: '#4b5563' }}>/month</span></p>
              <p style={{ color: '#4b5563', marginBottom: '24px' }}>For growing practices</p>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '14px', color: '#4b5563' }}>
                  <div style={{ height: '8px', width: '8px', borderRadius: '50%', background: '#22c55e' }}></div>
                  Unlimited referrals
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '14px', color: '#4b5563' }}>
                  <div style={{ height: '8px', width: '8px', borderRadius: '50%', background: '#22c55e' }}></div>
                  Advanced scheduling
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#4b5563' }}>
                  <div style={{ height: '8px', width: '8px', borderRadius: '50%', background: '#22c55e' }}></div>
                  Analytics & insights
                </div>
              </div>
              <button style={{
                width: '100%',
                borderRadius: '12px',
                background: 'linear-gradient(90deg, #06b6d4 0%, #0891b2 100%)',
                padding: '10px 16px',
                fontSize: '14px',
                fontWeight: '600',
                color: 'white',
                border: 'none',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}>Current Plan</button>
            </div>
            <div style={{
              borderRadius: '16px',
              border: '1px solid rgba(229, 231, 235, 0.5)',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              padding: '24px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>Team</h4>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>Custom</p>
              <p style={{ color: '#4b5563', marginBottom: '24px' }}>Clinics and groups</p>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '14px', color: '#4b5563' }}>
                  <div style={{ height: '8px', width: '8px', borderRadius: '50%', background: '#22c55e' }}></div>
                  Everything in Pro
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '14px', color: '#4b5563' }}>
                  <div style={{ height: '8px', width: '8px', borderRadius: '50%', background: '#22c55e' }}></div>
                  Team management
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#4b5563' }}>
                  <div style={{ height: '8px', width: '8px', borderRadius: '50%', background: '#22c55e' }}></div>
                  Custom integrations
                </div>
              </div>
              <button style={{
                width: '100%',
                borderRadius: '12px',
                border: '1px solid #d1d5db',
                padding: '10px 16px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#111827',
                background: 'rgba(255, 255, 255, 0.9)',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}>Contact sales</button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
