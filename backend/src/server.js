const express = require("express");
require("dotenv").config();

const { build } = require("./ai");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        message: "Server is healthy",
    });
});

app.post("/api/build", async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({
                error: "Prompt is required",
            });
        }

        const result = await build(prompt);

        res.json({
            success: true,
            message: result,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});