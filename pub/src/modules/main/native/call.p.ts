import * as api from "../api"

import * as http from "http"
import * as pl from "pareto-core-internals"
import * as pth from "path"

import * as mcommon from "glo-pareto-common"

export function call(
    $: {
        readonly "hostname": string,
        readonly "path": mcommon.TPath,
    },
    $i: {
        onData: (data: string) => void,
        onError: (e: api.THTTPError) => void,
        onEnd: () => void
    }
): void {
    const options = {
        hostname: $.hostname,
        //port: 443,
        path: pth.join(...pl.flatten($.path)),
        method: 'GET'
    }

    const req = http.request(options, res => {
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
        $i.onError(["unknown", error.message])
    })

    req.end()
}