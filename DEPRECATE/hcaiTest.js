import readline from 'readline';
import { spawn } from 'child_process';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function callMcpTool(input) {
  return new Promise((resolve, reject) => {
    const proc = spawn('node', ['index.js'], {
      stdio: ['pipe', 'pipe', 'inherit']
    });

    const request = {
      method: "tools/run",
      params: {
        tool: "hardwareInfo",
        input: { request: "all" }
      }
    };

    proc.stdin.write(JSON.stringify(request) + '\n');
    proc.stdin.end();

    let result = '';
    proc.stdout.on('data', (chunk) => {
      result += chunk.toString();
    });

    proc.stdout.on('end', () => {
      try {
        const response = JSON.parse(result);
        resolve(JSON.stringify(response.result, null, 2));
      } catch (err) {
        reject("Failed to parse MCP response: " + err.message);
      }
    });
  });
}

async function askAI(prompt) {
  const res = await fetch('https://ai.hackclub.com/chat/completions', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    })
  });
  const data = await res.json();
  return data.choices[0].message.content.trim();
}

async function start() {
  console.log("🤖 Hack Club AI Chat (type 'exit' to quit)");

  rl.on('line', async (line) => {
    if (line.toLowerCase() === "exit") {
      rl.close();
      return;
    }

    if (line.toLowerCase().includes("system info")) {
      console.log("📦 Calling MCP tool for system info...");
      const hardwareData = await callMcpTool();
      const prompt = `${line}\n\nHere is the system info:\n${hardwareData}`;
      const reply = await askAI(prompt);
      console.log("🤖 AI:", reply);
    } else {
      const reply = await askAI(line);
      console.log("🤖 AI:", reply);
    }
  });
}

start();
