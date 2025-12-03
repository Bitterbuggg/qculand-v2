import { useMemo, useState } from "react";

export default function DormUI({ question, choices, onSelect }) {
  if (!question) return null;

  const shuffledChoices = useMemo(() => {
    const shuffled = [...choices];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [choices]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: "40px",
        pointerEvents: "auto",
        zIndex: 50,
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(30, 58, 138, 0.9)", // Dark blue background
          color: "white",
          fontWeight: "bold",
          border: "2px solid #60a5fa", // Light blue border
          padding: "20px",
          marginBottom: "20px",
          maxWidth: "42rem",
          textAlign: "center",
          borderRadius: "12px",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          fontSize: "1.125rem",
          backdropFilter: "blur(4px)",
        }}
      >
        {question}
      </div>

      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
          maxWidth: "60rem",
          padding: "0 20px",
        }}
      >
        {shuffledChoices.map((choice, index) => (
          <HoverButton key={index} onClick={() => onSelect(choice)}>
            {choice.text}
          </HoverButton>
        ))}
      </div>
    </div>
  );
}

function HoverButton({ children, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: "12px 24px",
        backgroundColor: isHovered ? "#dbeafe" : "white", // light blue on hover
        border: "2px solid #2563eb", // blue-600
        color: "#1e3a8a", // blue-900
        fontWeight: "600",
        borderRadius: "8px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        transition: "background-color 0.2s, transform 0.1s",
        transform: isHovered ? "scale(1.02)" : "scale(1)",
        fontSize: "1rem",
      }}
    >
      {children}
    </button>
  );
}
