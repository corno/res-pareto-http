import * as pd from 'pareto-core-data'

import {
    string,
    null_,
    nested,
    dictionary, member, taggedUnion, types, group,
    array,
    typeReference,
    data,
    func,
    type,
    optional,
    reference,
    number,
    method,
    interfaceReference,
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import * as gglossary from "lib-pareto-typescript-project/dist/submodules/glossary"
const d = pd.d

export const $: gglossary.T.Glossary<pd.SourceLocation> =  {
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
            'context': ['local', null],
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
}