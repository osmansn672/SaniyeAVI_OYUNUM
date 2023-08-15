// src/components/Game.js
import React, { useState, useEffect } from "react";
import "./Game.css";

const Game = () => {
  const maxRounds = 3;
  const maxDuration = 5; // saniye
  const [round, setRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(maxDuration);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [scores, setScores] = useState([]);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    if (round <= maxRounds) {
      startRound();
    } else {
      endGame();
    }
  }, [round]);

  useEffect(() => {
    if (timeLeft > 0 && !isGameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isGameOver) {
      endRound();
    }
  }, [timeLeft, isGameOver]);

  useEffect(() => {
    const sum = scores.reduce((acc, score) => acc + score, 0);
    setTotalScore(sum);
  }, [scores]);

  const startRound = () => {
    setTimeLeft(maxDuration);
    setButtonPosition({
      top: Math.random() * (window.innerHeight - 50),
      left: Math.random() * (window.innerWidth - 100)
    });
  };

  const endRound = () => {
    setScores((prevScores) => [...prevScores, timeLeft]);
    setRound((prevRound) => prevRound + 1);
  };

  const endGame = () => {
    setIsGameOver(true);
  };

  const restartGame = () => {
    setRound(1);
    setTimeLeft(maxDuration);
    setIsGameOver(false);
    setScores([]);
    setTotalScore(0);
  };

  return (
    <div className="game-container">
      {isGameOver ? (
        <div className="score-container">
          <h2>Oyun Bitti</h2>
          <p>Puanlar: {scores.join(", ")}</p>
          <p>Toplam Skor: {totalScore}</p>
          <button onClick={restartGame}>Yeniden Başlat</button>
        </div>
      ) : (
        <div className="round-container">
          <h2>Round {round}</h2>
          <p>Kalan Süre: {timeLeft} saniye</p>
          <button
            style={{ top: buttonPosition.top, left: buttonPosition.left }}
            onClick={endRound}
          >
            Tıkla!
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;
