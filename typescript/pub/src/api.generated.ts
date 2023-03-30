import * as pt from 'pareto-core-types'

import * as g_common from "glo-pareto-common"
import * as g_this from "./glossary"

export namespace D {
    
}

export namespace A {
    
    export type httpServer = ($: g_this.T.Configuration, ) => g_this.ASYNC.A.R.HTTPServer
}

export type API = {
    readonly 'httpServer': A.httpServer
}