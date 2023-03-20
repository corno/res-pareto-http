import * as pt from 'pareto-core-types'

import { T } from "./datatypes.generated"

import * as g_common from "glo-pareto-common"

export namespace ASYNC {
    
    export namespace I {
        
        export type ErrorStreamConsumer = {
            'data': ($: T.HTTPError, ) => void
            'end': () => void
        }
        
        export type Init = () => ASYNC.I.StreamConsumer
        
        export type StreamConsumer = {
            'data': ($: g_common.T.String, ) => void
            'end': ($: T.EncounteredErrors, ) => void
        }
    }
    
    export namespace A {
        
        
        export namespace B {
            export type HTTPRequest = ($: g_common.T.Path, $is: {
                readonly 'errorConsumer': ASYNC.I.ErrorStreamConsumer
                readonly 'init': ASYNC.I.Init
            }) => void
        }
    }
}

export namespace SYNC {
    
    export namespace I {}
    
    export namespace IW {}
    
    export namespace A {}
}