import { createAuthApi } from "@dziki-zielnik/api-client";
import { apiClient } from "./apiClient";

export const authApi = createAuthApi(apiClient);
