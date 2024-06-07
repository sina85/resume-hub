"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { MaximizeIcon, XIcon } from "@/components/ui/icons";

const TextEditor = ({ selectedFile }: { selectedFile: string | null }) => {
  const [htmlContent, setHtmlContent] = useState<string>("Loading...");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFileContent = async (filename: string) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching file:", filename);
      const response = await axios.get(`http://localhost:8000/api/fetch/${filename}`, {
        responseType: "text",
      });

      console.log("File fetched, setting HTML content");
      setHtmlContent(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching file:", error);
      setHtmlContent("Error loading content.");
      setError("Error loading content.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      fetchFileContent(selectedFile);
    } else {
      setHtmlContent("No file selected.");
    }
  }, [selectedFile]);

  const handleContentChange = (event: React.FormEvent<HTMLDivElement>) => {
    setHtmlContent(event.currentTarget.innerHTML);
  };

  return (
    <div className="flex flex-col rounded-lg border bg-white p-4 shadow-sm dark:bg-gray-950 dark:border-gray-800">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">HTML Viewer</h2>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <MaximizeIcon className="h-5 w-5" />
            <span className="sr-only">Maximize</span>
          </Button>
          <Button size="icon" variant="ghost">
            <XIcon className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </div>
      <div
        className="flex-1 rounded-md border border-gray-200 bg-gray-100 p-4 dark:border-gray-800 dark:bg-gray-900"
        contentEditable
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        onInput={handleContentChange}
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default TextEditor;