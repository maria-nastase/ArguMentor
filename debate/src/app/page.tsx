"use client";
import AppStateProvider from './components/AppStateContext';
import ResponseLog from './components/ResponseLog';
import BGImage from './components/BGImage';


export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <AppStateProvider>
      <h1 className='text-9xl'>Debate Coach</h1>
        <main className="flex flex-col gap-8 w-full row-start-2 items-center sm:items-start">
          <ResponseLog></ResponseLog>            
        <BGImage></BGImage>
        </main>
        <footer className="w-full bottom-0">
          <a href="http://www.freepik.com">Designed by pch.vector / Freepik</a>
        </footer>
      </AppStateProvider>
    </div >
  );
}