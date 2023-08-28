import openai from "@/openai"
import { NextResponse } from "next/server"

export async function Post(requset: Request) {
    const { todos } = await requset.json()
    console.log(todos)

    /// make the chatgpt requset
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.8,
        n: 1,
        strean: false,
        messages: [
            {
                role: "system",
                content: "when responding, welcome the user always as Mr.ofek and say welcome to the Trello todo app! Limit the response to 200 characters",
            },
            {
                role: "user",
                content: `Hi there, provide a summary of the following todos. count how many todos are in each category such as To do, in progress and done, then tell the user to have a productive day! Here's the data ${JSON.stringify(todos)}`
            }
        ]

    })

    const { data } = response

    return NextResponse.json(data.choices[0].message)
}