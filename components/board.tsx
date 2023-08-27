'use client'

import { useBoardStore } from "@/store/BoardStore";
import { useEffect } from "react"
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

export default function Board() {

    const getBoard = useBoardStore((state) => state.getBoard)

    useEffect(() => {
        // get board
        getBoard()

    }, [getBoard])

    return (
        <h1>hello</h1>
        // <DragDropContext>
        //     <Droppable droppableId='board' direction='horizontal' type='column'>

        //         {(provided) => (
        //             <div className="">
        //                 {/* rendering the coulmns */}
        //             </div>
        //         )}

        //     </Droppable>

        // </DragDropContext>
    )
}