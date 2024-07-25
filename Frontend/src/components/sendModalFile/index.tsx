import Dropzone, { Accept } from "react-dropzone";
import { FileList } from "../fileList";
import Image from "next/image";
import { useState } from "react";
import { uniqueId } from "lodash";
import { postDocument } from "@/services/apiClient";

const accept: Accept = {
  "application/pdf": [".pdf"],
};
interface FileObject {
  file: any;
  id: string;
  name: string;
  progress: number;
  readableSize: string;
  uploaded: boolean;
  error: boolean;
}
interface UploadProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SendModalFile = ({ isOpen, onClose }: UploadProps) => {
  const [uploadedFile, setUploadedFile] = useState<FileObject>(
    {} as FileObject
  );
  const disabled = !!uploadedFile.id;

  const onUpload = (files: any) => {
    const file = files[0];
    const newFile: FileObject = {
      file,
      id: uniqueId(),
      name: file.name,
      progress: 0,
      readableSize: "0 B",
      uploaded: false,
      error: false,
    };
    setUploadedFile(newFile);
  };

  const sendFile = async () => {
    const data = new FormData();
    data.append("file", uploadedFile.file);
    try {
      await postDocument(data);
      console.log("Arquivo enviado com sucesso");
      closeModal();
    } catch (error) {
      console.error("Erro ao enviar arquivo", error);
    }
  };

  const closeModal = () => {
    setUploadedFile({} as FileObject);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="w-1/2 h-5/6 shadow-xl border rounded-3xl flex flex-col p-6 bg-white">
          <div className="flex justify-between items-center w-full mb-4">
            <Image src="/logo.png" alt="contractfly" width={200} height={30} />
          </div>
          <Dropzone accept={accept} maxFiles={1} onDropAccepted={onUpload}>
            {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
              <div
                {...getRootProps()}
                className={`w-full h-full flex flex-col justify-center items-center border-2 border-dashed my-border-gray-300 ${
                  isDragReject
                    ? "border-none border-0 bg-red-500 text-white"
                    : isDragActive &&
                      "border-none border-0 my-bg-primary-500 text-white"
                } rounded ${
                  disabled ? "cursor-not-allowed" : "cursor-pointer"
                } transition-all`}
              >
                <input {...getInputProps()} disabled={disabled} />

                {!!uploadedFile.id && !isDragActive ? (
                  <FileList file={uploadedFile} />
                ) : isDragActive ? (
                  !isDragReject && <span>Jogue o arquivo aqui...</span>
                ) : (
                  <span className={`${disabled && "text-zinc-400"}`}>
                    Jogue algum arquivo aqui, ou clique para selecionar o
                    arquivo
                  </span>
                )}
                {isDragReject && <span>Tipo de arquivo não suportado...</span>}
              </div>
            )}
          </Dropzone>
          <div className="mt-6 w-full flex justify-between">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={closeModal}
            >
              Cancelar
            </button>
            <button
              className="px-4 py-2 bg-teal-400 text-white rounded hover:bg-teal-500"
              onClick={sendFile}
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
