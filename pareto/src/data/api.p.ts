import * as pr from 'pareto-core-raw'
import {
    externalReference as er,
    string as str,
    reference as ref,
    boolean as bln,
    number as nr,
    nested,
    optional,
    array,
    typeReference,
    externalTypeReference,
    callback,
    interfaceReference,
    procedure,
    null_,
    method,
} from "lib-pareto-typescript-project/dist/modules/glossary/api/shorthands.p"
import { dictionary, group, member, taggedUnion, types, _function } from "lib-pareto-typescript-project/dist/modules/glossary/api/shorthands.p"


import { definitionReference, externalDefinitionReference, constructor } from "lib-pareto-typescript-project/dist/modules/moduleDefinition/api/shorthands.p"
import * as mmoduleDefinition from "lib-pareto-typescript-project/dist/modules/moduleDefinition"

const d = pr.wrapRawDictionary
const a = pr.wrapRawArray


export const $: mmoduleDefinition.TModuleDefinition = {
    'glossary': {
        'imports': d({
            "common": "glo-pareto-common",
        }),
        'parameters': d({}),
        'types': types({
            "Configuration": group({
                "hostName": member(str()),
                "contextPath": member(er("common", "Path"))
            }),
            "HTTPError": taggedUnion({
                "unknown": str()
            })
        }),
        'interfaces': d({
            "Init": method(null, ['reference', {
                'context': ['local', null],
                'interface': "StreamConsumer"
            }], false),
            "StreamConsumer": ['group', {
                'members': d({
                    "onData": method(externalTypeReference("common", "String")),
                    "onEnd": method(null)
                })
            }]
        }),
        'functions': d({
            "HandleError": procedure(typeReference("HTTPError")),
            "ProcessHTTPResource": callback(externalTypeReference("common", "Path"), interfaceReference("Init")),
        }),
    },
    'api': {
        'imports': d({
            "common": "glo-pareto-common",
        }),
        'algorithms': d({
            "createHTTPResourceProcessor": {
                'definition': definitionReference("ProcessHTTPResource"),
                'type': constructor(typeReference("Configuration"), {
                    "onNotExists": externalDefinitionReference("common", "Signal"),
                    "onFailed": externalDefinitionReference("common", "Signal"),
                    "onError": definitionReference("HandleError"),
                }),
            }
        })
    },
}