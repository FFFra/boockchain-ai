import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Ensure this key is set in your .env.local
});

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { inputText, level } = req.body;

        try {
            const messages = [
                {
                    role: "system",
                    content: "Você é um assistente que reescreve textos didáticos conforme instruções específicas.",
                },
                {
                    role: "user",
                    content: `
            Reescreva o texto a seguir conforme as orientações de NÍVEL ${level}:
            ${getInstructions(level)}

            Texto original:
            "${inputText}"

            Reescreva o texto abaixo seguindo as instruções:
          `,
                },
            ];

            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages,
                max_tokens: 500,
                temperature: 0.5,
            });

            const transformedText = response.choices[0]?.message?.content.trim();
            res.status(200).json({ output: transformedText });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to process text." });
        }
    } else {
        res.status(405).json({ error: "Method not allowed." });
    }
}

// Instructions for levels
function getInstructions(level) {
    const instructions = {
        "1": "Texto simples, claro e direto, com exemplos e uso de bullets.",
        "2": "Texto intermediário, na primeira pessoa do plural (nós), com apostos e clareza.",
        "3": "Texto mais formal e elaborado, na terceira pessoa, seguindo rigor gramatical.",
    };
    return instructions[level] || "Nível desconhecido.";
}
