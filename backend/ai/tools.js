import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import exa from "./config.js";
import axios from "axios";


function fetch_weather() {
    return new DynamicStructuredTool({
        name: "Fetch Weather",
        description: "This helps to fetch the weather of a particular place.",
        schema: z.object({
            input: z.string().describe("Name of the place.")
        }),
        func: async (input) => {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${input}&units=metric&appid=${"cdd2ea54ef813e5bc2bb7f305107f9df"}`);
            
            return {    
                temperature:response.list[0].main.temp,
                weather: response.list[0].weather[0].main

            };

        }   
    })
}

function search_web() {
    return new DynamicStructuredTool({
        name: "Search Web",
        description: "The search endpoint lets you intelligently search the web and extract contents from the results.",
        schema: z.object({
            input: z.string().describe("The input we have search about.")
        }),
        func: async (input) => {
            const response = await exa.searchAndContents(
                input,
                {text:true}
            )

            return response.results;
        }

    })
}


export {fetch_weather, search_web}