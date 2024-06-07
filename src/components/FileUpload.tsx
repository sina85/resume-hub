"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { FileIcon, UploadIcon, FolderIcon, Trash2Icon, DownloadIcon, DotsHorizontalIcon } from '@/components/ui/icons';

type FileStatus = 'not processed' | 'in progress' | 'processed' | 'error' | 'processing';

interface FileItem {
  id: number;
  name: string;
  status: FileStatus;
  showOptions: boolean;
  fileType: string;  // Added fileType
}

const FileUpload = ({ setSelectedFile }: { setSelectedFile: (fileName: string | null) => void }) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<Set<number>>(new Set());
  const [fileType, setFileType] = useState<string>('doctors'); // State for file type

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8000/api/events");
    eventSource.onmessage = function(event) {
      const data = JSON.parse(event.data);
      setFiles(prevFiles => 
        prevFiles.map(file => 
          file.name === data.filename ? { ...file, status: data.status } : file
        )
      );
    };
    return () => {
      eventSource.close();
    };
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const filesArray = Array.from(event.target.files || []);
    const newFiles = filesArray.map((file, index) => ({
      id: Date.now() + index, // Ensure unique ID
      name: file.name,
      status: 'not processed' as FileStatus,
      showOptions: false,
      fileType,  // Include fileType
    }));
    
    setFiles([...files, ...newFiles]);
    
    if (event.target) {
      event.target.value = '';
    }

    for (const file of filesArray) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("file_type", fileType);  // Append file type
      
      try {
        await axios.post("http://localhost:8000/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        setFiles(prevFiles =>
          prevFiles.map(f => f.name === file.name ? { ...f, status: 'not processed' } : f)
        );
      } catch (error) {
        console.error("Error uploading file:", error);
        setFiles(prevFiles =>
          prevFiles.map(f => f.name === file.name ? { ...f, status: 'error' } : f)
        );
      }
    }
  };

  const handleProcessSelectedFiles = async () => {
    for (const file of files.filter(f => selectedFiles.has(f.id))) {
      try {
        setFiles(prevFiles => 
          prevFiles.map(f => f.id === file.id ? { ...f, status: 'processing' } : f)
        );
  
        const formData = new FormData();
        formData.append("file", new File([file.name], file.name)); // Create a new File object from the file name
        formData.append("file_type", file.fileType);  // Append file type
  
        await axios.post("http://localhost:8000/api/process", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
      } catch (error) {
        console.error("Error processing file:", error);
        setFiles(prevFiles =>
          prevFiles.map(f => f.id === file.id ? { ...f, status: 'error' } : f)
        );
      }
    }
  };  
  const toggleFileSelection = (id: number) => {
    setSelectedFiles((prevSelectedFiles) => {
      const newSelectedFiles = new Set(prevSelectedFiles);
      if (newSelectedFiles.has(id)) {
        newSelectedFiles.delete(id);
      } else {
        newSelectedFiles.add(id);
      }
      return newSelectedFiles;
    });
  };

  const selectAllFiles = () => {
    setSelectedFiles(new Set(files.map(file => file.id)));
  };

  const deselectAllFiles = () => {
    setSelectedFiles(new Set());
  };

  const handleFileAction = (id: number, action: 'remove' | 'download') => {
    switch (action) {
      case 'remove':
        setFiles(prevFiles => prevFiles.filter(file => file.id !== id));
        setSelectedFiles(prevSelected => {
          const newSelected = new Set(prevSelected);
          newSelected.delete(id);
          return newSelected;
        });
        break;
      case 'download':
        // Implement downloading logic here
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex h-screen w-full">
      <div className="bg-gray-100 dark:bg-gray-900 w-66 border-r border-gray-200 dark:border-gray-800 p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">File Manager</h2>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" onClick={() => document.getElementById('file-input')?.click()}>
              <UploadIcon className="w-5 h-5" />
            </Button>
            <input type="file" id="file-input" multiple className="hidden" onChange={handleFileUpload} />
          </div>
        </div>
        <div className="flex items-center gap-2 bg-gray-200 dark:bg-gray-800 rounded-md px-3 py-2">
          <FolderIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-500 dark:text-gray-400">/Resumes</span>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="file-type" className="text-sm text-gray-500 dark:text-gray-400">File Type:</label>
          <select id="file-type" className="bg-white dark:bg-gray-800 text-sm" value={fileType} onChange={e => setFileType(e.target.value)}>
            <option value="doctors">Doctors</option>
            <option value="nurses">Nurses</option>
          </select>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="grid gap-2">
            {files.map(file => (
              <div key={file.id} className={`flex items-center gap-2 rounded-md px-1 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${file.status === 'not processed' ? 'bg-gray-200' : file.status === 'in progress' ? 'bg-blue-200' : file.status === 'processing' ? 'bg-yellow-200' : file.status === 'processed' ? 'bg-green-200' : 'bg-red-200'}`}>
                <input type="checkbox" checked={selectedFiles.has(file.id)} onChange={() => toggleFileSelection(file.id)} />
                <FileIcon className="w-4 h-5 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300 flex-1 truncate" onClick={() => setSelectedFile(file.name)}>{file.name}</span>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost" onClick={() => setFiles(files.map(f => f.id === file.id ? { ...f, showOptions: !f.showOptions } : f))}>
                    <DotsHorizontalIcon className="w-5 h-5" />
                  </Button>
                  {file.showOptions && (
                    <div className="relative">
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-20">
                        <Button variant="ghost" onClick={() => handleFileAction(file.id, 'remove')}>Remove</Button>
                        <Button variant="ghost" onClick={() => handleFileAction(file.id, 'download')}>Download</Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <Button variant="outline" onClick={selectAllFiles}>Select All</Button>
          <Button variant="outline" onClick={deselectAllFiles}>Deselect All</Button>
        </div>
        <div className="flex items-center justify-between mt-2">
          <Button variant="outline" onClick={handleProcessSelectedFiles}>Process Selected</Button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;