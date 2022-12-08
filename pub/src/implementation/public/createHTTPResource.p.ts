import * as pi from "pareto-core-internals"
import * as api from "../../interface"


import { call } from "../private/call.p"

export const f_createHTTPResource: api.FCreateHTTPResource = ($, $i) => {
    const settings = $
    const onError = $i.onError
    return ($) => {
        let consumer: null | api.PStreamConsumer = null
        return call(
            {
                hostname: settings.hostName,
                path: [settings.contextPath, $.id],
            },
            {
                onData: ($) => {
                    if (consumer === null) {
                        consumer = $i.init()
                    }
                    consumer.onData($)
                },
                onError: ($) => {
                    if (consumer !== null) {
                        throw new Error("ENCOUNTERED HTTP ERROR AFTER DATA WAS RECEIVED")
                        //pi.panic("ENCOUNTERED HTTP ERROR AFTER DATA WAS RECEIVED")
                    }
                    onError($)
                    $i.onFailed()
                },
                onEnd: () => {
                    if (consumer === null) {
                        console.error("no http data received")
                        consumer = $i.init() //very strange
                    }
                    consumer.onEnd()
                }
            }
        )
    }
}
