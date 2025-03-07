import twilio from "twilio";

const accountSid = "AC4cf09f6d9364839ccb8570f29a4b1d29";
const authToken = "7eb725a1b5397a417f8043565086680d";

const client = twilio(accountSid, authToken);

export async function set_message_reminder(task) {
    const message = await client.messages.create({
        body: task || "Hey there from garden",
        messagingServiceSid: "MG004153710d7513a6178d94eba9ace4b0",
        to: "+917984166647",
        from: "+15343447667"
    });

    console.log(`Message sent: ${message.sid}`);
}
