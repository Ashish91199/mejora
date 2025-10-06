import React, { useState } from "react";
import axios from "axios";

const TelegramBot = () => {
    const [message, setMessage] = useState("");

    const sendMessage = async () => {
        const BOT_TOKEN = "8249766731:AAEGpLVDTYgfMbdxCiM1vEqyY0BlgotaAgU";  // Yaha apna token daalein (abhi ke liye temporary)
        const CHAT_ID = "Ashish_3580";  // @userinfobot se mila ID yaha daalein

        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

        await axios.post(url, {
            chat_id: CHAT_ID,
            text: message,
        });

        alert("Message Sent to Telegram!");
    };

    return (
        <div style={{ padding: 20 }}>
            <h3>Send Message to Telegram Bot</h3>
            <input
                type="text"
                placeholder="Enter message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default TelegramBot;
