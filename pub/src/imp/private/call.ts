import * as http from "http"
import * as pl from "pareto-core-internals"
import * as pt from "pareto-core-types"
import * as api from "api-pareto-http"
import * as pth from "path"

// export function createHTTPErrorMessage($: api.HTTPError): string {
//     switch ($[0]) {
//         case "unknown": 
//             return pl.cc($[1], ($) => {
//                 return `unknown http error: ${$}`
//             })
//         default: return pl.au($[0])
//     }
// }

export function call(
    hostname: string,
    path: api.TPath,
    onData: (data: string) => void,
    onError: (e: api.THTTPError) => void,
    onEnd: () => void
): pt.AsyncNonValue {
    return {
        execute: (cb) => {
            const options = {
                hostname: hostname,
                //port: 443,
                path: pth.join(...pl.flatten(path)),
                method: 'GET'
            }

            const req = http.request(options, res => {
                res.setEncoding('utf-8')
                //console.log(`statusCode: ${res.statusCode}`)

                res.on('data', d => {
                    onData(d)
                })
                res.on('end', () => {
                    onEnd()
                    cb()
                })
            })

            req.on('error', error => {
                console.error(`FIX HTTP ERROR HANDLING; ${error.message}`)
                onError(["unknown", error.message])
            })

            req.end()
        }

    }
}