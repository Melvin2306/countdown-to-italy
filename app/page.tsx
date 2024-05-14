"use client";
import React, { useState, useEffect } from "react";

export default function Home() {
  // Set the target date and time for countdown
  const targetDate: any = new Date("2024-05-23T08:15:00");

  // State to store the countdown with a skeleton placeholder
  const [countdown, setCountdown] = useState("Lädt...");
  const [germanGDP, setGermanGDP] = useState("Berechnung...");
  const [usBurgers, setUsBurgers] = useState("Berechnung...");
  const [burgerGeld, setBurgerGeld] = useState("Berechnung...");
  const [zinoWasser, setZinoWasser] = useState("Berechnung...");
  const [mundMWasser, setMundMWasser] = useState("Berechnung...");

  const GermanGPDperH = 470433789.95;
  const USBurgersperH = 5707762.56;
  const BurgerGeldperH = 3025114.155;
  const ZinoWasserproH = 0.0725;
  const MundMWasserproH = 0.000114375;

  // Helper function to format the numbers
  const formatNumberSmall = (number: any) => {
    return new Intl.NumberFormat("de-DE", {
      maximumFractionDigits: 4, // Allow two decimal places
      minimumFractionDigits: 4, // Ensure that there are always two decimal places
    }).format(number);
  };

  const formatNumber = (number: any) => {
    return new Intl.NumberFormat("de-DE", {
      maximumFractionDigits: 0, // Allow two decimal places
      minimumFractionDigits: 0, // Ensure that there are always two decimal places
    }).format(number);
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
      if (difference > 0) {
        setCountdown(
          `${days} Tage ${hours} Stunden ${minutes} Minuten ${seconds} Sekunden`
        );
      } else {
        setCountdown("Zeit abgelaufen");
      }

      // Calculate and update the German GDP and US Burgers per second, rounded down and formatted
      if (difference > 0) {
        setGermanGDP(formatNumber((GermanGPDperH / 3600) * totalSeconds));
        setUsBurgers(formatNumber((USBurgersperH / 3600) * totalSeconds));
        setBurgerGeld(formatNumber((BurgerGeldperH / 3600) * totalSeconds));
        setZinoWasser(
          formatNumberSmall((ZinoWasserproH / 3600) * totalSeconds)
        );
        setMundMWasser(
          formatNumberSmall((MundMWasserproH / 3600) * totalSeconds)
        );
      } else {
        setGermanGDP("Berechnung abgeschlossen");
        setUsBurgers("Berechnung abgeschlossen");
        setBurgerGeld("Berechnung abgeschlossen");
        setZinoWasser("Berechnung abgeschlossen");
        setMundMWasser("Berechnung abgeschlossen");
      }
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <>
      <style>
        {`
          @media (max-width: 550px) {
            .responsive-text {
              font-size: text-sm;
            }
            .responsive-padding {
              padding-left: 8px;
              padding-right: 8px;
            }
          }
        `}
      </style>
      <main className="grid grid-cols-3 gap-4 items-center justify-between p-24 responsive-padding">
        <div className="responsive-text">
          <p>Zeit bis Italien </p>
        </div>
        <div className="col-span-2 responsive-text">
          <p>{countdown}</p>
        </div>
        <div className="responsive-text">
          <p>So viel GDP wird in Deutschland bis dahin noch erzeugt:</p>
        </div>
        <div className="col-span-2 responsive-text">
          <p> {germanGDP} €</p>
        </div>
        <div className="responsive-text">
          <p>So viele Burger werden in den USA bis dahin noch gegessen:</p>
        </div>
        <div className="col-span-2 responsive-text">
          <p> {usBurgers}</p>
        </div>
        <div className="responsive-text">
          <p>So viel Bürgergeld wird bis dahin ausgezahlt:</p>
        </div>
        <div className="col-span-2 responsive-text">
          <p> {burgerGeld} €</p>
        </div>
        <div className="responsive-text">
          <p>So viel Geld wird Zino noch für Wasser ausgeben:</p>
        </div>
        <div className="col-span-2 responsive-text">
          <p> {zinoWasser} €</p>
        </div>
        <div className="responsive-text">
          <p>So viel Geld werden Markus und Melvin noch für Wasser ausgeben:</p>
        </div>
        <div className="col-span-2 responsive-text">
          <p> {mundMWasser} €</p>
        </div>
      </main>
    </>
  );
}
