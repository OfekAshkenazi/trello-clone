// import formatTodoForAi from "./formatTodoForAi"


// export default async function fetchSuggestion(board: Board) {
//     const todos = formatTodoForAi(board)
//     const res = await fetch("/api/generateSummary", {
//         method: "POST",
//         headers: {
//             "Content-type": "application/json"
//         },
//         body: JSON.stringify({ todos }),
//     })

//     const GPTdata = await res.json()
//     const { content } = GPTdata
//     return content
// } 