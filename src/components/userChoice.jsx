import { useState } from "react";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import rockAnimation from "../assets/rock.json";
import paperAnimation from "../assets/paper.json";
import scissorsAnimation from "../assets/scissor.json";

function UserChoice() {
  const [selectedChoice, setSelectedChoice] = useState(null);
  const navigate = useNavigate();

  const style = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
      margin: "3rem",
      padding: "4rem 3rem",
      borderRadius: "10px",
      backgroundColor: "#f0f0f0",
      fontFamily: "Arial, sans-serif",
    },
    choices: {
      display: "flex",
      gap: "2rem",
      marginTop: "2rem",
      marginBottom: "2rem",
    },
    choice: {
      cursor: "pointer",
      padding: "1rem",
      textAlign: "center",
      borderRadius: "10px",
      transition: "transform 0.2s",
      border: "2px solid #00000029",
      boxShadow: "0 0 15px 0 rgba(0, 0, 0, 0.1)",
    },
    selected: {
      border: "2px solid #000",
      transform: "scale(1.05)",
    },
    button: {
      backgroundColor: "#000",
      color: "#fff",
      fontSize: "1rem",
      fontWeight: "bold",
      padding: "1rem 2rem",
      borderRadius: "5px",
      cursor: "pointer",
      boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
      "&:hover": {
        backgroundColor: "#fff",
        color: "#000",
      },
    },
  };

  const handleChoice = (choice) => {
    setSelectedChoice(choice);
  };

  const handleSubmit = () => {
    if (selectedChoice) {
      // Save the choice to localStorage or state management solution
      localStorage.setItem("userChoice", selectedChoice);
      // Navigate to result page
      navigate("/result");
    }
  };

  return (
    <div style={style.container}>
      <h1>Choose your weapon</h1>
      <div style={style.choices}>
        {[
          { name: "rock", animation: rockAnimation },
          { name: "paper", animation: paperAnimation },
          { name: "scissors", animation: scissorsAnimation },
        ].map((item) => (
          <div
            key={item.name}
            style={{
              ...style.choice,
              ...(selectedChoice === item.name ? style.selected : {}),
            }}
            onClick={() => handleChoice(item.name)}
          >
            <Lottie
              animationData={item.animation}
              loop={true}
              style={{ width: 250, height: 250 }}
            />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <button
        style={style.button}
        onClick={handleSubmit}
        disabled={!selectedChoice}
      >
        See Result
      </button>
    </div>
  );
}

export default UserChoice;
