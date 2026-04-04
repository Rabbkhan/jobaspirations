import cron from "node-cron";
import { syncExternalJobs } from "../modules/job/job.service.js";

export const initCronJobs = () => {
  // every 6 hours
  cron.schedule("0 */6 * * *", async () => {
    console.log("Cron: running job sync...");
    try {
      await syncExternalJobs();
    } catch (err) {
      console.error("Cron sync failed:", err.message);
    }
  });

  console.log("Cron jobs initialized");
};
