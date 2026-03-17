import { createPlantsApi } from "@dziki-zielnik/api-client";
import { apiClient } from "./apiClient";

export const plantsApi = createPlantsApi(apiClient);
