import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();

  return responseBody;
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.update_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {updatedAtText}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseInformation = "Carregando...";

  if (!isLoading && data) {
    databaseInformation = (
      <>
        <div>
          <ul>
            <li>Versão: {data.dependencies.database.version}</li>
            <li>
              Conexões máximas: {data.dependencies.database.max_connections}
            </li>
            <li>
              Conexões abertas: {data.dependencies.database.opened_connections}
            </li>
          </ul>
        </div>
      </>
    );
  }

  return (
    <>
      <h2>Database</h2>
      <div>{databaseInformation}</div>
    </>
  );
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}
