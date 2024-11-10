"use client";
import Image from "next/image";
import React, { useState } from 'react';

export default function Home() {

  const [inputText, setInputText] = useState('');

  const handleChange = (event) => {
    setInputText(event.target.value);
  };
  const [response, setResponse] = useState<string | null>(null);


  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputText.trim()) {
      try {
        const res = await fetch('/api/gpt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: inputText }),
        });

        const data = await res.json();
        setResponse(data.response);
      } catch (error) {
        console.error('Error posting data:', error);
      }
    }
  };

  return (      
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <input 
      type="text" 
      value={inputText} 
      onChange={handleChange} 
      onKeyDown={handleKeyDown} 
      placeholder="Type something here" 
    />
    <p>You typed: {inputText}</p>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
