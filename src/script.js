const textInput = document.getElementById("textInput");
const analyzeButton = document.getElementById("analyzeButton");
const result = document.getElementById("result-cont");
const resultText = document.getElementById("result");
const userMessage = document.getElementById("user-message");
const chatBot = document.getElementById("chat-bot");
// Funzione per chiamare l'API di OpenAI
// result.textContent = "Le risposte appaiono qui...";
analyzeButton.addEventListener("click", analyzeSentiment);
async function analyzeSentiment() {
  const inputText = textInput.value;

  if (!inputText) {
    return (resultText.textContent = "Scrivi un messaggio da analizare...");
  }

  //   result.textContent = "Analyzing...";
  if (inputText) {
    displayUserMessage(inputText);
    let modificationSuggestion;
    try {
      modificationSuggestion = await suggestModification(inputText);
      displayBotMessage(modificationSuggestion);
    } catch (error) {
      console.error("Errore durante la chiamata all'API:", error);
      displayBotMessage("Si è verificato un errore. Riprova più tardi.");
    }
    console.log(modificationSuggestion);
  }
  analyzeButton.textContent = "INVIATO";
  resultText.textContent = "";
  //   result.textContent = "";
  textInput.value = "";
  analyzeButton.classList.remove("analyze-btn");
  analyzeButton.classList.add("inviato");
}
async function suggestModification(message) {
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
          role: "system",
          content:
            "Sei un assistente che aiuta a riscrivere messaggi per renderli meno aggressivi.",
        },
        {
          role: "user",
          content: `Analizza il seguente messaggio e riscrivilo per ridurre il tono della rabbia: "${message}"`,
        },
      ],
    }),
  });

  const data = await response.json();
  //     const sentiment = data.choices[0].message.content.trim();
  //     if (data.choices && data.choices[0] && data.choices[0].message) {
  //         return sentiment;}
  //     result.textContent = `Sentiment: ${sentiment}`;
  //   } else {
  //     throw new Error("Risposta non valida dall'API OpenAI");
  //     // result.textContent = "An error occurred while analyzing the text.";
  //   }
  if (data.choices && data.choices[0] && data.choices[0].message) {
    return data.choices[0].message.content.trim();
  } else {
    throw new Error("Risposta non valida dall'API OpenAI");
  }
}
// Funzioni per visualizzare i messaggi nell'interfaccia
function displayUserMessage(message) {
  userMessage.classList.add("user-message");
  userMessage.textContent = message;
  //   userMessage.appendChild(result);
}

function displayBotMessage(message) {
  chatBot.classList.add("bot-message");
  chatBot.textContent = message;
  //   chatBot.appendChild(result);
}
