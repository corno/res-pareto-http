import * as pt from "pareto-core-types"
import { TPath } from "../types/Path.p"


// export type PStreamConsumer = pt.Procedure<{
//     readonly "onData": ($: string) => void
//     readonly "onEnd": () => void
// }>

export type PProcessHTTPSResource = pt.Procedure<{
    readonly "id": TPath
}>