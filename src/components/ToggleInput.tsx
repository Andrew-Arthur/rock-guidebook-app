import { useEffect, useRef, useState } from "react"

export default function ToggleInput<T extends number | string>({
    name,
    value,
    edit,
    multiline = false,
}: {
    name: string
    value: T
    edit: boolean
    multiline?: boolean
}) {
    const [valueLocal, setValueLocal] = useState<T>(value)

    useEffect(() => {
        setValueLocal(value)
    }, [edit, value])

    const text = String(valueLocal ?? "")
    const needsExtraRow = text === "" || /\r?\n$/.test(text)

    return (
        <span className={`relative inline-block ${multiline ? "w-full" : ""}`}>
            <span className={`whitespace-pre-wrap`}>{text}</span>
            {needsExtraRow && <br aria-hidden="true" />}
            {edit &&
                (multiline ? (
                    <textarea
                        name={name}
                        className="absolute inset-0 m-0 p-0 -mx-1 px-1 text-transparent bg-transparent caret-black outline-1 outline-blue-500 rounded-sm resize-none"
                        value={text}
                        onChange={(e) => setValueLocal(e.target.value as T)}
                    />
                ) : (
                    <input
                        name={name}
                        type={typeof value === "number" ? "number" : "text"}
                        className="absolute inset-0 m-0 p-0 -mx-1 px-1 text-transparent bg-transparent caret-black outline-1 outline-blue-500 rounded-sm"
                        size={String(value ?? "").length || 1}
                        value={valueLocal}
                        onChange={(e) => setValueLocal(e.target.value as T)}
                    />
                ))}
        </span>
    )
}
