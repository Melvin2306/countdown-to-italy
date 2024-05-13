"use client";
import React, { useState, useEffect } from "react";

export default function Home() {
  // Set the target date and time for countdown
  const targetDate: any = new Date("2024-05-23T08:15:00");

  // State to store the countdown
  const [countdown, setCountdown] = useState("");
  const [germanGDP, setGermanGDP] = useState("");
  const [usBurgers, setUsBurgers] = useState("");

  const GermanGPDperH = 470433789.95;
  const USBurgersperH = 5707762.56;

  // Helper function to format the numbers
  const formatNumber = (number: any) => {
    return new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(
      number
    );
  };

  useEffect(() => {
    // Update the countdown and calculations by calculating the time difference
    const interval = setInterval(() => {
      const now: any = new Date();
      const difference = targetDate - now;

      // Calculate time components
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const totalHours = days * 24 + hours; // total hours until target date
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      const totalSeconds = difference / 1000; // total seconds until target date

      // Update the countdown state
      setCountdown(
        `${days} Tage ${hours} Stunden ${minutes} Minuten ${seconds} Sekunden`
      );

      // Calculate and update the German GDP and US Burgers per second, rounded down and formatted
      setGermanGDP(
        formatNumber(Math.floor((GermanGPDperH / 3600) * totalSeconds))
      );
      setUsBurgers(
        formatNumber(Math.floor((USBurgersperH / 3600) * totalSeconds))
      );
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <main className="flex flex-row items-center justify-between p-24">
      <div className="z-10 gap-3 w-full max-w-5xl items-center flex flex-row justify-between font-mono text-sm lg:flex">
        {/* Display the countdown */}
        <div className="fixed left-0 top-0 w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <p>Zeit bis Italien {countdown}</p>
        </div>

        {/* Display the German GDP per second */}
        <div className="fixed left-0 bottom-0 flex w-full justify-center border-t border-gray-300 bg-gradient-to-t from-zinc-200 pb-8 pt-6 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <p>
            So viel GDP wird in Deutschland bis dahin noch erzeugt: {germanGDP}{" "}
            €
          </p>
        </div>

        {/* Display the US Burgers per second */}
        <div className="fixed right-0 bottom-0 flex w-full justify-center border-t border-gray-300 bg-gradient-to-t from-zinc-200 pb-8 pt-6 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <p>
            So viele Burger werden in den USA bis dahin noch gegessen:{" "}
            {usBurgers}
          </p>
        </div>
      </div>
    </main>
  );
}
