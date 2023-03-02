import { API } from "./definition/api.generated"
import { $$ as icreateHTTPResourceProcessor } from "./implementations/createHTTPResourceProcessor.native"

export const $a: API = {
    'createHTTPResourceProcessor': icreateHTTPResourceProcessor,
}