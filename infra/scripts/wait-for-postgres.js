const { exec } = require("child_process");

function checkPostgresConnection() {
  exec(
    "docker exec easyproj-development pg_isready --host localhost",
    handleConnectionCheck,
  );

  function handleConnectionCheck(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgresConnection();
      return;
    }

    console.log("\n✅ PostgreSQL está pronto!");
  }
}

process.stdout.write("\n\n🔴 Aguardando PostgreSQL...");

checkPostgresConnection();
