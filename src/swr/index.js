import useSWR from "swr";
import fetcher from "../api";

const useCharactersList = (params) => {
  const { data, error } = useSWR(
    [`${process.env.REACT_APP_MARVEL_BASE_API}/characters`, params],
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );
  
  return {
    charactersData: data ? data.data : null,
    isLoading: !error && !data,
    isError: error ? error.message : error,
  };
};

export default useCharactersList;
