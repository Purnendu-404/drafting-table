const express = require("express");
const cors = require("cors");
const path = require("path");

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

/*
 * Serve all generated websites locally.
 *
 * Example:
 * generated-sites/tic-tac-toe/index.html
 *
 * becomes:
 *
 * http://localhost:3000/sites/tic-tac-toe/
 */
app.use("/sites", express.static(path.resolve("generated-sites")));

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

        /*
         * Convert the generated project path into
         * a local browser URL.
         *
         * Example:
         *
         * projectPath = "tic-tac-toe"
         *
         * URL:
         * http://localhost:3000/sites/tic-tac-toe/
         */

        const projectPath = result.projectPath;

        const encodedProjectPath =
            projectPath
                .split(path.sep)
                .map(encodeURIComponent)
                .join("/");

        const url =
            projectPath === "."
                ? "http://localhost:3000/sites/"
                : `http://localhost:3000/sites/${encodedProjectPath}/`;

        return res.status(200).json({
            success: true,
            message:
                result.message ||
                "Website built successfully.",
            url,
        });
    } catch (error) {
        console.error(
            "========== BUILD ERROR =========="
        );

        console.error(error);

        console.error(
            "================================="
        );

        return res.status(500).json({
            success: false,
            error:
                error.message ||
                "Build failed",
        });
    }
});

app.listen(3000, () => {
    console.log(
        "Server running on http://localhost:3000"
    );
});