import * as pd from 'pareto-core-data'

import * as gproject from "lib-pareto-typescript-project/dist/submodules/project"

const d = pd.d


import { $ as api } from "./api.data"
import { $ as glossary } from "./glossary.data"


export const $: gproject.T.Project<pd.SourceLocation> = {
    'author': "Corno",
    'description': "a pareto wrapper around the HTTP library of NodeJS",
    'license': "TBD",

    'dependencies': d({
        "glo-pareto-common": {},
    }),
    'type': ['resource', {
        'definition': {
            'glossary': glossary,
            'api': api,
        },
        'nativeDependencies': d({}),
        'devDependencies': d({
            "@types/node": {},
        }),
        'test': {
            'dependencies': d({
            }),
            'glossary': {
                'functions': d({}),
                'imports': d({}),
                'parameters': d({}),
                'types': d({}),
                'interfaces': d({}),
            },
        }
    }],
}