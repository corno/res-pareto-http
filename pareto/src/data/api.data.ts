import * as pd from 'pareto-core-data'
import {
    reference,
    string,
    nested,
    array,
    typeReference,
    interfaceReference,
    null_,
    method, dictionary, group, member, taggedUnion, types, func, data, type
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"


import { definitionReference, constructor, algorithm } from "lib-pareto-typescript-project/dist/submodules/moduleDefinition/shorthands"
import * as gmoduleDefinition from "lib-pareto-typescript-project/dist/submodules/moduleDefinition"

const d = pd.d

export const $: gmoduleDefinition.T.ModuleDefinition<pd.SourceLocation> = {
    'glossary': {
        'imports': d({
            "common": "glo-pareto-common",
        }),
        'parameters': d({}),
        'types': d({
            "Configuration": type(group({
                "hostName": member(string()),
                "contextPath": member(reference("common", "Path"))
            })),
            "HTTPError": type(taggedUnion({
                "unknown": string()
            })),
        }),
        'interfaces': d({
            "Init": method(null, ['reference', {
                'context': ['local', {}],
                'interface': "StreamConsumer"
            }], false),
            "StreamConsumer": ['group', {
                'members': d({
                    "onData": method(typeReference("common", "String")),
                    "onEnd": method(null)
                })
            }]
        }),
        'functions': d({
            "HandleError": func(typeReference("HTTPError"), null, null, null),
            "ProcessHTTPResource": func(typeReference("common", "Path"), null, interfaceReference("Init"), null),
        }),
    },
    'api': {
        'imports': d({
            "common": "glo-pareto-common",
        }),
        'algorithms': d({
            "createHTTPResourceProcessor": algorithm(definitionReference("ProcessHTTPResource"), constructor(typeReference("Configuration"), {
                "onNotExists": definitionReference("common", {}, "Signal"),
                "onFailed": definitionReference("common", {}, "Signal"),
                "onError": definitionReference("HandleError"),
            })),
        })
    },
}