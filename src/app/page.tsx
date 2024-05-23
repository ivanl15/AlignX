"use client"

import { useState } from 'react';
import { StartTab } from './startTab';
import { Leaderboard } from './learderboard';

export default function Home() {
  enum Tabs {
    Start,
    Leaderboard,
  }
  const [tab, setTab] = useState<Tabs>(Tabs.Start);
  
  return (
    <main className="flex min-h-screen flex-col items-center gap-20 p-12">
      <div className="z-10 w-full max-w-6xl items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-row justify-start items-end gap-20 w-full">
          <h1 className="text-4xl font-bold">AlignX</h1>
          <div className="flex flex-row justify-start gap-10 p-1">
            <button onClick={()=>{setTab(Tabs.Start)}}> Start </button>
            <button onClick={()=>{setTab(Tabs.Leaderboard)}}> Leaderboard </button>
          </div>
        </div>
        <div>
          <w3m-button />
        </div>
      </div>

      <div className='w-full p-10 '>
        {tab === Tabs.Start && <StartTab />}
        {tab === Tabs.Leaderboard && <Leaderboard />}
      </div>
    </main>
  );
}
