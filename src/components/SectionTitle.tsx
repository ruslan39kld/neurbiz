import React from 'react';

const SectionTitle = ({ children }: { children: string }) => (
  <h2 style={{
    fontFamily: 'Orbitron, monospace',
    fontSize: '32px',
    fontWeight: 700,
    color: 'var(--text-main)',
    marginBottom: '8px'
  }}>
    <span style={{ color: '#FF6B2B' }}>// </span>
    {children}
  </h2>
);

export default SectionTitle;
