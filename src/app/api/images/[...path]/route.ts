import { NextRequest } from "next/server"
import { getStorage } from "@/lib/gcs"
import { Readable } from "node:stream"

export const runtime = "nodejs"

export async function GET(_req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
    const { path } = await ctx.params
    const objectName = path.join("/")

    console.log("Fetching image:", objectName)

    const file = getStorage().bucket(process.env.GCS_BUCKET!).file(objectName)
    const [exists] = await file.exists()
    if (!exists) return new Response("Not found", { status: 404 })

    const [meta] = await file.getMetadata()
    const contentType = meta.contentType || "application/octet-stream"
    const cacheControl = meta.cacheControl || "private, max-age=60"

    const nodeStream = file.createReadStream()
    const webStream = Readable.toWeb(nodeStream) as ReadableStream

    return new Response(webStream, {
        headers: {
            "Content-Type": contentType,
            "Cache-Control": cacheControl,
            ...(meta.etag ? { ETag: meta.etag } : {}),
            ...(meta.size ? { "Content-Length": String(meta.size) } : {}),
            ...(meta.updated ? { "Last-Modified": new Date(meta.updated).toUTCString() } : {}),
        },
    })
}
