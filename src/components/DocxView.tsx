// docxView.tsx

import React, { useState, useEffect } from "react";
import axios from "axios";

interface DocxViewProps {
  selectedFile: string | null;
}

const DocxView: React.FC<DocxViewProps> = ({ selectedFile }) => {
  const [fileContent, setFileContent] = useState<string | null>(null);

  function changeFileExtension(file_name: string, newExtension = 'html', suffix = '-done') {
    let nameWithoutExtension = file_name.substring(0, file_name.lastIndexOf('.'));
    return `${nameWithoutExtension}${suffix}.${newExtension}`;
  }

  useEffect(() => {
    const fetchFile = async () => {
      if (selectedFile) {
        try {
          const new_filename = changeFileExtension(selectedFile);
          console.log(`Fetching file from DocxView: ${new_filename}`); // Add this log
          const response = await axios.get(`http://localhost:8000/api/fetch-html/${new_filename}`);
          setFileContent(response.data);
        } catch (error) {
          console.error("Error fetching processed file:", error);
        }
      }
    };

    if (selectedFile) {
      fetchFile();
    }
  }, [selectedFile]);

  return (
    <div>
      {fileContent ? (
        <div dangerouslySetInnerHTML={{ __html: fileContent }} /> // Render the HTML content
      ) : (
        <p>No file selected or file not processed yet.</p>
      )}
    </div>
  );
};

export default DocxView;