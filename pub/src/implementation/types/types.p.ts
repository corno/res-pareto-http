import * as api from "api-pareto-http"

export type TResult =
| ["success", string]
| ["error", api.THTTPError]