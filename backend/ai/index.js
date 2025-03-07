import { agent } from "./agent.js";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log("Agent is initialising...\n");

await agent.initialize();

console.log("Agent initialised successfully.\n");

console.log("Starting up the agent...\n");

const askQuestion = () => {


    rl.question("User: ", async (input) => {
        if (input.toLowerCase() === "exit") {
            console.log("Exiting...");
            rl.close();
            return;
        }
        try {
            const response = await agent.work(input);
            console.log("\n\nAGENT RESPONSE\n\n", response.content);
        } catch (error) {
            console.error("Error:", error.message);
        }
        askQuestion(); 
    });
};

askQuestion(); 