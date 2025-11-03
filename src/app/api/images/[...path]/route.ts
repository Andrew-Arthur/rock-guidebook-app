import { NextRequest } from "next/server"
import { getStorage } from "@/lib/gcs"
import { Readable } from "node:stream"

export const runtime = "nodejs"

export async function GET(_req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
    const { path } = await ctx.params
    const objectName = path.join("/")

    console.log("Fetching image:", objectName)

    const bucket = process.env.GCS_BUCKET!
    const file = getStorage().bucket(bucket).file(objectName)

    try {
        const [meta] = await file.getMetadata()

        const nodeStream = file.createReadStream()
        const webStream = Readable.toWeb(nodeStream) as ReadableStream

        return new Response(webStream, {
            headers: {
                "Content-Type": meta.contentType || "application/octet-stream",
                "Cache-Control": meta.cacheControl || "private, max-age=60",
                ...(meta.etag ? { ETag: meta.etag } : {}),
                ...(meta.size ? { "Content-Length": String(meta.size) } : {}),
                ...(meta.updated ? { "Last-Modified": new Date(meta.updated).toUTCString() } : {}),
            },
        })
    } catch (e: any) {
        if ((e?.code || e?.statusCode) === 404) return new Response("Not found", { status: 404 })
        console.error("GCS error:", e)
        return new Response("Internal error", { status: 500 })
    }
}
