// pages/index.tsx
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu";
import { MenuIcon, SearchIcon } from "@/components/ui/icons";
import FileUpload from "@/components/FileUpload";
import PDFViewer from "@/components/PDFViewer";
import DocxView from "@/components/DocxView";
import Link from 'next/link';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  return (
    <div className="grid min-h-screen w-full grid-cols-[280px_1fr] overflow-hidden">
      <div className='sidebar'>
        <FileUpload setSelectedFile={setSelectedFile} />
      </div>
      <div className="flex flex-col">
        <header className="flex h-[60px] items-center justify-between border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <div className="flex items-center gap-4">
            <Button className="lg:hidden" size="icon" variant="ghost">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button size="icon" variant="ghost">
              <SearchIcon className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-full" size="icon" variant="ghost">
                  <img
                    alt="Avatar"
                    className="rounded-full"
                    height="32"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "32/32",
                      objectFit: "cover",
                    }}
                    width="32"
                  />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 grid grid-cols-[1fr_1fr] gap-6 p-6">
          <PDFViewer selectedFile={selectedFile} />
          <DocxView selectedFile={selectedFile} />
        </main>
        <footer className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800">
          <Link href="/buy-credits">
            <Button>Buy Credits</Button>
          </Link>
          <Link href="/user-dashboard">
            <Button>User Dashboard</Button>
          </Link>
        </footer>
      </div>
    </div>
  );
}