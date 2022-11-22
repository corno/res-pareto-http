import * as api from "../../interface"

export type TResult =
| ["success", string]
| ["error", api.THTTPError]