// A test script to interact with Hack Club AI for testing purposes
// This script was generated using ChatGPT

import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion() {
  rl.question("🧠 You: ", async (input) => {
    if (input.toLowerCase() === "exit") {
      rl.close();
      return;
    }

    const response = await fetch("https://ai.hackclub.com/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: input }
        ]
      })
    });

    const data = await response.json();
    console.log("🤖 AI:", data.choices[0].message.content.trim());
    askQuestion(); // Loop back
  });
}

console.log("🤖 Connected to Hack Club AI (type 'exit' to quit)");
askQuestion();
