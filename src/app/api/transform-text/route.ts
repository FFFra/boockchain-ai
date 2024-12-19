import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { inputText, level } = await request.json();

        // Add your text transformation logic here
        const output = `Transformed text: ${inputText} (Level ${level})`; // Example response
        return NextResponse.json({ output });
    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { error: 'Failed to process text' },
            { status: 500 }
        );
    }
}

