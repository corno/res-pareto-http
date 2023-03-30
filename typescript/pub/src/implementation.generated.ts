import { API } from "./api.generated"
import { $$ as ihttpServer } from "./implementations/httpServer.native"

export const $r: API = {
    'httpServer': ihttpServer,
}