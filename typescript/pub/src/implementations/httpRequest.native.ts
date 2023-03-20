import * as pi from 'pareto-core-internals'

import * as g_this from "../glossary"

import * as n_http from "http"
import * as n_path from "path"

import { A } from "../api.generated"

export const $$: A.httpRequest = ($x) => {
    return ($, $is) => {
        let receivedErrors = false
        let state:
            | ['ended', null]
            | ['awaiting', null]
            | ['data transfer started', g_this.ASYNC.I.StreamConsumer]
            = ['awaiting', null]



        const options = {
            hostname: $x.hostName,
            //port: 443,
            path: n_path.join(...pi.flatten($)),
            method: 'GET'
        }

        const req = n_http.request(options, res => {
            res.setEncoding('utf-8')
            //console.log(`statusCode: ${res.statusCode}`)

            res.on('data', $ => {
                if (receivedErrors) {
                    //pi.panic("ENCOUNTERED HTTP ERROR AFTER DATA WAS RECEIVED")
                }
                switch (state[0]) {
                    case 'awaiting':
                        pi.cc(state[1], ($s) => {
                            const ss = $is.init()
                            state = ['data transfer started', ss]
                            ss.data($)
                        })
                        break
                    case 'ended':
                        pi.cc(state[1], ($s) => {
                            pi.panic(`RECEIVED DATA AFTER END`)
                        })
                        break
                    case 'data transfer started':
                        pi.cc(state[1], ($s) => {
                            $s.data($)
                        })
                        break
                    default: pi.au(state[0])
                }
            })
            res.on('end', () => {
                switch (state[0]) {
                    case 'awaiting':
                        pi.cc(state[1], ($s) => {
                            const ss = $is.init()
                            state = ['data transfer started', ss]
                        })
                        break
                    case 'ended':
                        pi.cc(state[1], ($s) => {
                            pi.panic(`RECEIVED END AFTER END`)
                        })
                        break
                    case 'data transfer started':
                        pi.cc(state[1], ($s) => {
                            $s.end(receivedErrors)
                            $is.errorConsumer.end()
                            state = ['ended', null]
                        })
                        break
                    default: pi.au(state[0])
                }
            })
        })

        req.on('error', error => {
            receivedErrors = true
            console.error(`FIX HTTP ERROR HANDLING; ${error.message}`)
            switch (state[0]) {
                case 'awaiting':
                    pi.cc(state[1], ($s) => {
                    })
                    break
                case 'ended':
                    pi.cc(state[1], ($s) => {
                        pi.panic(`RECEIVED ERROR AFTER END`)
                    })
                    break
                case 'data transfer started':
                    pi.cc(state[1], ($s) => {
                    })
                    break
                default: pi.au(state[0])
            }
            $is.errorConsumer.data(['unknown', error.message])
        })

        req.end()


    }
}