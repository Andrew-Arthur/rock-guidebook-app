export async function toJson<T>(p: Promise<T>): Promise<T> {
    const v = await p
    return JSON.parse(JSON.stringify(v)) as T
}
