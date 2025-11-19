import { defineConfig, env } from "prisma/config";
import {config} from "dotenv"

config()


export default defineConfig({
  schema: "prisma/schema/schema.prisma",
  migrations: {
    path: "prisma/schema/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
