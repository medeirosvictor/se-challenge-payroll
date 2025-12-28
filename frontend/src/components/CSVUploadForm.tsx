import React, { useState } from "react";
import { uploadCSV } from "../api/api";

type Props = {};

export default function CSVUploadForm({}: Props) {
  const [status, setStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [currentFileName, setCurrentFileName] = useState<string | null>(null);

  const handleFileSelectionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setCurrentFileName(file.name);
      setStatus("idle");
    }
  };

  const handleCSVUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = event.currentTarget.elements.namedItem(
      "csvUpload"
    ) as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      console.log("Uploading file:", file.name);
      setCurrentFileName(file.name);
      try {
        const resp = await uploadCSV(file);
        console.log("Upload response:", resp);
        setStatus("success");
      } catch (error) {
        console.error("Upload failed:", error);
        setStatus("error");
      }
    }
  };

  return (
    <form
      className="flex flex-col justify-center items-center align-middle"
      onSubmit={handleCSVUpload}
    >
      <label
        htmlFor="csvUpload"
        className={`"block text-[#00ff00] border-b border-dotted ${
          currentFileName ? "font-bold" : "animate-pulse"
        }`}
      >
        {currentFileName ? currentFileName : "> Select Time Report CSV_"}
      </label>
      <div className="relative my-5">
        <input
          type="file"
          id="csvUpload"
          accept=".csv"
          className="hidden"
          onChange={handleFileSelectionChange}
        />
        <label
          htmlFor="csvUpload"
          className="block w-70 p-3  text-[#00ff00] border border-[#00ff00] cursor-pointer hover:bg-[#00ff00] hover:text-black transition-colors duration-150"
        >
          {status === "uploading"
            ? ">>> UPLOADING..."
            : status === "success"
            ? ">>> FILE UPLOADED OK"
            : status === "error"
            ? ">>> UPLOAD FAILED"
            : ">>> BROWSE FILES_"}
        </label>
      </div>
      <button
        type="submit"
        disabled={status === "uploading"}
        className="w-70 p-3 font-bold text-black bg-[#00ff00] border-none cursor-pointer hover:bg-[#00cc00] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
      >
        {status === "uploading" ? ">>> PROCESSING..." : ">>> EXECUTE UPLOAD"}
      </button>
      <div className="mt-4 text-[#00ff00]  opacity-70">
        &gt; Supported formats: time-report-*.csv
        <p>* equals report id</p>
      </div>
      <div className="text-[#00ff00]  opacity-50 animate-pulse mt-1">_</div>
    </form>
  );
}
