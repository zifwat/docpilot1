"use client";

import React, { useState } from "react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilCloudUpload } from "@coreui/icons";
import { PDFDocument } from "pdf-lib";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { BiSolidXCircle } from "react-icons/bi";
import { TailSpin } from 'react-loader-spinner';

const Main: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePages, setFilePages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedFileType, setSelectedFileType] = useState<string>("Select File Type");
  const [fileContent, setFileContent] = useState<string>("");
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);
  const [extractedData, setExtractedData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<boolean>(false); // New loading state


  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      await processPDF(file);
      setIsFileUploaded(true);
    }
  };

  const processPDF = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const totalPages = pdfDoc.getPageCount();
    setFilePages(totalPages);
    setCurrentPage(0);
    showPage(0);
  };

  const showPage = async (pageIndex: number) => {
    if (selectedFile) {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const page = pdfDoc.getPage(pageIndex);
      setFileContent(`Page ${pageIndex + 1} - ${page.getWidth()}x${page.getHeight()}`);
    }
  };

  const handleNextPage = () => {
    if (currentPage < filePages - 1) {
      setCurrentPage(currentPage + 1);
      showPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      showPage(currentPage - 1);
    }
  };

  const handleFileTypeChange = (fileType: string) => {
    setSelectedFileType(fileType);
    localStorage.setItem("selectedFileType", fileType);
  };

  const triggerFileInput = () => {
    document.getElementById("file-upload")?.click();
  };

  const handleExtract = async () => {
    if (selectedFile) {
      setLoading(true); 
      try {
        const formData = new FormData();
        formData.append("input", selectedFile);
        formData.append("fileType", selectedFileType);

        const response = await fetch("http://localhost:3001/api/send-document", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);

          const filteredData = Object.fromEntries(
            Object.entries(data).filter(([key]) => key.endsWith("_value"))
          );

          setExtractedData(filteredData);
          console.log("Filtered Extracted Data:", filteredData);
          console.log("Extracted Data:", setExtractedData);
        } else {
          console.error("Failed to upload file:", response.statusText);
        }
      } catch (error) {
        console.error("Error extracting data:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

  const handleResetFile = () => {
    window.location.reload();
  };

  const MyPDFViewer: React.FC<{ fileUrl: string }> = ({ fileUrl }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (
      <div className="h-full">
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.6.210/build/pdf.worker.min.js`}>
          <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
        </Worker>
      </div>
    );
  };

  return (
    <div className="flex w-full bg-gray-900 text-white" style={{ height: "88.99vh" }}>
      {/* Left Column: 25% */}
      <div className="bg-gray-800 p-4 h-full flex flex-col justify-between" style={{ width: "40%" }}>
        {!isFileUploaded ? (
          <div
            className="w-full h-full shadow-lg bg-gray-900 text-white rounded flex flex-col justify-center items-center relative cursor-pointer"
            onClick={triggerFileInput}
          >
            <CIcon icon={cilCloudUpload} size="custom-size" className="w-20 h-20 text-white mb-2" />
            <p className="text-center">Upload Your File Here (.Pdf only)</p>
            <input type="file" id="file-upload" onChange={handleFileChange} className="hidden" />
          </div>
        ) : (
          <div className="relative p-2 rounded bg-gray-800 w-full h-full flex flex-col justify-between">
            <div className="relative p-4 border w-full border-gray-600 rounded bg-gray-900 flex-grow">
              <BiSolidXCircle
                className="absolute right-5 top-5 w-9 h-9 text-red-900 cursor-pointer"
                onClick={handleResetFile}
              />
              {selectedFile && <MyPDFViewer fileUrl={URL.createObjectURL(selectedFile)} />}
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-400"
              >
                Prev
              </button>
              <span>
                Page {currentPage + 1} of {filePages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === filePages - 1}
                className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-400"
              >
                Next
              </button>
            </div>
          </div>
        )}


      </div>

{/* Right Column: 75% */}
<div className="flex flex-col items-center bg-gray-900 p-4 border-l border-gray-600 overflow-auto" style={{ width: "60%" }}>
  <div className="w-full h-[73vh]">
  {loading ? ( // Show loading spinner when loading
            <div className="flex justify-center items-center h-full">
              <TailSpin height="50" width="50" color="#00BFFF" ariaLabel="loading" />
            </div>
          ) : Object.keys(extractedData).length === 0 ? (
            <p className=" flex justify-center items-center p-4 border border-gray-600 h-full">No file uploaded.</p>
          ) : (
            <div className="p-4 border border-gray-600 rounded bg-gray-900 h-full overflow-y-scroll">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-x-4">
                {Object.entries(extractedData).map(([key, value]) => (
                  <div key={key} className="break-words mb-4 p-4 bg-gray-800 rounded shadow-md">
                    <h3 className="font-bold mb-2 text-lg underline underline-offset-4">{key}</h3>
                    <p className="text-justify overflow-hidden text-ellipsis">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
  </div>

  {/* Buttons */}
  <div className="flex flex-col mt-5 w-full">
    <Menu as="div" className="relative w-full">
      <Menu.Button className="bg-cyan-600 shadow-lg text-white px-4 py-2 rounded flex items-center justify-between hover:bg-cyan-500 w-full cursor-pointer">
        <span className="flex-1 pl-[29px] text-center">{selectedFileType}</span>
        <ChevronDownIcon className="w-5 h-5 ml-2" />
      </Menu.Button>

      <Menu.Items className="absolute right-0 bottom-full mb-2 w-48 origin-bottom-right shadow-lg bg-gray-800 border border-gray-600 rounded">
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={() => handleFileTypeChange("Card")}
              className={`block px-4 py-2 text-white w-full text-left ${active ? "bg-cyan-700" : ""} cursor-pointer`}
            >
              Business Card
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={() => handleFileTypeChange("Resume")}
              className={`block px-4 py-2 text-white w-full text-left ${active ? "bg-cyan-700" : ""} cursor-pointer`}
            >
              Resume
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={() => handleFileTypeChange("Invoice")}
              className={`block px-4 py-2 text-white w-full text-left ${active ? "bg-cyan-700" : ""} cursor-pointer`}
            >
              Invoice
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>

    <CButton
      className="bg-cyan-600 text-white w-full py-2 mt-4 rounded hover:bg-cyan-500 shadow-lg"
      onClick={handleExtract}
    >
      Extract
    </CButton>
  </div>
</div>
</div>
  );
};

export default Main;