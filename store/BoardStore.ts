import { databases, storage } from '@/appwrite';
import { getTodosGroupedByColumns } from '@/lib/getTodosGroupedByColumns';
import { create } from 'zustand'

interface BoardState {
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void;
    upDateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
    searchString: string;
    setSearchString: (searchString: string) => void;
    deleteTask: (taskIndex: number, todoId: Todo, id: TypedColumn) => void;
    newTaskInput: string;
    setNewTaskInput: (input:string) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
    board: {
        columns: new Map<TypedColumn, Column>()
    },

    searchString: "",
    newTaskInput: "",
    setSearchString: (searchString) => set({ searchString }),

    getBoard: async () => {
        const board = await getTodosGroupedByColumns()
        set({ board })
    },

    setBoardState: (board) => set({ board }),

    upDateTodoInDB: async (todo, columnId) => {
        await databases.updateDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            todo.$id,
            {
                title: todo.title,
                status: columnId
            }
        )
    },

    deleteTask: async (taskIndex: number, todo: Todo, id: TypedColumn) => {
        const newColumns = new Map(get().board.columns)

        newColumns.get(id)?.todos.splice(taskIndex, 1)

        // optimstic way
        set({board: {columns: newColumns}})

        if(todo.image) {
            await storage.deleteFile(todo.image.bucketId, todo.image.fileId)
        }

        await databases.deleteDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            todo.$id
        )

    },
    
    setNewTaskInput: (input:string) => set({newTaskInput: input}),
    
}))

