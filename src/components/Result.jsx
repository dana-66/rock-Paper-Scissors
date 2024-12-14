// src/components/Result.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import rockAnimation from "../assets/rock.json";
import paperAnimation from "../assets/paper.json";
import scissorsAnimation from "../assets/scissor.json";

function Result() {
  const navigate = useNavigate();
  const [result, setResult] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [score, setScore] = useState(() => 
    JSON.parse(localStorage.getItem("score")) || { wins: 0, losses: 0, ties: 0 }
  );

  const animations = {
    rock: rockAnimation,
    paper: paperAnimation,
    scissors: scissorsAnimation,
  };

  const style = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",   
      margin: "3rem",
      padding: "2rem 3rem",
      borderRadius: "10px",
      backgroundColor: "#f0f0f0",
      fontFamily: "Arial, sans-serif",
    },
    choices: {
      display: "flex",
      gap: "4rem",
      marginTop: "2rem",
    //   marginBottom: "2rem",
      alignItems: "center",
    },
    choice: {
      padding: "0.5rem",
      textAlign: "center",
      borderRadius: "10px",
      border: "2px solid #00000029",
      boxShadow: "0 0 15px 0 rgba(0, 0, 0, 0.1)",
    },
    buttons: {
      display: "flex",
      gap: "1rem",
      marginTop: "1.5rem",
    },
    button: {
      backgroundColor: "#000",
      color: "#fff",
      fontSize: "1rem",
      fontWeight: "bold",
      padding: "1rem 2rem",
      borderRadius: "5px",
      cursor: "pointer",
      border: "none",
      boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
    },
    resetButton: {
      backgroundColor: "#ff4444",
      color: "#fff",
      fontSize: "1rem",
      fontWeight: "bold",
      padding: "1rem 2rem",
      borderRadius: "5px",
      cursor: "pointer",
      border: "none",
      boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
    },
    result: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginTop: "2rem",
    },
    score: {
      fontSize: "1.2rem",
      marginTop: "1rem",
    },
  };

  useEffect(() => {
    const userChoice = localStorage.getItem("userChoice");
    if (!userChoice) {
      navigate("/user-choice");
      return;
    }
    //computer choice
    const choices = ["rock", "paper", "scissors"];
    const computerSelection = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(computerSelection);

    // Determine winner
    const determineWinner = (user, computer) => {
      if (user === computer) return "tie";
      if (
        (user === "rock" && computer === "scissors") ||
        (user === "paper" && computer === "rock") ||
        (user === "scissors" && computer === "paper")
      ) {
        return "win";
      }
      return "lose";
      
    };

    const gameResult = determineWinner(userChoice, computerSelection);
    setResult(gameResult);

    // Update score
    const newScore = { ...score };
    if (gameResult === "win") newScore.wins += 1;
    else if (gameResult === "lose") newScore.losses += 1;
    else newScore.ties += 1;
    
    setScore(newScore);
    localStorage.setItem("score", JSON.stringify(newScore));
  }, []);

  const handlePlayAgain = () => {
    localStorage.removeItem("userChoice");
    navigate("/user-choice");
  };

  const handleHome = () => {
    // Reset score
    const resetScore = { wins: 0, losses: 0, ties: 0 };
    setScore(resetScore);
    localStorage.setItem("score", JSON.stringify(resetScore));
    
    // Clear user choice and navigate
    localStorage.removeItem("userChoice");
    navigate("/");
  };

  const handleResetScore = () => {
    const resetScore = { wins: 0, losses: 0, ties: 0 };
    setScore(resetScore);
    localStorage.setItem("score", JSON.stringify(resetScore));
  };

  return (
    <div style={style.container}>
      <h1>Result</h1>
      <div style={style.choices}>
        <div style={style.choice}>
          <h2>Your Choice</h2>
          <Lottie
            animationData={animations[localStorage.getItem("userChoice")]}
            loop={true}
            style={{ width: 200, height: 200 }}
          />
          <p>{localStorage.getItem("userChoice")}</p>
        </div>
        <h2>VS</h2>
        <div style={style.choice}>
          <h2>Computer&apos;s Choice</h2>
          <Lottie
            animationData={animations[computerChoice]}
            loop={true}
            style={{ width: 200, height: 200 }}
          />
          <p>{computerChoice}</p>
        </div>
      </div>
      <div style={style.result}>
        You {result}!
      </div>
      <div style={style.score}>
        Score: Wins: {score.wins} | Losses: {score.losses} | Ties: {score.ties}
      </div>
      <div style={style.buttons}>
        <button style={style.button} onClick={handlePlayAgain}>
          Play Again
        </button>
        <button style={style.button} onClick={handleHome}>
          Home
        </button>
        <button style={style.resetButton} onClick={handleResetScore}>
          Reset Score
        </button>
      </div>
    </div>
  );
}

export default Result;