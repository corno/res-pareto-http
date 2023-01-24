import * as pt from 'pareto-core-types'
import * as mcommon from "glo-pareto-common"

export type TConfiguration = {
    readonly 'contextPath': mcommon.TPath
    readonly 'hostName': string
}

export type THTTPError = 
    | ['unknown', string]

export type IInit = () => IStreamConsumer

export type IStreamConsumer = {
    'onData': ($: mcommon.TString, ) => void
    'onEnd': () => void
}

export type FHandleError = ($: THTTPError,) => void

export type FProcessHTTPResource = ($: mcommon.TPath, $i: IInit,) => void