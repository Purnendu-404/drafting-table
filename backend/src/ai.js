const fs = require("fs/promises");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

require("dotenv").config();

const { toolDeclarations } = require("./toolDeclarations");
const { availableTools } = require("./tools");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const websiteWorkspace = path.resolve("generated-sites");

const history = [];

const websiteSystemPrompt = `
You are an expert frontend website developer.

Your job is to create complete static websites using the available tools.

Rules:
1. Create a separate directory for every website.
2. Create index.html.
3. Create style.css.
4. Create script.js when JavaScript is useful.
5. Build modern, beautiful and responsive websites.
6. Use only HTML, CSS and vanilla JavaScript.
7. Do not return website code in your response. Actually create the files using tools.
8. After creating the files, use listFiles to verify the project.
9. If index.html and style.css exist, the website is successfully built.
10. Never say the website was not built if the required files were successfully created.
11. After successful verification, give a short confirmation.
`;

/*
 * Finds the most recently modified directory containing
 * both index.html and style.css.
 */
async function findLatestWebsiteProject() {
    const projects = [];

    async function scan(directory) {
        let entries;

        try {
            entries = await fs.readdir(directory, {
                withFileTypes: true,
            });
        } catch {
            return;
        }

        const hasIndex = entries.some(
            (entry) =>
                entry.isFile() &&
                entry.name === "index.html"
        );

        const hasStyle = entries.some(
            (entry) =>
                entry.isFile() &&
                entry.name === "style.css"
        );

        if (hasIndex && hasStyle) {
            let latestTime = 0;

            for (const entry of entries) {
                try {
                    const stats = await fs.stat(
                        path.join(directory, entry.name)
                    );

                    latestTime = Math.max(
                        latestTime,
                        stats.mtimeMs
                    );
                } catch {}
            }

            projects.push({
                directory,
                latestTime,
            });
        }

        for (const entry of entries) {
            if (entry.isDirectory()) {
                await scan(
                    path.join(directory, entry.name)
                );
            }
        }
    }

    await scan(websiteWorkspace);

    if (projects.length === 0) {
        return null;
    }

    projects.sort(
        (a, b) => b.latestTime - a.latestTime
    );

    const latestProject = projects[0];

    const relativePath = path.relative(
        websiteWorkspace,
        latestProject.directory
    );

    return relativePath || ".";
}

async function build(prompt) {
    history.push({
        role: "user",
        parts: [{ text: prompt }],
    });

    while (true) {
        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: history,
            config: {
                tools: [
                    {
                        functionDeclarations: toolDeclarations,
                    },
                ],
                systemInstruction: websiteSystemPrompt,
            },
        });

        history.push({
            role: "model",
            parts: response.candidates[0].content.parts,
        });

        if (
            response.functionCalls &&
            response.functionCalls.length > 0
        ) {
            const functionCall =
                response.functionCalls[0];

            console.log(
                `Function to call: ${functionCall.name}`
            );

            console.log(
                `Arguments: ${JSON.stringify(functionCall.args)}`
            );

            const tool =
                availableTools[functionCall.name];

            if (!tool) {
                throw new Error(
                    `Unknown tool: ${functionCall.name}`
                );
            }

            const result =
                await tool(functionCall.args);

            console.log("Tool result:", result);

            history.push({
                role: "user",
                parts: [
                    {
                        functionResponse: {
                            name: functionCall.name,
                            response: {
                                result,
                            },
                        },
                    },
                ],
            });
        } else {
            console.log(response.text);

            const projectPath =
                await findLatestWebsiteProject();

            if (!projectPath) {
                throw new Error(
                    "Website was generated, but no valid project containing index.html and style.css was found."
                );
            }

            return {
                success: true,
                message:
                    response.text ||
                    "Website built successfully.",
                projectPath,
            };
        }
    }
}

module.exports = {
    build,
};