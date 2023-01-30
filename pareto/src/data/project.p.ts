import * as pr from 'pareto-core-raw'

import * as mproject from "lib-pareto-typescript-project/dist/modules/project"

const d = pr.wrapRawDictionary

import { $ as api } from "./api.p"

export const $: mproject.TProject = {
    'name': "res-pareto-collation",

    'author': "Corno",
    'description': "a pareto wrapper around the HTTP library of NodeJS",
    'license': "ISC",

    'pubdependencies': d({
        "glo-pareto-common": {},
    }),
    'type': ['resource', {
        'definition': api,
        'devDependencies': d({
            "@types/node": {},
        }),
        'test': {
            'dependencies': d({
            }),
        }
    }],
}