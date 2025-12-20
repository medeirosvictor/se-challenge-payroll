import React from "react";

type Props = {};

export default function CSVUploadForm({}: Props) {
  const handleCSVUpload = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = event.currentTarget.elements.namedItem(
      "csvUpload"
    ) as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      // Handle the CSV file upload logic here
      console.log("Uploaded file:", file.name);
    }
  };
  return (
    <form onSubmit={handleCSVUpload}>
      <label
        htmlFor="csvUpload"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Upload CSV File:
      </label>
      <input type="file" id="csvUpload" accept=".csv" />
    </form>
  );
}
