import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { MemorySaver } from "@langchain/langgraph";
import { search_web, fetch_weather } from "./tools.js";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { HumanMessage } from "@langchain/core/messages";
import { PROMPT } from "./prompt.js"



class Agent {

    llm;
    agent;
    memory;

    async initialize() {
        this.llm = new ChatGoogleGenerativeAI({
            model: 'gemini-1.5-pro',
            apiKey: "AIzaSyCPWyaAMhiew4iuGMhpVI9BKIW48YSfPuI"
        });

        const tools = [search_web, fetch_weather];

        this.memory = new MemorySaver();

        this.agent = new createReactAgent({
            llm: this.llm,
            tools,
            memory: this.memory,
            messageModifier: PROMPT
        })

    }

    async work(message) {
        const stream = await this.agent.stream({
            messages: [new HumanMessage(message)]
        },
        { configurable: { thread_id: "GARDEN" } },)


        let response = "";
        for await (const chunk of stream) {
            if ("agent" in chunk) {
                response += chunk.agent.messages[0].content + "\n";
            } else if ("tools" in chunk) {
                response += chunk.tools.messages[0].content + "\n";
            }
        }


        return {
            type: "response",
            content: response.trim(),
        };
    }

}

export default Agent