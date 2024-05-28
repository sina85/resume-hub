"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { MaximizeIcon, XIcon } from "@/components/ui/icons";

const TextEditor = () => {
  const [htmlContent, setHtmlContent] = useState<string>("Loading...");

  const fetchFileContent = async () => {
    try {
      const filename = "example.html"; // This should be dynamically set based on user selection
      console.log("Fetching file:", filename);
      const response = await axios.get(`http://localhost:8000/api/fetch/${filename}`, {
        responseType: "text",
      });

      console.log("File fetched, setting HTML content");
      setHtmlContent(response.data);
    } catch (error) {
      console.error("Error fetching file:", error);
      setHtmlContent("Error loading content.");
    }
  };

  useEffect(() => {
    fetchFileContent();
  }, []);

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
    </div>
  );
};

export default TextEditor;
