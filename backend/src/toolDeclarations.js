const toolDeclarations = [
    {
        name: "createDirectory",
        description:
            "Creates a new directory inside the generated-sites workspace.",
        parameters: {
            type: "object",
            properties: {
                path: {
                    type: "string",
                    description:
                        "Relative directory path, for example brewlab",
                },
            },
            required: ["path"],
        },
    },

    {
        name: "writeFile",
        description:
            "Creates or overwrites a text file inside the generated-sites workspace. Use this to create HTML, CSS and JavaScript files.",
        parameters: {
            type: "object",
            properties: {
                path: {
                    type: "string",
                    description:
                        "Relative file path, for example brewlab/index.html",
                },
                content: {
                    type: "string",
                    description:
                        "Complete content that should be written into the file",
                },
            },
            required: ["path", "content"],
        },
    },

    {
        name: "readFile",
        description:
            "Reads the contents of an existing file from the generated-sites workspace.",
        parameters: {
            type: "object",
            properties: {
                path: {
                    type: "string",
                    description:
                        "Relative file path, for example brewlab/index.html",
                },
            },
            required: ["path"],
        },
    },

    {
        name: "listFiles",
        description:
            "Lists all files and directories inside a website project.",
        parameters: {
            type: "object",
            properties: {
                path: {
                    type: "string",
                    description:
                        "Relative directory path, for example brewlab",
                },
            },
            required: ["path"],
        },
    },
];

module.exports = {
    toolDeclarations,
};