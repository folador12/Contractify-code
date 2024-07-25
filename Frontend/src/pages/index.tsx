import RootLayout from "@/app/layout";
import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Table } from "@/components/table";
import { SendModalFile } from "@/components/sendModalFile";
import { TbSearch } from "react-icons/tb";
import Image from "next/image";
import {
  DataResponse,
  getDocumentList,
  deleteDocument,
} from "@/services/apiClient";
import { useRouter } from "next/router";

export default function Home({
  listData,
  total,
  currentPage,
  currentStatus,
  currentSearch,
  currentSort,
  currentSortData,
}: DataResponse & {
  currentPage: number;
  currentStatus: string;
  currentSearch: string;
  currentSort: string;
  currentSortData: string;
}) {
  const [documentsList, setDocumentsList] = useState(listData || []);
  const [modal, setModal] = useState(false);
  const [page, setPage] = useState(currentPage);
  const [status, setStatus] = useState(currentStatus || "");
  const [search, setSearch] = useState(currentSearch || "");
  const [sort, setSort] = useState(currentSort || "");
  const [sortData, setSortData] = useState(currentSortData || "");
  const limit = 9;

  const router = useRouter();

  useEffect(() => {
    setDocumentsList(listData || []);
    setPage(currentPage);
    setStatus(currentStatus);
    setSearch(currentSearch);
    setSort(currentSort);
    setSortData(currentSortData);
  }, [
    listData,
    currentPage,
    currentStatus,
    currentSearch,
    currentSort,
    currentSortData,
  ]);

  useEffect(() => {
    const handleFiltersChange = () => {
      router.push(
        `/?page=1&status=${status}&search=${search}&sort=${sort}&sortData=${sortData}`
      );
    };

    handleFiltersChange();
  }, [status, search, sort, sortData]);

  const handleSetPage = (newPage: number) => {
    router.push(
      `/?page=${newPage}&status=${status}&search=${search}&sort=${sort}&sortData=${sortData}`
    );
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  const handleSortChange = () => {
    const newSort = sort === `ASC` ? `DESC` : `ASC`;
    setSort(newSort);
  };

  const handleSortChangeData = () => {
    const newSortData = sortData === `ASC` ? `DESC` : `ASC`;
    setSortData(newSortData);
  };

  const handleDelete = async (id: string) => {
    try {
      const status = await deleteDocument(id);

      if (status === 200) {
        const newDocumentsList = documentsList.filter(
          (document) => document.id !== id
        );
        setDocumentsList(newDocumentsList);
      }
    } catch (error) {
      console.error("Erro ao deletar documento:", error);
    }
  };
  return (
    <>
      <main className="flex flex-wrap justify-center my-5 flex-col">
        <Header isButtonVisible={true} clickHandler={() => setModal(true)} />
        <div className="container mx-auto p-4">
          <div className="flex items-center space-x-4 my-5">
            <div className="relative">
              <TbSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cinza-400" />
              <input
                type="text"
                className="pl-10 pr-4 py-2 rounded-md placeholder-cinza-300 bg-cinza-100"
                placeholder="Buscar contratos..."
                value={search}
                onChange={handleSearchChange}
              />
            </div>
            <select
              className="px-4  py-2 border border-cinza-200 rounded-md text-cinza-300 bg-white"
              value={status}
              onChange={handleStatusChange}
            >
              <option value="">Status</option>
              <option value="APPROVED">Aprovado</option>
              <option value="PENDING">Análise</option>
              <option value="REJECTED">Rejeitado</option>
            </select>
            {/* <button className="flex items-center px-4 py-2 border rounded-md text-cinza-300 border-cinza-200 ">
              Filtros
              <Image
                className="ml-2 text-cinza-400"
                src={"Filter_big.svg"}
                alt="filter"
                width={16}
                height={16}
              />
            </button> */}
          </div>
          <div className="mb-5 text-cinza-400">
            <span>Total de {total} contratos</span>
          </div>
          {documentsList.length > 0 ? (
            <Table
              data={documentsList}
              withPagination
              pagination={{ limit, page, total, setPage: handleSetPage }}
              onSortChange={handleSortChange}
              currentSort={sort}
              currentSortData={sortData}
              onSortChangeData={handleSortChangeData}
              onDelete={handleDelete}
            />
          ) : (
            <p>Nenhum contrato encontrado.</p>
          )}
        </div>
      </main>
      <SendModalFile
        isOpen={modal}
        onClose={() => {
          setModal(false);
        }}
      />
    </>
  );
}

Home.getLayout = function getLayout(page: any) {
  return <RootLayout>{page}</RootLayout>;
};

export async function getServerSideProps(context: any) {
  const page = context.query.page ? parseInt(context.query.page) : 1;
  const status = context.query.status || "";
  const search = context.query.search || "";
  const sort = context.query.sort || "DESC";
  const sortData = context.query.sortData || "DESC";
  const limit = 9;
  const { listData, total } = await getDocumentList(
    page,
    limit,
    status,
    search,
    sort,
    sortData
  );
  return {
    props: {
      listData: listData || [],
      total: total || 0,
      currentPage: page,
      currentStatus: status,
      currentSearch: search,
      currentSort: sort,
      currentSortData: sortData,
    },
  };
}
