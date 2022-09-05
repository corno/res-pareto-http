
import * as api from "api-pareto-http"
import { call } from "../private/call"
import { panic } from "../private/panic"

export const createHTTPResource: api.XCreateHTTPResource = ($, $i) => {
    const settings = $
    const onError = $i.onError
    return {
        get: ($, $i) => {
            let consumer: null | api.IStreamConsumer<string> = null
            return call(
                settings.hostName,
                [settings.contextPath, $.id],
                ($) => {
                    if (consumer === null) {
                        consumer = $i.init()
                    }
                    consumer.onData($)
                },
                ($) => {
                    if (consumer !== null) {
                        panic("ENCOUNTERED HTTP ERROR AFTER DATA WAS RECEIVED")
                    }
                    onError($)
                    $i.onFailed()
                },
                () => {
                    if (consumer === null) {
                        console.error("no http data received")
                        consumer = $i.init() //very strange
                    }
                    consumer.onEnd()
                }
            )
        }
    }
}
