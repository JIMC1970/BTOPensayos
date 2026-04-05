export default function stringifyObject(obj: Record<string, string>): string {
    const res =  Object.entries(obj)
        .map(([key, value]) => `${key} ${value}`)
        .join("\n")

    return res
}