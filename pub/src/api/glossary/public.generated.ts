import * as pt from 'pareto-core-types'

import * as t from './types.generated'

import * as mcommon from "glo-pareto-common"

export type TConfiguration = t.UConfiguration

export type THTTPError = t.UHTTPError

export type IInit = () => IStreamConsumer

export type IStreamConsumer = {
    'onData': ($: mcommon.TString, ) => void
    'onEnd': () => void
}

export type FHandleError = ($: THTTPError,) => void

export type FProcessHTTPResource = ($: mcommon.TPath, $i: IInit,) => void