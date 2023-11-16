import { defineStore } from "pinia";

export const useCommonStore = defineStore("user", {
  state: () => ({
    isOpenAddPlanModal: false as boolean,
  }),
  actions: {
    setIsOpenAddPlanModal(value: boolean): void {
      this.isOpenAddPlanModal = value;
    },
  },
  persist: true,
});
