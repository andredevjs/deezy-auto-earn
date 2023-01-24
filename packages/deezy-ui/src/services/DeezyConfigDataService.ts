import type { LNDConfig } from "@/domain/deezyEarnConfig";
import type { AxiosResponse } from "axios";
import http from "../utils/httpCommon";

class DeezyConfigDataService {
  getAll(): Promise<AxiosResponse<LNDConfig>> {
    return http.get("/config");
  }

  get(id: keyof LNDConfig) {
    return http.get(`/config/${id}`);
  }

  update(config: LNDConfig) {
    return http.put(`/config`, config);
  }

  patch(id: string, data: string) {
    return http.put(`/deezy/${id}`, data);
  }
}

export default new DeezyConfigDataService();
