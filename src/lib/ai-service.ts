// import OpenAI from "openai";

// const client = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY!,
// });

// export async function askLampionAI(
//     milestoneTitle: string,
//     question: string
// ) {
//     const res = await client.chat.completions.create({
//         model: "gpt-4.1-mini",
//         messages: [
//             {
//                 role: "system",
//                 content: `
// You are Lampion AI Mentor.
// Explain using Feynman technique:
// - Simple
// - Clear analogy
// - Step-by-step
//         `,
//             },
//             {
//                 role: "user",
//                 content: `Topic: ${milestoneTitle}\nQuestion: ${question}`,
//             },
//         ],
//     });

//     return res.choices[0].message.content;
// }