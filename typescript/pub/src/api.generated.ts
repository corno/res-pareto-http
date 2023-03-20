import * as pt from 'pareto-core-types'

import * as g_common from "glo-pareto-common"
import * as g_this from "./glossary"

export namespace A {
    
    export type httpRequest = ($: g_this.T.Configuration, $d: null, $se: null) => g_this.ASYNC.A.B.HTTPRequest
}

export type API = {
    readonly 'httpRequest': A.httpRequest
}