// script.js

// Elementi della pagina
const textInput = document.getElementById("textInput");
const analyzeButton = document.getElementById("analyzeButton");
const result = document.getElementById("result");

// Funzione per chiamare l'API di OpenAI
async function analyzeSentiment() {
  const inputText = textInput.value;

  if (!inputText) {
    result.textContent = "Please enter some text to analyze.";
    return;
  }

  result.textContent = "Analyzing...";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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", // Inserisci qui la tua chiave API
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Analyze the sentiment of the following text: ${inputText}`,
          },
        ],
      }),
    });

    const data = await response.json();
    const sentiment = data.choices[0].message.content.trim();
    result.textContent = `Sentiment: ${sentiment}`;
  } catch (error) {
    console.error("Error:", error);
    result.textContent = "An error occurred while analyzing the text.";
  }
}

// Event listener sul pulsante
analyzeButton.addEventListener("click", analyzeSentiment);
