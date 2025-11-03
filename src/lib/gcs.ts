// lib/gcs.ts
import { Storage, StorageOptions } from "@google-cloud/storage"
import { randomUUID } from "crypto"

let storage: Storage

export function getStorage() {
    if (storage) return storage

    const opts: StorageOptions = {
        projectId: process.env.GCP_PROJECT_ID,
    }

    const emulatorRaw = process.env.GCS_EMULATOR_HOST
    const isEmulator = !!emulatorRaw

    const credentialsFile = process.env.GOOGLE_APPLICATION_CREDENTIALS
    const isRealGCP = !!credentialsFile

    if (isEmulator) {
        opts.apiEndpoint = emulatorRaw
        opts.useAuthWithCustomEndpoint = false
    } else if (isRealGCP) {
        opts.keyFilename = credentialsFile
    }

    return (storage = new Storage(opts))
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
