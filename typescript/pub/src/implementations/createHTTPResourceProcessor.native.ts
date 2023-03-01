import * as pi from 'pareto-core-internals'

import * as gapi from "../api"
import * as gcommon from "glo-pareto-common"

import * as nhttp from "http"
import * as npth from "path"

import { CcreateHTTPResourceProcessor } from "../api"

export const $$:CcreateHTTPResourceProcessor = ($x, $d) => {
    return ($, $c) => {
        const onError = $d.onError
        let consumer: null | gapi.IStreamConsumer = null
        function call(
            $: {
                readonly "hostname": string,
                readonly "path": gcommon.T.Path,
            },
            $i: {
                onData: (data: string) => void,
                onError: (e: gapi.T.HTTPError) => void,
                onEnd: () => void
            }
        ): void {
            const options = {
                hostname: $.hostname,
                //port: 443,
                path: npth.join(...pi.flatten($.path)),
                method: 'GET'
            }
        
            const req = nhttp.request(options, res => {
                res.setEncoding('utf-8')
                //console.log(`statusCode: ${res.statusCode}`)
        
                res.on('data', d => {
                    $i.onData(d)
                })
                res.on('end', () => {
                    $i.onEnd()
                })
            })
        
            req.on('error', error => {
                console.error(`FIX HTTP ERROR HANDLING; ${error.message}`)
                $i.onError(['unknown', error.message])
            })
        
            req.end()
        }
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