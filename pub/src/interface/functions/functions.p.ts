import * as pt from "pareto-core-types"
import { PProcessHTTPSResource } from "../procedures/procedures.p"

import { THTTPError } from "../types/HTTPError.p"
import { TPath } from "../types/Path.p";



export type FCreateHTTPResource = (
    $: {
        readonly "hostName": string
        readonly "contextPath": TPath
    },
    $d: {
        readonly "onNotExists": () => void
        readonly "onFailed": () => void
        readonly "init": () => PStreamConsumer
        readonly "onError": ($: THTTPError) => void
    }
) => PProcessHTTPSResource



export type PStreamConsumer = {
    readonly "onData": ($: string) => void
    readonly "onEnd": () => void
}