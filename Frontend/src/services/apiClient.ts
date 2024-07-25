import { setupAPIClient } from "./api";
import { DataType } from "@/utils/types/data-type";
import { DetailsType } from "@/utils/types/details-type";

export const api = setupAPIClient();

export type DataResponse = {
  listData: DataType[];
  total: number;
};

export const getDocumentList = async (
  page: number,
  limit: number,
  status: string,
  search: string,
  sort: string,
  sortData: string
): Promise<DataResponse> => {
  try {
    const { data } = await api.get(
      `/document/list?skip=${
        (page - 1) * limit
      }&limit=${limit}&status=${status}&name=${search}&orderValuesBy=${sort}&orderDataBy=${sortData}`
    );

    return {
      listData: data.documents,
      total: data.total,
    };
  } catch (error) {
    throw error;
  }
};

export const postDocument = async (data: FormData) => {
  try {
    await api.post("/document/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getDocumentDetails = async (id: string): Promise<DetailsType> => {
  try {
    const { data } = await api.get(`/document/document/${id}`);

    return data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDocument = async (id: string) => {
  try {
    const { status } = await api.delete(`/document/${id}`);
    return status;
  } catch (error) {
    throw error;
  }
};

export const getDownloadDocument = async (id: string) => {
  try {
    const { data } = await api.get(`/document/${id}/download`);

    return data;
  } catch (error) {
    throw error;
  }
};
