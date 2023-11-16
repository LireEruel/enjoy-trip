import { defineStore } from "pinia";
import { PlanBase } from "@/features/plan";

export const usePlanStore = defineStore("plan", {
  state: () => ({
    currentPlan: undefined as PlanBase | undefined,
  }),
  persist: true,
});
