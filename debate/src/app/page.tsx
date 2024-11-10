"use client";
import AppStateProvider from './components/AppStateContext';
import ResponseLog from './components/ResponseLog';
import BGImage from './components/BGImage';
import AudioPlayer from './components/AudioPlayer';
import AudioComponent from './components/AudioComponent';
import GPTInput from './components/GPTInput';


export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <AppStateProvider>
      <h1 className='text-7xl'><b>ArguMentor</b></h1>
        <main className="flex flex-col gap-8 w-full row-start-2 items-center sm:items-start h-20">
          <ResponseLog></ResponseLog>            
        
      
<div className='relative w-full h-[10em]'> <BGImage></BGImage><footer className="absolute bottom-0 right-0 left-40 text-xs w-full bottom-0">
          <a href="http://www.freepik.com">Designed by pch.vector / Freepik</a>
        </footer></div>
        </main>
       
      </AppStateProvider>
    </div >
  );
}