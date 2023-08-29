import { ID, storage } from "@/appwrite"

export default async function uploadImage(file: File) {
    if (!file) return

    const fileUploaded = await storage.createFile(
        "64eb5fa99c15e646546f",
        ID.unique(),
        file
    )

    return fileUploaded

}