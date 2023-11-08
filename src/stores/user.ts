import { defineStore } from "pinia";
import type { MyInfo } from "../types/user";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      user_info: undefined as MyInfo | undefined,
    };
  },
  persist: true,
});
