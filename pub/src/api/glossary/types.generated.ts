import * as pt from 'pareto-core-types'

import * as gcommon from "glo-pareto-common"

export namespace T {
    
    export namespace Configuration {
        
        export type contextPath = gcommon.T.Path
        
        export type hostName = string
    }
    
    export type Configuration = {
        readonly 'contextPath': gcommon.T.Path
        readonly 'hostName': string
    }
    
    export namespace HTTPError {
        
        export type _lunknown = string
    }
    
    export type HTTPError = 
        | ['unknown', string]
}