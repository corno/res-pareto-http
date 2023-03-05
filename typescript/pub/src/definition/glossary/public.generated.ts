import * as pt from 'pareto-core-types'

import { T } from './types.generated'

import * as g_common from "glo-pareto-common"

export namespace I {}

export namespace B {}

export namespace F {
    
    export type HandleError = ($: T.HTTPError,) => void
    
    export type ProcessHTTPResource = ($: g_common.T.Path, $b: B.Init,) => void
}