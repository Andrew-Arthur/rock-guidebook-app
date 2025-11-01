// lib/gcs.ts
import { Storage } from "@google-cloud/storage"
import { randomUUID } from "crypto"

let storage: Storage

export function getStorage() {
    if (storage) return storage

    if (process.env.GCP_SA_KEY_BASE64) {
        // Decode and parse the base64-encoded JSON key
        const key = JSON.parse(
            Buffer.from(process.env.GCP_SA_KEY_BASE64, "base64").toString("utf8"),
        )
        storage = new Storage({
            projectId: key.project_id,
            credentials: {
                client_email: key.client_email,
                private_key: key.private_key,
            },
        })
    } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        // Local dev path (points to downloaded JSON file)
        storage = new Storage({
            keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
            projectId: process.env.GCP_PROJECT_ID,
        })
    } else {
        // Fallback: use ADC (Application Default Credentials) if on GCP infra
        storage = new Storage()
    }

    return storage
}

export async function uploadImage(file: File): Promise<string> {
    if (!file.type.startsWith("image/")) throw new Error("Only image uploads allowed")
    if (file.size > 10 * 1024 * 1024) throw new Error("Image too large (max 10MB)")

    const storage = getStorage()
    const bucket = storage.bucket(process.env.GCS_BUCKET!)

    const ext = file.type.replace("image/", "")
    const objectName = `uploads/${new Date().toISOString().slice(0, 10)}/${randomUUID()}.${ext}`
    const gcsFile = bucket.file(objectName)

    const bytes = Buffer.from(await file.arrayBuffer())
    await gcsFile.save(bytes, {
        contentType: file.type,
        resumable: false,
        metadata: { cacheControl: "public, max-age=31536000, immutable" },
    })
    return objectName
}
