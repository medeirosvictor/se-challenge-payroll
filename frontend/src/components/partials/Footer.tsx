import { useState, useEffect } from "react";
import { healthCheck } from "../../api/api";

type BackendHealth = {
  status: string;
  message: string;
};
function Footer() {
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
    <footer className="absolute bottom-0 right-0 flex items-center gap-1 p-1">
      {backendHealth ? (
        <>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span>Backend Online</span>
        </>
      ) : error ? (
        <>
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span>Backend Offline</span>
        </>
      ) : (
        <span>Loading...</span>
      )}
    </footer>
  );
}

export default Footer;
