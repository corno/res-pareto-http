import * as pi from 'pareto-core-internals'

import * as g_this from "../glossary"

import * as n_http from "http"
import * as n_path from "path"

import { A } from "../api.generated"

export const $$: A.httpServer = ($x) => {
    return {
        'consume': ($, $is) => {
            let ended = false

            let concatenatedPath = ""
            $.__forEach(($) => {
                n_path.join(concatenatedPath, $)
            })

            const options = {
                hostname: $x.hostName,
                //port: 443,
                path: concatenatedPath,
                method: 'GET'
            }

            const req = n_http.request(options, res => {
                res.setEncoding('utf-8')
                //console.log(`statusCode: ${res.statusCode}`)

                res.on('data', $ => {
                    if (ended) {
                        pi.panic(`RECEIVED DATA AFTER END`)

                    }
                    $is.data(['data', $])
                })
                res.on('end', () => {
                    if (ended) {
                        pi.panic(`RECEIVED END MESSAGE AFTER END`)
                    }
                    $is.end()
                })
            })
            req.on('error', error => {
                if (ended) {
                    pi.panic(`RECEIVED ERROR AFTER END`)
                }
                $is.data(['error', ['unknown', error.message]])
            })
            req.end()
        }

    }
}