
import * as api from "api-pareto-http"
import { call } from "./call"

export const createHTTPResource: api.CreateHTTPResource = ($, $i) => {
    const settings = $
    const onError = $i.onError
    return {
        get: ($, $i) => {
            let consumer: null | api.StreamConsumer<string> = null
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
                        throw new Error("ENCOUNTERED HTTP ERROR AFTER DATA WAS RECEIVED")
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
