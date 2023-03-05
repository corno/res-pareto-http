import * as pt from 'pareto-core-types'

import * as g_common from "glo-pareto-common"

export namespace T {
    
    export namespace Configuration {
        
        export type contextPath = g_common.T.Path
        
        export type hostName = string
    }
    
    export type Configuration = {
        readonly 'contextPath': g_common.T.Path
        readonly 'hostName': string
    }
    
    export namespace HTTPError {
        
        export type _lunknown = string
    }
    
    export type HTTPError = 
        | ['unknown', string]
}