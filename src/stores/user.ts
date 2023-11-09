import { defineStore } from "pinia";
import type { MyInfo } from "../types/user";

export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: undefined as MyInfo | undefined,
  }),
  actions: {
    logout() {
      this.userInfo = undefined;
    },
  },
  persist: true,
});
