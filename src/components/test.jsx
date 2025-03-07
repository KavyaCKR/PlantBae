import { useEffect, useState } from "react"
import axios from "axios"

export default function Test() {

    const [prompt, setPrompt] = useState();
    const [answer, setAnswer] = useState();


    async function fetch() {
        const response = await axios.post("http://localhost:3000/ai", {
            input:prompt
        });
        
        setAnswer(response.data.content);
    }

    return (
        <>
            <input
                onChange={(e) => setPrompt(e.target.value)}
            />
            <button onClick={fetch}>Generate</button>

            <div>
                {answer}
            </div>
        </>
    )
}