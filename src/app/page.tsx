"use client";
import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [level, setLevel] = useState("1");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setOutputText(""); // Clear previous output before processing

    try {
      const response = await fetch("/api/transform-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputText, level }),
      });

      const data = await response.json();
      if (response.ok) {
        setOutputText(data.output);
      } else {
        setOutputText("Erro ao processar o texto.");
      }
    } catch (error) {
      console.error("Error:", error);
      setOutputText("Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Text Transformer</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows={4}
          placeholder="Insira o texto aqui..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{ width: "100%", marginBottom: "1rem", color: "black" }}
          required
        />
        <div style={{ marginBottom: "1rem" }}>
          <label>Escolha o nível:</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            style={{ marginLeft: "0.5rem" }}
          >
            <option value="1">Nível 1</option>
            <option value="2">Nível 2</option>
            <option value="3">Nível 3</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{ padding: "0.5rem 1rem", backgroundColor: "#0070f3", color: "#fff", border: "none", cursor: "pointer" }}
        >
          {loading ? "Processando..." : "Transformar"}
        </button>
      </form>
      {outputText && (
        <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
          <h3>Texto Transformado:</h3>
          <p>{outputText}</p>
        </div>
      )}
    </div>
  );
}
