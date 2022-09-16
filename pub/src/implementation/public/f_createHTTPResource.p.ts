
import * as api from "api-pareto-http"
import { call } from "../private/call.p"
import { panic } from "../private/panic.p"

export const f_createHTTPResource: api.FCreateHTTPResource = ($, $i) => {
    const settings = $
    const onError = $i.onError
    return ($, $i, $a) => {
        let consumer: null | api.IStreamConsumer<string> = null
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
                        panic("ENCOUNTERED HTTP ERROR AFTER DATA WAS RECEIVED")
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
