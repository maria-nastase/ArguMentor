"use client";
import GPTInput from './components/GPTInput';
import AppStateProvider from './components/AppStateContext';
import ResponseLog from './components/ResponseLog';
import { useState } from 'react';
import BGImage from './components/BGImage';
import AudioRecorder from "./components/AudioRecorder";


export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <AppStateProvider>
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1>Debate Coach</h1>
          <ResponseLog></ResponseLog>
          <GPTInput></GPTInput>
          <div className="button">
            <AudioRecorder />
            </div>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <a href="http://www.freepik.com">Designed by pch.vector / Freepik</a>
        </footer>
        <BGImage></BGImage>
      </AppStateProvider>
    </div >
  );
}