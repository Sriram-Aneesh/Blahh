import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export default function Home() {
  const defaultName = "Arya 💕";
  const [name, setName] = useState(defaultName);

  const [noPos, setNoPos] = useState({ top: "55%", left: "55%" });
  const [message, setMessage] = useState("");
  const [yesSize, setYesSize] = useState(1);
  const [stage, setStage] = useState("ask"); // ask | loading | yes

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const n = params.get("name");
    if (n) setName(n);
  }, []);

  const pop = () => {
    const audio = new Audio(
      "https://www.myinstants.com/media/sounds/pop.mp3"
    );
    audio.volume = 0.4;
    audio.play();
  };

  const moveNo = () => {
    pop();
    setMessage("❌ No, wrong answer 😌 Try again.");
    setYesSize((s) => s + 0.18);
    setNoPos({
      top: Math.random() * 80 + "%",
      left: Math.random() * 80 + "%",
    });
  };

  const handleYes = () => {
    pop();
    setStage("loading");
    setTimeout(() => {
      setStage("yes");
      confetti({
        particleCount: 300,
        spread: 140,
        origin: { y: 0.6 },
      });
    }, 2200);
  };

  return (
    <div className="container">
      <div className="hearts" />

      {stage === "ask" && (
        <>
          <h1>💌 Will you be my Valentine, {name}?</h1>

          <button
            className="yes"
            style={{ transform: scale(${yesSize}) }}
            onClick={handleYes}
          >
            YES 💖
          </button>

          <button
            className="no"
            style={{ top: noPos.top, left: noPos.left }}
            onMouseEnter={moveNo}
            onClick={moveNo}
          >
            NO
          </button>

          {message && <p className="msg">{message}</p>}
        </>
      )}

      {stage === "loading" && (
        <h1 className="loading">⏳ Processing your answer...</h1>
      )}

      {stage === "yes" && (
        <h1 className="success">
          🎉 Congratulations {name}! 💕
          <br />
          You are officially my Valentine 😘
          <br />
          No refunds. No returns.
          <br />
          Forever locked in 🔒💖
        </h1>
      )}

      <style jsx>{`
        .container {
          height: 100vh;
          background: linear-gradient(135deg, #ff9a9e, #fad0c4);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          font-family: "Segoe UI", sans-serif;
          text-align: center;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 2rem;
        }

        .yes {
          padding: 1rem 2.8rem;
          font-size: 1.3rem;
          background: #ff4d6d;
          color: white;
          border: none;
          border-radius: 16px;
          cursor: pointer;
          z-index: 2;
          transition: transform 0.2s;
        }

        .no {
          position: absolute;
          padding: 1rem 2.5rem;
          font-size: 1.2rem;
          background: #adb5bd;
          color: white;
          border: none;
          border-radius: 16px;
          cursor: pointer;
          transition: 0.15s;
        }

        .msg {
          margin-top: 1rem;
          font-weight: bold;
          color: #6a040f;
        }

        .success {
          font-size: 2.6rem;
          color: #6a040f;
          line-height: 1.4;
        }

        .loading {
          font-size: 2.3rem;
          animation: pulse 1.2s infinite;
        }

        @keyframes pulse {
          0% { opacity: 0.4; }
          50% { opacity: 1; }
          100% { opacity: 0.4; }
        }

        .hearts::before,
        .hearts::after {
          content: "💖 💕 💗 💓 💞";
          position: absolute;
          width: 100%;
          height: 200%;
          animation: float 12s linear infinite;
          font-size: 2rem;
          opacity: 0.35;
        }

        .hearts::after {
          animation-delay: -6s;
        }

        @keyframes float {
          from { transform: translateY(100%); }
          to { transform: translateY(-100%); }
        }

        @media (max-width: 600px) {
          h1 { font-size: 2rem; }
        }
      `}</style>
    </div>
  );
}