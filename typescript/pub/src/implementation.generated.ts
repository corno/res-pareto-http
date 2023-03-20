import { API } from "./api.generated"
import { $$ as ihttpRequest } from "./implementations/httpRequest.native"

export const $r: API = {
    'httpRequest': ihttpRequest,
}