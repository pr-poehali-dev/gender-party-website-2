import { useState, useEffect, useCallback } from "react";

type Page = "welcome" | "guess" | "result";
type Choice = "boy" | "girl" | null;
type Result = "boy" | "girl";

const RESULT: Result = "girl"; // ← СМЕНИТЕ НА "boy" ЕСЛИ МАЛЬЧИК

function ConfettiPiece({ index }: { index: number }) {
  const colors = ["#FF6FB0", "#5EB8FF", "#FFD166", "#C084FC", "#6EE7B7", "#FF9F9F", "#7DD3FC"];
  const shapes = ["circle", "square", "triangle"];
  const color = colors[index % colors.length];
  const shape = shapes[index % shapes.length];
  const left = (index * 37 + 13) % 100;
  const duration = 2 + (index % 30) / 10;
  const delay = (index % 20) / 10;
  const size = 6 + (index % 12);

  return (
    <div
      className="confetti-piece"
      style={{
        left: `${left}%`,
        top: `-20px`,
        width: `${size}px`,
        height: shape === "triangle" ? "0" : `${size}px`,
        backgroundColor: shape !== "triangle" ? color : "transparent",
        borderRadius: shape === "circle" ? "50%" : shape === "square" ? "2px" : "0",
        borderLeft: shape === "triangle" ? `${size / 2}px solid transparent` : "none",
        borderRight: shape === "triangle" ? `${size / 2}px solid transparent` : "none",
        borderBottom: shape === "triangle" ? `${size}px solid ${color}` : "none",
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        zIndex: 1000,
      }}
    />
  );
}

function FloatingEmoji({ emoji, style }: { emoji: string; style: React.CSSProperties }) {
  return (
    <div
      className="absolute select-none pointer-events-none animate-float"
      style={{ fontSize: "2rem", opacity: 0.4, ...style }}
    >
      {emoji}
    </div>
  );
}

