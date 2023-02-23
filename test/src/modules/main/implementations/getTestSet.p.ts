
import * as ps from 'pareto-core-state'
import * as pv from 'pareto-core-dev'
import * as pa from 'pareto-core-async'

import * as mtest from "lib-pareto-test"
import * as mapi from "../api"
import * as mpub from "../../../../../pub"

export const $$: mapi.CgetTestSet = () => {
    pv.logDebugMessage("START")

    mpub.$a.createHTTPResourceProcessor(
        {
            'hostName': "www.nu.nl",
            'contextPath': "",
        },
        {
            onError: () => {
                pv.implementMe(`XSSDF`)
            },
            onFailed: () => {
                pv.implementMe(`XSSDF`)

            },
            onNotExists: () => {
                pv.implementMe(`XSSDF`)
            }
        }
    )([], () => {
        return {
            onData: ($) => {
                pv.logDebugMessage($)
            },
            onEnd: () => {
                pv.logDebugMessage("ENDED")
            }
        }
    })
    const builder = ps.createUnsafeDictionaryBuilder<mtest.T.TestElement>()
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