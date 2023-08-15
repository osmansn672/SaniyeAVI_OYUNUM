 // src/components/Game.js
import React, { useState, useEffect } from "react";
import "./Game.css";

const Game = () => {
  const totalRounds = 8;
  const maxDuration = 5; // saniye
  const [round, setRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(maxDuration);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [scores, setScores] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("#f0f0f0");

  useEffect(() => {
    if (round <= totalRounds) {
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

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const startRound = () => {
    setTimeLeft(maxDuration);
    setButtonPosition({
      top: Math.random() * (window.innerHeight - 50),
      left: Math.random() * (window.innerWidth - 100)
    });
    setBackgroundColor(getRandomColor());
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
    setBackgroundColor("#f0f0f0");
  };

  return (
    <div className="game-container" style={{ backgroundColor }}>
      <div className="score-bar">
        <p>Toplam Skor: {totalScore}</p>
      </div>
      {isGameOver ? (
        <div className="score-container">
          <h2>Oyun Bitti</h2>
          <p>Puanlar: {scores.join(", ")}</p>
          <button onClick={restartGame}>Yeniden Başlat</button>
        </div>
      ) : (
        <div className="round-container">
          <h2>Raunt {round}</h2>
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
