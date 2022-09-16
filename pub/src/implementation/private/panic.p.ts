export function panic(msg:string): never {
    throw new Error(msg)
}