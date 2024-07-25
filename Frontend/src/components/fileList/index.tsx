import { CircularProgressbar } from "react-circular-progressbar";
import { MdCheckCircle, MdError } from "react-icons/md";

interface FileListProps {
  file: any;
}

export const FileList = ({ file }: FileListProps) => {
  return (
    <ul className="w-1/2">
      <li
        key={file.id}
        className="w-full flex justify-between items-center my-bg-gray-100 text-zinc-700 shadow-md p-4"
      >
        <div className="flex flex-col justify-center">
          <strong>{file.name}</strong>
        </div>

        <div className="flex items-center">
          <span className="text-sm text-zinc-400 mt-1">
            {file.readableSize}
          </span>
          {file.uploaded && file.progress != 100 && (
            <CircularProgressbar
              className="ml-4"
              styles={{
                root: { width: 24 },
                path: { stroke: "#7159c1" },
              }}
              strokeWidth={10}
              value={file.progress}
            />
          )}
          {file.uploaded && file.progress == 100 && (
            <MdCheckCircle className="ml-4" size={24} color="#1fcab0" />
          )}
          {file.error && <MdError className="ml-4" size={24} color="#e57878" />}
        </div>
      </li>
    </ul>
  );
};
