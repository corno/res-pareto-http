import { API } from "./api"
import { $$ as icreateHTTPResourceProcessor } from "./implementations/createHTTPResourceProcessor.p"

export const $a: API = {
    'createHTTPResourceProcessor': icreateHTTPResourceProcessor,
}