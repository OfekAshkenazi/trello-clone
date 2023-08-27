'use client'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

export default function Board() {

    return (
        <DragDropContext>
            <Droppable droppableId='board' direction='horizontal' type='column'>

                {(provided) => (
                    <div className="">
                        {/* rendering the coulmns */}
                    </div>
                )}

            </Droppable>

        </DragDropContext>
    )
}