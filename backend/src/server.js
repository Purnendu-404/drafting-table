const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { build } = require("./ai");

const app = express();

app.use(cors());

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

        console.log("BUILD REQUEST RECEIVED");

        if (!prompt) {
            return res.status(400).json({
                success: false,
                error: "Prompt is required",
            });
        }

        const result = await build(prompt);

        console.log("BUILD RESULT:", result);

        return res.status(200).json({
            success: true,
            message: result.message || "Website built successfully.",
        });

    } catch (error) {
        console.error("========== BUILD ERROR ==========");
        console.error(error);
        console.error("=================================");

        return res.status(500).json({
            success: false,
            error: error.message || "Build failed",
        });
    }
});

app.use(
    "/sites",
    express.static("generated-sites")
);

app.listen(3000, () => {
    console.log(
        "Server running on http://localhost:3000"
    );
});