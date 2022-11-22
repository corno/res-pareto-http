import * as pt from "pareto-core-types"
import { IStreamConsumer } from "../interfaces/StreamConsumer.p"

import { THTTPError } from "../types/HTTPError.p"
import { TPath } from "../types/Path.p";


export type FHTTPResource = (
    $: {
        readonly "id": TPath;
    },
    $i: {
        readonly "onNotExists": () => void
        readonly "onFailed": () => void
        readonly "init": () => IStreamConsumer<string>
    }
) => void

export type FCreateHTTPResource = (
    $: {
        readonly "hostName": string
        readonly "contextPath": TPath
    },
    $i: {
        readonly "onError": ($: THTTPError) => void
    },
) => FHTTPResource
