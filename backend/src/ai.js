const { GoogleGenAI } = require('@google/genai');
require('dotenv').config()

const { toolDeclarations } = require('./toolDeclarations')
const { availableTools } = require('./tools')

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const history = []

const websiteSystemPrompt = `You are an expert frontend website developer.

Your job is to create complete static websites using the available tools.

Follow these rules:
1. Create a separate directory for every website.
2. Create index.html.
3. Create style.css.
4. Create script.js when JavaScript is useful.
5. Build modern, beautiful and responsive websites.
6. Use only HTML, CSS and vanilla JavaScript.
7. Do not just return website code in your response. Actually create the files using tools.
8. After creating the website, list the project files.
9. Read important files again if needed and fix obvious problems.
10. Finish only when the complete website has been created.`;

async function build(prompt) {

    history.push({
        role: "user",
        parts: [{ text: prompt }],
    });

    while (true) {
        const response = await ai.models.generateContent({
            model: 'gemini-3.1-flash-lite',
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
            console.log(`ID: ${functionCall.id}`);
            console.log(`Arguments: ${JSON.stringify(functionCall.args)}`);

            const tool = availableTools[functionCall.name]

            if (!tool) {
                throw new Error(
                    `Unknown tool: ${functionCall.name}`
                );
            }

            const result = await tool(functionCall.args);

            history.push({
                role: 'user',
                parts: [{
                    functionResponse: {
                        name: functionCall.name,
                        response: {
                            result
                        },
                    }
                }]
            })

        } else {
            console.log("No function call found in the response.");
            console.log(response.text);
            return (response.text)
        }
    }
}

module.exports = { build }


