const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const { toolDeclarations } = require("./toolDeclarations");
const { availableTools } = require("./tools");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

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

async function build(prompt) {

    history.push({
        role: "user",
        parts: [{ text: prompt }],
    });

    while (true) {

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: history,
            config: {
                tools: [{
                    functionDeclarations: toolDeclarations,
                }],
                systemInstruction: websiteSystemPrompt,
            },
        });

        history.push({
            role: "model",
            parts: response.candidates[0].content.parts,
        });

        if (response.functionCalls && response.functionCalls.length > 0) {

            const functionCall = response.functionCalls[0];

            console.log(`Function to call: ${functionCall.name}`);
            console.log(`Arguments: ${JSON.stringify(functionCall.args)}`);

            const tool = availableTools[functionCall.name];

            if (!tool) {
                throw new Error(
                    `Unknown tool: ${functionCall.name}`
                );
            }

            const result = await tool(functionCall.args);

            console.log("Tool result:", result);

            history.push({
                role: "user",
                parts: [{
                    functionResponse: {
                        name: functionCall.name,
                        response: {
                            result,
                        },
                    },
                }],
            });

        } else {
            console.log(response.text)
            return {
                success: true,
                message: response.text,
            };
        }
    }
}

module.exports = { build };