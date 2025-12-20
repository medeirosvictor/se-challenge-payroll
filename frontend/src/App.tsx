import { useState, useEffect } from "react";
import "./App.css";
import CSVUploadForm from "./components/CSVUploadForm";
import { healthCheck } from "./api/api";

type BackendHealth = {
  status: string;
  message: string;
};

function App() {
  const [backendHealth, setBackendHealth] = useState<BackendHealth | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const data = await healthCheck();
        setBackendHealth(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Connection failed");
        setBackendHealth(null);
      }
    };
    testConnection();
  }, []);

  return (
    <>
      <div className="card">
        <CSVUploadForm />
      </div>
      <footer>
        {backendHealth && (
          <div>
            Status: {backendHealth.status} | Message: {backendHealth.message}
          </div>
        )}
        {error && <div style={{ color: "red" }}>Error: {error}</div>}
        {!backendHealth && !error && <div>Loading...</div>}
      </footer>
    </>
  );
}

export default App;
