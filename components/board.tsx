'use client'

import { useBoardStore } from "@/store/BoardStore";
import { useEffect } from "react"
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import Column from "./column";

export default function Board() {

    const [getBoard, board, setBoardState, upDateTodoInDB] = useBoardStore((state) =>
        [state.getBoard, state.board, state.setBoardState, state.upDateTodoInDB])

    useEffect(() => {
        getBoard()
    }, [getBoard])

    const handleOnDragEnd = (result: DropResult) => {
        const { destination, source, type } = result

        if (!destination) return

        if (type === "column") {
            const entries = Array.from(board.columns.entries())
            const [removed] = entries.splice(source.index, 1)
            entries.splice(destination.index, 0, removed)
            const reRangedColumns = new Map(entries)
            setBoardState({ ...board, columns: reRangedColumns })
        }

        const coulmns = Array.from(board.columns)
        const startColIndex = coulmns[Number(source.droppableId)]
        const finishColIndex = coulmns[Number(destination.droppableId)]

        const startCol: Column = {
            id: startColIndex[0],
            todos: startColIndex[1].todos
        }

        const finishCol: Column = {
            id: finishColIndex[0],
            todos: finishColIndex[1].todos
        }

        if (!startCol || !finishCol) return

        if (source.index === destination.index && startCol === finishCol) return

        const newTodos = startCol.todos
        const [todoMoved] = newTodos.splice(source.index, 1)

        if (startCol.id === finishCol.id) {
            /// same column task drag
            newTodos.splice(destination.index, 0, todoMoved)
            const newCol = {
                id: startCol.id,
                todos: newTodos
            }

            const newColumns = new Map(board.columns)
            newColumns.set(startCol.id, newCol)

            setBoardState({ ...board, columns: newColumns })

        } else {
            /// draging to anthor column
            const finishTodos = Array.from(finishCol.todos)
            finishTodos.splice(destination.index, 0, todoMoved)

            const newColumns = new Map(board.columns)
            const newCol = {
                id: startCol.id,
                todos: newTodos
            }

            newColumns.set(startCol.id, newCol)
            newColumns.set(finishCol.id, {
                id: finishCol.id,
                todos: finishTodos
            })

            upDateTodoInDB(todoMoved,finishCol.id)

            setBoardState({ ...board, columns: newColumns })
        }

    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='board' direction='horizontal' type='column'>

                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
                    >
                        {Array.from(board.columns.entries()).map(([id, column], index) => (
                            <Column key={id} todos={column.todos} id={id} index={index} />
                        ))}
                    </div>
                )}

            </Droppable>

        </DragDropContext>
    )
}