import * as pl from 'pareto-core-lib'
import * as ps from 'pareto-core-state'
import * as pv from 'pareto-core-dev'
import * as pa from 'pareto-core-async'
import * as pd from 'pareto-core-data'

import * as g_test from "lib-pareto-test"

import * as g_pub from "../../../../../pub/dist"

import { A } from "../api.generated"

export const $$: A.getTestSet = () => {
    pv.logDebugMessage("START")

    g_pub.$r.httpServer(
        {
            'hostName': "www.nu.nl",
            'contextPath': pd.a([""]),
        },
    ).consume(pd.a([]), {
        'data': ($) => {
            switch ($[0]) {
                case 'data':
                    pl.ss($, ($) => {

                        pv.logDebugMessage($)
                    })
                    break
                case 'error':
                    pl.ss($, ($) => {
                        pv.logDebugMessage("ERROR")
                    })
                    break
                default: pl.au($[0])
            }

        },
        'end': () => {
            pv.logDebugMessage("END")
        }
    })
    const builder = ps.createUnsafeDictionaryBuilder<g_test.T.TestElement>()
    function createTest(name: string, actual: string, expected: string) {
        builder.add(name, {
            'type': ['test', {
                type: ['short string', {
                    actual: actual,
                    expected: expected
                }]
            }]
        })
    }

    return pa.asyncValue({
        elements: builder.getDictionary()
    })
}