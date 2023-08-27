'use client'

import { useBoardStore } from "@/store/BoardStore";
import { useEffect } from "react"
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import Column from "./column";

export default function Board() {

    const [getBoard, board] = useBoardStore((state) => [state.getBoard, state.board])

    useEffect(() => {
        getBoard()
    }, [getBoard])

    const handleOnDragEnd = (result: DropResult) => {

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