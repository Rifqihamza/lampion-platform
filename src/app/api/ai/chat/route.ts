// import { NextRequest, NextResponse } from "next/server";
// import { askLampionAI } from "@/lib/ai-service";
// import { prisma } from "@/lib/prisma";
// import { z } from "zod";

// const schema = z.object({
//     milestoneTitle: z.string(),
//     question: z.string(),
// });

// export async function POST(req: NextRequest) {
//     try {
//         const body = await req.json();
//         const { milestoneTitle, question } = schema.parse(body);

//         const answer = await askLampionAI(
//             milestoneTitle,
//             question
//         );

//         // Optional: save history
//         await prisma.aIChatHistory.create({
//             data: {
//                 userId: "demo-user", // nanti ambil dari auth()
//                 question,
//                 answer: answer || "",
//             },
//         });

//         return NextResponse.json({ answer });
//     } catch (err) {
//         return NextResponse.json(
//             { error: "Something went wrong" },
//             { status: 500 }
//         );
//     }
// }