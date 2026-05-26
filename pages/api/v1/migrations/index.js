import migrationRunner from "node-pg-migrate";
import database from "@/infra/database";
import { join } from "node:path";

export default async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(request.method)) {
    return response.status(405).json({
      error: `Method ${request.method} not allowed`,
    });
  }

  let dbClient;

  try {
    dbClient = await database.getClient();

    const defaultRunnerOptions = {
      dbClient,
      dir: join("infra", "migrations"),
      migrationsTable: "pgmigrations",
      direction: "up",
      verbose: true,
      dryRun: true,
    };

    if (request.method === "GET") {
      const pendingMigrations = await migrationRunner(defaultRunnerOptions);
      response.status(200).json(pendingMigrations);
    }

    if (request.method === "POST") {
      const appliedMigrations = await migrationRunner({
        ...defaultRunnerOptions,
        dryRun: false,
      });
      response.status(201).json(appliedMigrations);
    }
  } catch (error) {
    console.error("Failed to run migrations:", error);
    throw error;
  } finally {
    if (dbClient) {
      await dbClient.end();
    }
  }
}
