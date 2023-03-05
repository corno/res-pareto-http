import * as pt from 'pareto-core-types'

import * as g_common from "glo-pareto-common"
import * as g_this from "./glossary"

export type createHTTPResourceProcessor = ($: g_this.T.Configuration, $d: {
    readonly 'onError': g_this.F.HandleError
    readonly 'onFailed': g_common.F.Signal
    readonly 'onNotExists': g_common.F.Signal
}) => g_this.F.ProcessHTTPResource

export type API = {
    createHTTPResourceProcessor: createHTTPResourceProcessor
}