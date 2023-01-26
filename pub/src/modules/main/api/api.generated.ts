import * as pt from 'pareto-core-types'

import * as glo from "./glossary"

import * as mcommon from "glo-pareto-common"

export type CcreateHTTPResourceProcessor = ($: glo.TConfiguration, $d: {
    readonly 'onError': glo.FHandleError
    readonly 'onFailed': mcommon.FSignal
    readonly 'onNotExists': mcommon.FSignal
}) => glo.FProcessHTTPResource

export type API = {
    createHTTPResourceProcessor: CcreateHTTPResourceProcessor
}