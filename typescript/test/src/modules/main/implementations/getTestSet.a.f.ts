
import * as ps from 'pareto-core-state'
import * as pv from 'pareto-core-dev'
import * as pa from 'pareto-core-async'

import * as g_test from "lib-pareto-test"

import * as g_pub from "../../../../../pub/dist"

import { getTestSet } from "../api.generated"

export const $$: getTestSet = () => {
    pv.logDebugMessage("START")

    g_pub.$r.httpRequest(
        {
            'hostName': "www.nu.nl",
            'contextPath': "",
        },
        null,
        null,
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