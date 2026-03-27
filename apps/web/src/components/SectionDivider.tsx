import React from 'react';

export default function SectionDivider() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        width: '50%',
        margin: 'auto',
        marginTop: '20px',
        marginBottom: '20px',
      }}
    >
      <div style={{ flex: 1, height: '1px', backgroundColor: ' #c5b3a5' }}></div>
      <div
        style={{
          width: '8px',
          height: '8px',
          backgroundColor: '#c5b3a5',
          transform: 'rotate(45deg)',
        }}
      ></div>
      <div style={{ flex: 1, height: '1px', backgroundColor: ' #c5b3a5' }}></div>
    </div>
  );
}
