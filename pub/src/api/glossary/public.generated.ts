import * as pt from 'pareto-core-types'

import { T   } from './types.generated'

import * as mcommon from "glo-pareto-common"

export type IInit = () => IStreamConsumer

export type IStreamConsumer = {
    'onData': ($: mcommon.T.String, ) => void
    'onEnd': () => void
}

export type FHandleError = ($: T.HTTPError,) => void

export type FProcessHTTPResource = ($: mcommon.T.Path, $i: IInit,) => void