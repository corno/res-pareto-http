import * as pt from 'pareto-core-types'

import * as gcommon from "glo-pareto-common"
import * as gthis from "./glossary"

export type CcreateHTTPResourceProcessor = ($: gthis.T.Configuration, $d: {
    readonly 'onError': gthis.FHandleError
    readonly 'onFailed': gcommon.FSignal
    readonly 'onNotExists': gcommon.FSignal
}) => gthis.FProcessHTTPResource

export type API = {
    createHTTPResourceProcessor: CcreateHTTPResourceProcessor
}