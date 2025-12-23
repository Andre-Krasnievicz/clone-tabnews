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

function DatabaseHealth() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let versionDatabase = "Carregando...";
  let maxConnectionsDatabase = "Carregando...";
  let openedConnectionsDatabase = "Carregando...";

  if (!isLoading && data) {
    versionDatabase = data.dependencies.database.version;
    maxConnectionsDatabase = data.dependencies.database.max_connections;
    openedConnectionsDatabase = data.dependencies.database.opened_connections;
  }

  return (
    <div>
      <ul>
        <li>Conexões máximas: {versionDatabase}</li>
        <li>Conexões máximas: {maxConnectionsDatabase}</li>
        <li>Conexões máximas: {openedConnectionsDatabase}</li>
      </ul>
    </div>
  );
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <h1>Database Health</h1>
      <DatabaseHealth />
    </>
  );
}
