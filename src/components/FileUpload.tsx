// components/FileUpload.js
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileIcon, PlusIcon, UploadIcon, FolderIcon, Trash2Icon, ArchiveIcon, DownloadIcon } from '@/components/ui/icons';

const FileUpload = () => {
  return (
<div className="flex h-screen w-full">
      <div className="bg-gray-100 dark:bg-gray-900 w-66 border-r border-gray-200 dark:border-gray-800 p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">File Manager</h2>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost">
              <UploadIcon className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="ghost">
              <ArchiveIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-gray-200 dark:bg-gray-800 rounded-md px-3 py-2">
          <FolderIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-500 dark:text-gray-400">/Documents</span>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-md px-1 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
              <FileIcon className="w-4 h-5 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-700 dark:text-gray-300 flex-1 truncate">example.pdf</span>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost">
                  <DownloadIcon className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Trash2Icon className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="ghost">
                  <ArchiveIcon className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-md px-1 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
              <FileIcon className="w-4 h-5 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-700 dark:text-gray-300 flex-1 truncate">image.jpg</span>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost">
                  <DownloadIcon className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Trash2Icon className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="ghost">
                  <ArchiveIcon className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-md px-1 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
              <FileIcon className="w-4 h-5 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-700 dark:text-gray-300 flex-1 truncate">document.docx</span>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost">
                  <DownloadIcon className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Trash2Icon className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="ghost">
                  <ArchiveIcon className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Button variant="outline">Zip All</Button>
          <Button variant="outline">Archive</Button>
        </div>
      </div>
    </div> 
  );
};

export default FileUpload;
