import * as pd from 'pareto-core-data'

import {  algorithm, dependent, data, abuilder } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"

import * as g_project from "lib-pareto-typescript-project/dist/submodules/project"
const d = pd.d

export const $: g_project.T.ModuleDefinition.api.root<pd.SourceLocation> =  {
    'algorithms': d({
        "httpRequest": algorithm(abuilder("this", {}, "HTTPRequest"), {}, dependent(data("this", {}, "Configuration"), {
        }, {})),
    }),
}