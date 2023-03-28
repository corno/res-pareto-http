import * as pd from 'pareto-core-data'

import {
    string, member, taggedUnion, group,
    typeReference,
    type,
    externalTypeReference,
    ref,
    imp,
    streamconsumer,
    data,
    inf,
    aInterfaceReference,
    aInterfaceMethod,
    constructor,
    boolean,
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import * as g_glossary from "lib-pareto-typescript-project/dist/submodules/glossary"

const d = pd.d

export const $: g_glossary.T.Glossary<pd.SourceLocation> = {
    'parameters': d({}),
    'imports': d({
        "common": imp({}),
    }),
    'root': {
        'namespaces': d({}),
        'types': d({
            "Configuration": type(group({
                "hostName": member(string()),
                "contextPath": member(ref(externalTypeReference("common", "Path"))),
            })),
            "HTTPError": type(taggedUnion({
                "unknown": string(),
            })),
            "EncounteredErrors": type(boolean()),
        }),
    },
    'asynchronous': {
        'interfaces': d({

            //"HandleError": interfaceMethod(typeReference("HTTPError")),
            // "ProcessHTTPResource": func(typeReference("common", "Path"), null, builderReference("Init"), null),
            "Init": aInterfaceMethod(null, ['reference', aInterfaceReference("StreamConsumer")]),
            // "Init": ['choice', {
            //     'options': d({
            //         "success": ['reference', aInterfaceReference("StreamConsumer")],
            //         "error": ['reference', aInterfaceReference("ErrorStreamConsumer")],
            //     })
            // }],
            // "Init": builderMethod(null, ['reference', {
            //     'context': ['local', null],
            //     'interface': "StreamConsumer"
            // }], false),
            "StreamConsumer": stream(
                aInterfaceMethod(externalTypeReference("common", "String")),
                aInterfaceMethod(typeReference("EncounteredErrors")),
            ),
            "ErrorStreamConsumer": stream(
                aInterfaceMethod(typeReference("HTTPError")),
                aInterfaceMethod(null),
            ),
        }),
        'algorithms': d({
            "HTTPRequest": abuilder(externalTypeReference("common", "Path"), {
                "init": aInterfaceReference("Init"),
                "errorConsumer": aInterfaceReference("ErrorStreamConsumer")
            })

        }),
    },
    'synchronous': {
        'interfaces': d({}),
        'algorithms': d({}),
    },

}