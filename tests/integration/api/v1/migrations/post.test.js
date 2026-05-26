import database from "@/infra/database";
import orchestrator from "@/tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForServices();
  await database.query("drop schema public cascade; create schema public;");
});

test("POST to /api/v1/migrations should return 201", async () => {
  const firstResponse = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  const firstResponseBody = await firstResponse.json();

  expect(firstResponse.status).toBe(201);
  expect(Array.isArray(firstResponseBody)).toBe(true);
  expect(firstResponseBody.length).toBeGreaterThan(0);

  const secondResponse = await fetch(
    "http://localhost:3000/api/v1/migrations",
    {
      method: "POST",
    }
  );
  const secondResponseBody = await secondResponse.json();

  expect(secondResponse.status).toBe(201);
  expect(Array.isArray(secondResponseBody)).toBe(true);
  expect(secondResponseBody).toHaveLength(0);
});