function WelcomePage({ onNext }: { onNext: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
      style={{ background: "linear-gradient(135deg, #FFF0F7 0%, #F0F7FF 50%, #FFF8E7 100%)" }}
    >
      <FloatingEmoji emoji="🎈" style={{ top: "8%", left: "5%", animationDelay: "0s" }} />
      <FloatingEmoji emoji="⭐" style={{ top: "15%", right: "8%", animationDelay: "0.5s" }} />
      <FloatingEmoji emoji="🌸" style={{ top: "40%", left: "3%", animationDelay: "1s" }} />
      <FloatingEmoji emoji="✨" style={{ bottom: "20%", right: "5%", animationDelay: "1.5s" }} />
      <FloatingEmoji emoji="🎀" style={{ bottom: "10%", left: "10%", animationDelay: "0.8s" }} />
      <FloatingEmoji emoji="💫" style={{ top: "65%", right: "4%", animationDelay: "0.3s" }} />

      <div
        className={`text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="text-7xl mb-4 animate-wiggle">🎉</div>

        <h1 className="font-display text-4xl md:text-6xl mb-3 shimmer-text leading-tight">
          Гендер Пати!
        </h1>

        <p className="text-xl md:text-2xl font-bold text-gray-600 mb-2">
          Добро пожаловать на самое
        </p>
        <p className="text-xl md:text-2xl font-bold mb-8" style={{ color: "#FF6FB0" }}>
          🌟 интригующее событие года 🌟
        </p>

        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 mb-8 max-w-md mx-auto shadow-xl border border-white">
          <p className="text-gray-700 text-lg font-semibold leading-relaxed">
            Скоро мы узнаем, кто же придёт в этот мир —{" "}
            <span style={{ color: "#5EB8FF" }}>маленький рыцарь 💙</span> или{" "}
            <span style={{ color: "#FF6FB0" }}>принцесса 🌸</span>
          </p>
          <p className="text-gray-500 text-base mt-3">А пока — сделай свою ставку! 😄</p>
        </div>

        <button
          onClick={onNext}
          className="btn-main font-display text-white text-xl px-10 py-5 rounded-full shadow-2xl animate-pulse-glow"
          style={{ background: "linear-gradient(135deg, #FF6FB0, #C084FC)" }}
        >
          Угадать! 🎯
        </button>
      </div>

      <img
        src="https://cdn.poehali.dev/projects/10721263-3afa-468f-aed0-f6b35c11c9a7/files/eed32011-40bb-4e3d-b6fc-d38f5680055f.jpg"
        alt="gender party"
        className={`mt-8 w-64 md:w-80 rounded-3xl shadow-lg object-cover transition-all duration-1000 delay-300 ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
        style={{ maxHeight: 260 }}
      />

      <div
        className={`mt-8 flex flex-col items-center gap-3 transition-all duration-1000 delay-500 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-gray-500 font-semibold text-sm">📱 Отсканируй QR, чтобы открыть на телефоне</p>
        <div className="bg-white p-4 rounded-2xl shadow-xl border-4 border-pink-100">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https%3A%2F%2Fgender-party-website-2--preview.poehali.dev%2F&color=C084FC&bgcolor=ffffff&qzone=1&format=png"
            alt="QR код"
            width={180}
            height={180}
            className="rounded-lg"
          />
        </div>
        <a
          href="https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https%3A%2F%2Fgender-party-website-2--preview.poehali.dev%2F&color=C084FC&bgcolor=ffffff&qzone=1&format=png"
          download="gender-party-qr.png"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-bold px-5 py-2 rounded-full border-2 transition-all hover:scale-105"
          style={{ color: "#C084FC", borderColor: "#C084FC" }}
        >
          ⬇️ Скачать QR для печати
        </a>
      </div>
    </div>
  );
}

function GuessPage({ onChoice }: { onChoice: (c: Choice) => void }) {
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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
      style={{ background: "linear-gradient(135deg, #F5F0FF 0%, #FFF0F7 50%, #F0F5FF 100%)" }}
    >
      <FloatingEmoji emoji="🎊" style={{ top: "5%", left: "8%", animationDelay: "0.2s" }} />
      <FloatingEmoji emoji="💕" style={{ top: "12%", right: "6%", animationDelay: "0.9s" }} />
      <FloatingEmoji emoji="🌟" style={{ bottom: "25%", left: "4%", animationDelay: "0.4s" }} />
      <FloatingEmoji emoji="🦋" style={{ bottom: "15%", right: "7%", animationDelay: "1.2s" }} />

      <div
        className={`text-center mb-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="text-5xl mb-3">🤔</div>
        <h2 className="font-display text-3xl md:text-5xl mb-2" style={{ color: "#7C3AED" }}>
          Как думаешь?
        </h2>
        <p className="text-gray-500 text-lg font-semibold">Нажми на свой вариант!</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-xl">
        {/* ДЕВОЧКА */}
        <div
          className={`card-choice flex-1 rounded-3xl p-8 text-center shadow-xl border-4 transition-all duration-300 ${
            selected === "girl"
              ? "scale-105"
              : selected === "boy"
              ? "opacity-40 border-transparent"
              : "border-pink-200"
          }`}
          style={
            selected === "girl"
              ? {
                  background: "linear-gradient(135deg, #FFF0F7, #FFD6EC)",
                  borderColor: "#FF6FB0",
                }
              : { background: "white", borderColor: "#FBCFE8" }
          }
          onClick={() => handleChoice("girl")}
        >
          <div className="text-6xl mb-4">🌸</div>
          <h3 className="font-display text-2xl mb-2" style={{ color: "#FF6FB0" }}>
            Девочка
          </h3>
          <p className="text-gray-500 font-semibold text-sm">Принцесса 👑</p>
          {selected === "girl" && <div className="mt-4 text-3xl animate-bounce-in">✅</div>}
        </div>

        {/* МАЛЬЧИК */}
        <div
          className={`card-choice flex-1 rounded-3xl p-8 text-center shadow-xl border-4 transition-all duration-300 ${
            selected === "boy"
              ? "scale-105"
              : selected === "girl"
              ? "opacity-40 border-transparent"
              : "border-blue-200"
          }`}
          style={
            selected === "boy"
              ? {
                  background: "linear-gradient(135deg, #F0F7FF, #D6ECFF)",
                  borderColor: "#5EB8FF",
                }
              : { background: "white", borderColor: "#BFDBFE" }
          }
          onClick={() => handleChoice("boy")}
        >
          <div className="text-6xl mb-4">🚀</div>
          <h3 className="font-display text-2xl mb-2" style={{ color: "#5EB8FF" }}>
            Мальчик
          </h3>
          <p className="text-gray-500 font-semibold text-sm">Рыцарь ⚔️</p>
          {selected === "boy" && <div className="mt-4 text-3xl animate-bounce-in">✅</div>}
        </div>
      </div>

      {selected && (
        <div className="mt-8 text-center animate-slide-up">
          <div className="text-2xl font-bold text-gray-600">Отличный выбор! Проверяем... ⏳</div>
        </div>
      )}
    </div>
  );
}

function ResultPage({ choice }: { choice: Choice }) {
  const [confetti, setConfetti] = useState<number[]>([]);
  const [visible, setVisible] = useState(false);
  const isGirl = RESULT === "girl";
  const isRight = choice === RESULT;

  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
    setConfetti(Array.from({ length: 60 }, (_, i) => i));
  }, []);

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-12"
      style={{
        background: isGirl
          ? "linear-gradient(135deg, #FFF0F7 0%, #FFD6EC 50%, #FFF0F7 100%)"
          : "linear-gradient(135deg, #F0F7FF 0%, #D6ECFF 50%, #F0F7FF 100%)",
      }}
    >
      {confetti.map((i) => (
        <ConfettiPiece key={i} index={i} />
      ))}

      <div
        className={`text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="text-8xl mb-4 animate-bounce">{isGirl ? "🌸" : "🚀"}</div>

        <h1
          className="font-display text-4xl md:text-6xl mb-4"
          style={{ color: isGirl ? "#FF6FB0" : "#5EB8FF" }}
        >
          {isGirl ? "Это девочка!" : "Это мальчик!"}
        </h1>

        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 mb-8 max-w-md mx-auto shadow-2xl border border-white">
          {isRight ? (
            <>
              <div className="text-5xl mb-3">🎯</div>
              <p className="text-xl font-bold text-gray-700 mb-1">Ты угадал(а)!</p>
              <p className="text-gray-500 font-semibold">Экстрасенс? 😄 Поздравляем!</p>
            </>
          ) : (
            <>
              <div className="text-5xl mb-3">😄</div>
              <p className="text-xl font-bold text-gray-700 mb-1">Не угадал(а)!</p>
              <p className="text-gray-500 font-semibold">Зато теперь знаешь наверняка! 🎉</p>
            </>
          )}
        </div>

        <img
          src={
            isGirl
              ? "https://cdn.poehali.dev/projects/10721263-3afa-468f-aed0-f6b35c11c9a7/files/0d825140-b913-4aa0-b743-fe2cecd2d546.jpg"
              : "https://cdn.poehali.dev/projects/10721263-3afa-468f-aed0-f6b35c11c9a7/files/0d82bdee-c181-4a33-abae-a4afb2ba38cf.jpg"
          }
          alt="reveal"
          className="w-64 md:w-80 rounded-3xl shadow-2xl mx-auto object-cover mb-8"
          style={{ maxHeight: 280 }}
        />

        <div className="text-lg font-bold text-gray-600 animate-wiggle">
          {isGirl ? "🎀 Добро пожаловать, принцесса! 🎀" : "⭐ Добро пожаловать, рыцарь! ⭐"}
        </div>

        <div className="mt-4 flex justify-center gap-3 flex-wrap">
          {(isGirl ? ["🌸", "💕", "👑", "🦋", "🌷"] : ["🚀", "⭐", "⚡", "🎯", "🏆"]).map(
            (e, i) => (
              <span
                key={i}
                className="text-3xl animate-float"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {e}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [page, setPage] = useState<Page>("welcome");
  const [choice, setChoice] = useState<Choice>(null);

  const handleChoice = useCallback((c: Choice) => {
    setChoice(c);
    setPage("result");
  }, []);

  return (
    <div className="font-body">
      {page === "welcome" && <WelcomePage onNext={() => setPage("guess")} />}
      {page === "guess" && <GuessPage onChoice={handleChoice} />}
      {page === "result" && <ResultPage choice={choice} />}
    </div>
  );
}