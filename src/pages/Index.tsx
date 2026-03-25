import { useState, useEffect } from "react";

type Page = "welcome" | "guess" | "result";
type Choice = "boy" | "girl" | null;

function FloatingEmoji({ emoji, style }: { emoji: string; style: React.CSSProperties }) {
  return (
    <div
      className="absolute select-none pointer-events-none animate-float"
      style={{ fontSize: "2rem", opacity: 0.35, ...style }}
    >
      {emoji}
    </div>
  );
}

function ConfettiPiece({ index }: { index: number }) {
  const colors = ["#FF6FB0", "#5EB8FF", "#FFB3D1", "#A8D8FF", "#FF91C2", "#7EC8FF", "#FFD6E8"];
  const color = colors[index % colors.length];
  const left = (index * 37 + 13) % 100;
  const duration = 2.5 + (index % 25) / 10;
  const delay = (index % 20) / 10;
  const size = 6 + (index % 10);
  const isCircle = index % 2 === 0;

  return (
    <div
      className="confetti-piece"
      style={{
        left: `${left}%`,
        top: `-20px`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        borderRadius: isCircle ? "50%" : "2px",
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        zIndex: 1000,
      }}
    />
  );
}

function WelcomePage({ onNext }: { onNext: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-10"
      style={{ background: "linear-gradient(160deg, #FFF0F7 0%, #F0F7FF 60%, #FFF5FB 100%)" }}
    >
      <FloatingEmoji emoji="🎈" style={{ top: "6%", left: "4%", animationDelay: "0s" }} />
      <FloatingEmoji emoji="⭐" style={{ top: "12%", right: "7%", animationDelay: "0.6s" }} />
      <FloatingEmoji emoji="🌸" style={{ top: "42%", left: "2%", animationDelay: "1.1s" }} />
      <FloatingEmoji emoji="✨" style={{ bottom: "22%", right: "4%", animationDelay: "1.4s" }} />
      <FloatingEmoji emoji="🎀" style={{ bottom: "8%", left: "8%", animationDelay: "0.8s" }} />
      <FloatingEmoji emoji="💙" style={{ top: "68%", right: "3%", animationDelay: "0.3s" }} />
      <FloatingEmoji emoji="🍭" style={{ top: "28%", right: "2%", animationDelay: "1.7s" }} />

      <div
        className={`text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="text-7xl mb-4 animate-wiggle">🎉</div>

        <h1 className="font-display text-5xl md:text-7xl mb-3 shimmer-text leading-tight">
          Гендер Пати!
        </h1>

        <p className="text-xl md:text-2xl font-bold text-gray-500 mb-1">
          Добро пожаловать на самое
        </p>
        <p className="text-xl md:text-2xl font-bold mb-8" style={{ color: "#FF6FB0" }}>
          🌟 интригующее событие года 🌟
        </p>

        <div
          className="rounded-3xl p-6 mb-8 max-w-sm mx-auto shadow-lg border"
          style={{ background: "rgba(255,255,255,0.75)", borderColor: "#FFD6E8", backdropFilter: "blur(8px)" }}
        >
          <p className="text-gray-700 text-lg font-semibold leading-relaxed">
            Скоро мы узнаем, кто же придёт в этот мир —{" "}
            <span style={{ color: "#5EB8FF" }}>маленький рыцарь 💙</span> или{" "}
            <span style={{ color: "#FF6FB0" }}>принцесса 🌸</span>
          </p>
          <p className="text-gray-400 text-base mt-3">А пока — сделай свою ставку! 😄</p>
        </div>

        <button
          onClick={onNext}
          className="btn-main font-display text-white text-2xl px-12 py-5 rounded-full shadow-2xl animate-pulse-glow"
          style={{ background: "linear-gradient(135deg, #FF6FB0, #5EB8FF)" }}
        >
          Угадать! 🎯
        </button>
      </div>
    </div>
  );
}

function GuessPage({ onChoice }: { onChoice: (c: "boy" | "girl") => void }) {
  const [selected, setSelected] = useState<Choice>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const handleChoice = (c: "boy" | "girl") => {
    if (selected) return;
    setSelected(c);
    setTimeout(() => onChoice(c), 800);
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-10"
      style={{ background: "linear-gradient(160deg, #F0F7FF 0%, #FFF0F7 60%, #F5F0FF 100%)" }}
    >
      <FloatingEmoji emoji="🎊" style={{ top: "5%", left: "6%", animationDelay: "0.2s" }} />
      <FloatingEmoji emoji="💕" style={{ top: "10%", right: "5%", animationDelay: "0.9s" }} />
      <FloatingEmoji emoji="🌟" style={{ bottom: "28%", left: "3%", animationDelay: "0.4s" }} />
      <FloatingEmoji emoji="🦋" style={{ bottom: "12%", right: "6%", animationDelay: "1.2s" }} />

      <div
        className={`text-center mb-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="text-5xl mb-3">🤔</div>
        <h2 className="font-display text-4xl md:text-5xl mb-2" style={{ color: "#FF6FB0" }}>
          Как думаешь?
        </h2>
        <p className="text-gray-500 text-lg font-semibold">Нажми на свой вариант!</p>
      </div>

      <div className={`flex flex-col sm:flex-row gap-6 w-full max-w-xl transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* ДЕВОЧКА */}
        <div
          className={`card-choice flex-1 rounded-3xl p-8 text-center shadow-xl border-4 transition-all duration-300 ${
            selected === "girl"
              ? "scale-105"
              : selected === "boy"
              ? "opacity-40"
              : ""
          }`}
          style={
            selected === "girl"
              ? { background: "linear-gradient(135deg, #FFF0F7, #FFD6EC)", borderColor: "#FF6FB0" }
              : { background: "white", borderColor: "#FFB3D1" }
          }
          onClick={() => handleChoice("girl")}
        >
          <div className="text-6xl mb-4">🌸</div>
          <h3 className="font-display text-2xl mb-2" style={{ color: "#FF6FB0" }}>
            Девочка
          </h3>
          <p className="text-gray-400 font-semibold text-sm">Принцесса 👑</p>
          {selected === "girl" && <div className="mt-4 text-3xl animate-bounce-in">✅</div>}
        </div>

        {/* МАЛЬЧИК */}
        <div
          className={`card-choice flex-1 rounded-3xl p-8 text-center shadow-xl border-4 transition-all duration-300 ${
            selected === "boy"
              ? "scale-105"
              : selected === "girl"
              ? "opacity-40"
              : ""
          }`}
          style={
            selected === "boy"
              ? { background: "linear-gradient(135deg, #F0F7FF, #D6EEFF)", borderColor: "#5EB8FF" }
              : { background: "white", borderColor: "#A8D8FF" }
          }
          onClick={() => handleChoice("boy")}
        >
          <div className="text-6xl mb-4">⚡</div>
          <h3 className="font-display text-2xl mb-2" style={{ color: "#5EB8FF" }}>
            Мальчик
          </h3>
          <p className="text-gray-400 font-semibold text-sm">Рыцарь 🛡️</p>
          {selected === "boy" && <div className="mt-4 text-3xl animate-bounce-in">✅</div>}
        </div>
      </div>
    </div>
  );
}

function ResultPage({ choice }: { choice: "boy" | "girl" | null }) {
  const [visible, setVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    setTimeout(() => setShowConfetti(true), 400);
  }, []);

  const isCorrect = choice === "girl";

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-10"
      style={{ background: "linear-gradient(160deg, #FFF0F7 0%, #FFE4F3 50%, #FFF0F7 100%)" }}
    >
      {showConfetti && Array.from({ length: 60 }).map((_, i) => <ConfettiPiece key={i} index={i} />)}

      <FloatingEmoji emoji="🌸" style={{ top: "6%", left: "4%", animationDelay: "0s" }} />
      <FloatingEmoji emoji="💕" style={{ top: "10%", right: "6%", animationDelay: "0.5s" }} />
      <FloatingEmoji emoji="🎀" style={{ bottom: "20%", left: "3%", animationDelay: "1s" }} />
      <FloatingEmoji emoji="✨" style={{ bottom: "10%", right: "5%", animationDelay: "0.8s" }} />
      <FloatingEmoji emoji="👑" style={{ top: "45%", right: "2%", animationDelay: "1.3s" }} />
      <FloatingEmoji emoji="🦋" style={{ top: "38%", left: "2%", animationDelay: "0.4s" }} />

      <div
        className={`text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="text-8xl mb-4 animate-wiggle">🎀</div>

        <h1 className="font-display text-5xl md:text-7xl mb-4 leading-tight" style={{ color: "#FF6FB0" }}>
          Это девочка!
        </h1>

        <div
          className="rounded-3xl p-6 mb-6 max-w-sm mx-auto shadow-lg border"
          style={{ background: "rgba(255,255,255,0.8)", borderColor: "#FFD6E8", backdropFilter: "blur(8px)" }}
        >
          <div className="text-4xl mb-3">🌸👑🌸</div>
          <p className="text-gray-700 text-lg font-semibold leading-relaxed">
            Маленькая принцесса уже спешит к нам!
          </p>
          <p className="text-gray-400 text-base mt-2">
            Скоро весь мир узнает об этом чуде 💕
          </p>
        </div>

        {choice !== null && (
          <div
            className={`rounded-2xl px-6 py-4 mb-6 mx-auto max-w-xs shadow animate-bounce-in`}
            style={{
              background: isCorrect
                ? "linear-gradient(135deg, #D4EDDA, #C3E6CB)"
                : "linear-gradient(135deg, #F8D7DA, #F5C6CB)",
              border: `2px solid ${isCorrect ? "#28A745" : "#DC3545"}`,
            }}
          >
            <p className="font-bold text-lg" style={{ color: isCorrect ? "#155724" : "#721C24" }}>
              {isCorrect ? "🎉 Ты угадал(а)! Молодец!" : "😄 Не угадал(а), но это не важно!"}
            </p>
          </div>
        )}

        <p className="font-display text-2xl" style={{ color: "#FF6FB0" }}>
          Поздравляем! 🎊
        </p>
      </div>
    </div>
  );
}

export default function Index() {
  const [page, setPage] = useState<Page>("welcome");
  const [choice, setChoice] = useState<"boy" | "girl" | null>(null);

  const handleChoice = (c: "boy" | "girl") => {
    setChoice(c);
    setPage("result");
  };

  return (
    <>
      {page === "welcome" && <WelcomePage onNext={() => setPage("guess")} />}
      {page === "guess" && <GuessPage onChoice={handleChoice} />}
      {page === "result" && <ResultPage choice={choice} />}
    </>
  );
}
