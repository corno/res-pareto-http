import * as pt from 'pareto-core-types'

import * as mcommon from "glo-pareto-common"

export namespace T {
    
    export namespace Configuration {
        
        export type contextPath = mcommon.T.Path
        
        export type hostName = string
    }
    
    export type Configuration = {
        readonly 'contextPath': mcommon.T.Path
        readonly 'hostName': string
    }
    
    export namespace HTTPError {
        
        export type _lunknown = string
    }
    
    export type HTTPError = 
        | ['unknown', string]
}