import axios from "axios";
import { getCookie } from "cookies-next";
import { useQuery, useMutation, useQueryClient } from "react-query";

// const queryClient = useQueryClient();

export const usePost = (
  onSucces: any,
  onError: any,
  endpoint: string,
  update: boolean
) => {
  return useMutation(
    (payload: any) => {
      if (update) {
        payload._method = "PUT";
      }
      return axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
        payload,
        {
          headers: {
            Authorization: "Bearer " + getCookie("user"),
          },
        }
      );
    },
    {
      onSuccess: onSucces,
      onError: onError,
    }
  );
};

export const usePostFile = (
  onSucces: any,
  onError: any,
  endpoint: string,
  update: boolean
) => {
  return useMutation(
    (payload: any) => {
      if (update) {
        payload._method = "PUT";
      }
      const formData = new FormData();
      const arrayData: any = [];
      const keys = Object.keys(payload);
      keys.forEach((key) => {
        arrayData.push({
          key: key,
          keyData: payload[key],
        });
      });
      arrayData.map(({ key, keyData }: any) => {
        formData.append(key, keyData);
      });

      return axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + getCookie("user"),
          },
        }
      );
    },
    {
      onSuccess: onSucces,
      onError: onError,
    }
  );
};

export const useRemove = (onSucces: any, onError: any, endpoint: string) => {
  return useMutation(
    (id: any) => {
      return axios.post(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}${id}`, {
        headers: {
          Authorization: "Bearer " + getCookie("user"),
        },
      });
    },
    {
      onSuccess: onSucces,
      onError: onError,
    }
  );
};

export const useFetch = (
  name: string,
  queryKey: string[],
  endpoint: string
) => {
  return useQuery(
    [name, queryKey],
    () => {
      return axios.get(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        headers: {
          Authorization: "Bearer " + getCookie("user"),
        },
      });
    }
    // {
    //   refetchOnWindowFocus: false,
    // }
  );
};
export const useFetchDetail = (name: string, endpoint: string, id: any) => {
  return useQuery([name, id], () => {
    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}${id}`, {
      headers: {
        Authorization: "Bearer " + getCookie("user"),
      },
    });
  });
};