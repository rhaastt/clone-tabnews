test("GET to api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
  console.log("Data de atualização: " + parsedUpdatedAt);

  expect(responseBody.dependecies.database.version).toEqual("16.0");
  console.log(
    "Versão do banco de dados deve ser: " +
      responseBody.dependecies.database.version,
  );

  expect(responseBody.dependecies.database.max_connections).toEqual(100);
  console.log(
    "O maximo de conexões deve ser: " +
      responseBody.dependecies.database.max_connections,
  );

  expect(responseBody.dependecies.database.opened_connections).toEqual(1);
  console.log(
    "Conexões abertas deve ser: " +
      responseBody.dependecies.database.opened_connections,
  );
});
