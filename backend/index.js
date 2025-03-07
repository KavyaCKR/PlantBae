import express from "express"
import cors from "cors";
import Agent from "./ai/agent.js"
import { check_user, create_profile, delete_reminder, delete_schedule, get_reminder, get_schedule, set_reminder, set_schedule } from "./db/supa.js";

const app = express();
app.use(cors());
app.use(express.json());

const agent = new Agent();
let agentInitialized = false;

// Initialize the agent only once when the server starts
(async () => {
    console.log("Initializing agent...");
    await agent.initialize();
    agentInitialized = true;
    console.log("Agent initialized successfully.");
})();

app.post("/ai", async (req, res) => {
    const { input } = req.body;

    // Wait for initialization to complete if it hasn't already
    if (!agentInitialized) {
        console.log("Waiting for agent initialization to complete...");
        // You might want to add a timeout here
        while (!agentInitialized) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    console.log("Starting up the agent...\n");
    const response = await agent.work(input);

    res.status(200).json({
        content: response.content
    });
});

app.post("/create", async (req, res) => {
    console.log("hello")
    const { name, email, phone } = req.body;

    const response = await create_profile(name, email, phone);

    if (response.error) {
        res.status(201).json({ content: response });
        return;
    }

    res.status(200).json({ content: response });

});


app.post("/check_user", async (req,res) => {
    const {email} = req.body;

    const response = await check_user(email);

    if (response.error) {
        res.status(201).json({ content: response });
        return;
    }

    res.status(200).json({ content: response });
    
})

app.post("/get_schedule", async(req,res) => {
    const data = req.body;
    
    const response = await get_schedule(data);
    console.log(response)

    if (response.error) {
        res.status(201).json({ content: response });
        return;
    }

    res.status(200).json({ content: response });
})

app.post("/schedule", async (req, res) => {
    const data = req.body;
    
    const response = await set_schedule(data);
    console.log(response)

    if (response.error) {
        res.status(201).json({ content: response });
        return;
    }

    res.status(200).json({ content: response });
});

app.post("/delete_schedule", async(req,res) => {
    const {id} = req.body;

    const response = await delete_schedule(id);

    if (response.error) {
        res.status(201).json({ content: response });
        return;
    }

    res.status(200).json({ content: response });

})

app.post("/reminder", async (req, res) => {
    const data = req.body;

    const response = await set_reminder(data);


    if (response.error) {
        res.status(201).json({ content: response });
        return;
    }

    res.status(200).json({ content: response });
});



app.post("/get_reminder", async(req,res) => {
    const {email} = req.body;

    const response = await get_reminder(email);


    if (response.error) {
        res.status(201).json({ content: response });
        return;
    }

    res.status(200).json({ content: response });
})


app.post("/delete_reminder", async (req,res) => {
    const data = req.body;

    const response = await delete_reminder(data);


    if (response.error) {
        res.status(201).json({ content: response.error });
        return;
    }

    res.status(200).json({ content: response.success });
})


app.listen(3004, () => {
    console.log("server running");
})