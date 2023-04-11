import { API } from "./api.generated"
import { $$ as ihttpServer } from "./implementations/httpServer.native"

export const $api: API = {
    'httpServer': ihttpServer,
}