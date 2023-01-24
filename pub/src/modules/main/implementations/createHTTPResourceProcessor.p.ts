import * as pi from "pareto-core-internals"

import * as api from "../api"


import { call } from "../native/call.p"

export const $$: api.CcreateHTTPResourceProcessor = ($x, $d) => {
    return ($, $c) => {
        const onError = $d.onError
        let consumer: null | api.IStreamConsumer = null
        return call(
            {
                hostname: $x.hostName,
                path: [$x.contextPath, $],
            },
            {
                onData: ($) => {
                    if (consumer === null) {
                        consumer = $c()
                    }
                    consumer.onData($)
                },
                onError: ($) => {
                    if (consumer !== null) {
                        throw new Error("ENCOUNTERED HTTP ERROR AFTER DATA WAS RECEIVED")
                        //pi.panic("ENCOUNTERED HTTP ERROR AFTER DATA WAS RECEIVED")
                    }
                    onError($)
                    $d.onFailed(null)
                },
                onEnd: () => {
                    if (consumer === null) {
                        console.error("no http data received")
                        consumer = $c() //very strange
                    }
                    consumer.onEnd()
                }
            }
        )
    }
}