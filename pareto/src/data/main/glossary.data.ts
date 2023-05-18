import * as pd from 'pareto-core-data'

import {
    aInterface, aInterfaceMethod, aInterfaceReference, boolean, externalTypeReference,
    group, imp, member, ref, resource, streamconsumer, string, taggedUnion, type, typeReference
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import * as g_glossary from "lib-pareto-typescript-project/dist/submodules/glossary"

const d = pd.d

export const $: g_glossary.T.Glossary<pd.SourceLocation> = {
    'glossary parameters':d({}),
    'imports': d({
        "common": imp(),
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
            "Data": type(taggedUnion({
                "error": ref(typeReference("HTTPError")),
                "data": string()
            }))
        }),
    },
    'asynchronous': {
        'interfaces': d({

            //"HandleError": interfaceMethod(typeReference("HTTPError")),
            // "ProcessHTTPResource": func(typeReference("common", "Path"), null, builderReference("Init"), null),
            //"Init": aInterface(aInterfaceMethod(null, ['reference', aInterfaceReference("StreamConsumer")])),
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
            // "StreamConsumer": aInterface(streamconsumer(
            //     aInterfaceMethod(externalTypeReference("common", "String")),
            //     aInterfaceMethod(typeReference("EncounteredErrors")),
            // )),
            "Consumer": aInterface(streamconsumer(
                aInterfaceMethod(typeReference("Data")),
                aInterfaceMethod(null),
            )),
        }),
        'algorithms': d({
            "HTTPServer": resource(externalTypeReference("common", "Path"), aInterfaceReference("Consumer"))
            // "HTTPRequest": a(, {
            //     "init": aInterfaceReference("Init"),
            //     "errorConsumer": aInterfaceReference("ErrorStreamConsumer")
            // })

        }),
    },
    'synchronous': {
        'interfaces': d({}),
        'algorithms': d({}),
    },

}