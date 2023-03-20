
import * as ps from 'pareto-core-state'
import * as pv from 'pareto-core-dev'
import * as pa from 'pareto-core-async'

import * as gtest from "lib-pareto-test"

import * as gpub from "../../../../../pub/dist"

import { getTestSet } from "../api.generated"

export const $$: getTestSet = () => {
    pv.logDebugMessage("START")

    gpub.$r.httpRequest(
        {
            'hostName': "www.nu.nl",
            'contextPath': "",
        },
        null,
        null,
        // onError: () => {
        //     pv.implementMe(`XSSDF`)
        // },
        // onFailed: () => {
        //     pv.implementMe(`XSSDF`)

        // },
        // onNotExists: () => {
        //     pv.implementMe(`XSSDF`)
        // }

    )([], {
        'errorConsumer': {
            'data': () => {
                pv.logDebugMessage("HTTPERROR")

            },
            'end': () => {
                pv.logDebugMessage("ERRORSTREAM ENDED")
            }
        },
        'init': () => {
            return {
                'data': ($) => {
                    pv.logDebugMessage($)

                },
                'end': () => {
                    pv.logDebugMessage("ENDED")
                },
            }
        },
    })
    const builder = ps.createUnsafeDictionaryBuilder<gtest.T.TestElement>()
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