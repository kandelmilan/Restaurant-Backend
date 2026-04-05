import { defineConfig } from "@prisma/client";

export default defineConfig({
  datasources: {
    db: {
      provider: "mysql",
      url: "mysql://root:@127.0.0.1:3306/RestaurantDb", // update if password exists
    },
  },
});