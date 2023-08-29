import { storage } from "@/appwrite"

export default async function getUrl(image: Image) {
    const url = storage.getFilePreview(image.bucketId, image.fileId)
    return url
}