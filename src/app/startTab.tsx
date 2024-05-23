import React from 'react';
import { Button } from 'antd';
import Link from 'next/link';

export function StartTab() {
  return (
    <div className='flex flex-col gap-14'>
      <div className='flex flex-col gap-7'>
        <div>
          <h1 style={{ fontSize: '3rem' }} >One small click of you,</h1>
          <h1 style={{ fontSize: '3rem' }}> one giant leap for AI & humankind.</h1>
        </div>
        <h3 style={{ fontSize: '1.5rem' }}>Be a judge of AI, and get your reward.</h3>
      </div>
      <Link href="/datahub">Click here to start!</Link>
    </div>
  );
}
