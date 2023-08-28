'use client'

import { useBoardStore } from "@/store/BoardStore";
import { useEffect } from "react"
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import Column from "./column";

export default function Board() {

    const [getBoard, board, setBoardState] = useBoardStore((state) =>
        [state.getBoard, state.board, state.setBoardState])

    useEffect(() => {
        getBoard()
    }, [getBoard])

    const handleOnDragEnd = (result: DropResult) => {
        const { destination, source, type } = result

        if (!destination) return

        /// for columns changes
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