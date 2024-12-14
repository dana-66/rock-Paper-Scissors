import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../assets/RockPaperScissors.json";

const Intro = () => {
  const navigate = useNavigate();
  
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const style = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
      margin: "3rem ",
      padding: "1rem 3rem",
      borderRadius: "10px",
      backgroundColor: "#f0f0f0",
      fontFamily: "Arial, sans-serif",
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
    h1: {
      fontSize: "5.6rem",
      fontWeight: "bold",
      marginBottom: "1rem",
      textShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    },
  };
  
  const handleNext = () => {
    navigate('/user-choice');
  };

  return (
    <div style={style.container}>
      <div style={style.txt}>
        <h1 style={style.h1}>Welcome to Rock-Paper-Scissors!</h1>
        <button onClick={handleNext} style={style.button}>
          Lets Go
        </button>
      </div>
      <Lottie
        options={defaultOptions}
        height={600}
        width={900}
        color="black"
        stroke="black"
      />
    </div>
  );
};

export default Intro;
