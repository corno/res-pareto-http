import { API } from "./api"
import { $$ as icreateHTTPResourceProcessor } from "./implementations/createHTTPResourceProcessor.native"

export const $a: API = {
    'createHTTPResourceProcessor': icreateHTTPResourceProcessor,
}