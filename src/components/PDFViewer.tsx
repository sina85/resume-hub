"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { MaximizeIcon, XIcon } from "@/components/ui/icons";

const PDFViewer = ({ selectedFile }: { selectedFile: string | null }) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  const fetchFile = async (filename: string) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/fetch/${filename}`, {
        responseType: 'arraybuffer'
      });
      const file = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(file);
      setFileUrl(url);
      setFileType('application/pdf');
    } catch (error) {
      console.error('Error fetching file:', error);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      fetchFile(selectedFile);
    } else {
      setFileUrl(null);
      setFileType(null);
    }
  }, [selectedFile]);

  return (
    <div className="flex flex-col rounded-lg border bg-white p-4 shadow-sm dark:bg-gray-950 dark:border-gray-800">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">PDF Viewer</h2>
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
      <div className="flex-1 rounded-md border border-gray-200 bg-gray-100 p-4 dark:border-gray-800 dark:bg-gray-900">
        {fileUrl && fileType === 'application/pdf' ? (
          <iframe src={fileUrl} className="w-full h-full" />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;