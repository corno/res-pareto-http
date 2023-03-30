import * as pt from 'pareto-core-types'

import { T } from "./datatypes.generated"

import * as g_common from "glo-pareto-common"

export namespace ASYNC {
    
    export namespace I {
        
        export type Consumer = {
            'data': ($: T.Data, ) => void
            'end': () => void
        }
    }
    
    export namespace A {
        
        
        export namespace R {
            export type HTTPServer = {
                'consume': (
                    $: g_common.T.Path,
                    $i: ASYNC.I.Consumer
                ) => void
            }
        }
    }
}

export namespace SYNC {}