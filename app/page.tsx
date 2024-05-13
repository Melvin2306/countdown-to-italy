"use client";
import React, { useState, useEffect } from "react";

export default function Home() {
  // Set the target date and time for countdown
  const targetDate: any = new Date("2024-05-23T08:15:00");

  // State to store the countdown
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    // Update the countdown by calculating the time difference
    const interval = setInterval(() => {
      const now: any = new Date();
      const difference: any = targetDate - now;

      // Calculate time components
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      // Update the countdown state
      setCountdown(
        `${days} Tage ${hours} Stunden ${minutes} Minuten ${seconds} Sekunden`
      );
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          {/* Display the countdown */}
          Zeit bis Italien {countdown}
        </p>
      </div>
    </main>
  );
}
