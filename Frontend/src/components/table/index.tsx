import { TableHTMLAttributes } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { GoDownload } from "react-icons/go";
import { FaEye, FaTrash, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import { DataType } from "@/utils/types/data-type";
import { printStatus } from "@/utils/types/EnumStatus";
import { getDownloadDocument } from "@/services/apiClient";
import { getStatusClass } from "../status";

interface PaginationProps {
  limit: number;
  page: number;
  total: number;
  setPage: (page: number, limit: number) => void;
}

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  data: DataType[];
  withPagination?: boolean;
  pagination?: PaginationProps;
  onSortChange: () => void;
  onSortChangeData: () => void;
  currentSort: string;
  currentSortData: string;
  onDelete: (id: string) => void;
}

const MAX_ITEMS = 10;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

export const Table = ({
  data,
  withPagination,
  pagination,
  onSortChange,
  onSortChangeData,
  currentSort,
  currentSortData,
  onDelete,
  ...rest
}: TableProps) => {
  const current = pagination && pagination.page ? pagination.page : 1;
  const pages = pagination ? Math.ceil(pagination.total / pagination.limit) : 1;
  const first = Math.max(current - MAX_LEFT, 1);

  const prePage = () => {
    if (pagination && current !== 1) {
      pagination.setPage(current - 1, pagination.limit);
    }
  };

  const changCurrentPage = (number: number) => {
    if (pagination) {
      pagination.setPage(number, pagination.limit);
    }
  };

  const nextPage = () => {
    if (pagination && current !== pages) {
      pagination.setPage(current + 1, pagination.limit);
    }
  };

  const renderSortIcon = () => {
    if (currentSort.endsWith("ASC")) {
      return <FaSortUp />;
    } else if (currentSort.endsWith("DESC")) {
      return <FaSortDown />;
    }

    return <FaSort />;
  };

  const renderSortIconData = () => {
    if (currentSortData.endsWith("ASC")) {
      return <FaSortUp />;
    } else if (currentSortData.endsWith("DESC")) {
      return <FaSortDown />;
    }

    return <FaSort />;
  };

  const handleDownload = async (id: string) => {
    try {
      await getDownloadDocument(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="overflow-x-auto border border-cinza-200 rounded-lg">
        <table className="min-w-full divide-y">
          <thead className="bg-cinza-100 bg-op">
            <tr>
              <th
                className=" px-6 py-3 flex items-center text-xs font-medium text-cinza-300 uppercase tracking-wider cursor-pointer"
                onClick={() => onSortChangeData()}
              >
                <span>Data</span>
                {renderSortIconData()}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-cinza-300 uppercase tracking-wider">
                Nome
              </th>
              <th
                className="px-6 py-3 flex items-center text-xs font-medium text-cinza-300 uppercase tracking-wider cursor-pointer"
                onClick={() => onSortChange()}
              >
                Valor
                {renderSortIcon()}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-cinza-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-cinza-300 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-cinza-200">
            {data.map((contract, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-cinza-300">
                  {contract.baseDate.toLocaleString("pt-BR")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{contract.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {contract.contractValue.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusClass(contract.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-cinza-400 hover:text-secundary-600"
                    onClick={() => handleDownload(contract.id)}
                  >
                    <GoDownload />
                  </button>
                  <Link href={`/ViewDocument/${contract.id}`}>
                    <button className="ml-4 text-cinza-400 hover:text-primary">
                      <FaEye />
                    </button>
                  </Link>

                  <button
                    className="ml-4 text-cinza-400 hover:text-danger"
                    onClick={() => onDelete(contract.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {withPagination && pagination && (
        <div className="flex justify-between my-2">
          <nav className="flex bg-white rounded-lg">
            <button
              className={`flex justify-center items-center h-10 w-10 rounded-l-lg border-2 border-r-0 my-border-gray-300 my-color-gray-700 ${
                current != 1 ? "hover:bg-gray-300 hover:text-white" : ""
              } disabled:cursor-not-allowed`}
              onClick={() => prePage()}
              disabled={current === 1}
            >
              <IoIosArrowBack size={16} />
            </button>
            {Array.from({ length: Math.min(MAX_ITEMS, pages) })
              .map((_, index) => index + first)
              .map((currentPage, i) => (
                <button
                  key={i}
                  className={`h-10 w-10 border-2 border-r-0 my-border-gray-300 ${
                    currentPage === pagination.page
                      ? "bg-blue-500 text-white"
                      : ""
                  }`}
                  onClick={() => changCurrentPage(currentPage)}
                >
                  {currentPage}
                </button>
              ))}
            <button
              className={`flex justify-center items-center h-10 w-10 rounded-r-lg border-2 my-border-gray-300 my-color-gray-700 disabled:cursor-not-allowed`}
              onClick={() => nextPage()}
              disabled={current === pages}
            >
              <IoIosArrowForward size={16} />
            </button>
          </nav>
        </div>
      )}
    </>
  );
};
