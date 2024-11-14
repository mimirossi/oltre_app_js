const textInput = document.getElementById("textInput");
const analyzeButton = document.getElementById("analyzeButton");
const result = document.getElementById("result");
const userMessage = document.getElementById("user-message");
const chatBot = document.getElementById("chat-bot");
// Funzione per chiamare l'API di OpenAI
// result.textContent = "Le risposte appaiono qui...";
analyzeButton.addEventListener("click", analyzeSentiment);
async function analyzeSentiment() {
  const inputText = textInput.value;

  if (!inputText) {
    return (result.textContent = "Scrivi un messaggio da analizare...");
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
  analyzeButton.textContent = "Inviato";
  textInput.value = "";
  analyzeButton.classList.remove("#analyzeButton");
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
