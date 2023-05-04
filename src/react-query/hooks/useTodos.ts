import axios from "axios";

import { useQuery } from "@tanstack/react-query";

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const useTodos = () => {
  const fetchTodos = () =>
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.data);

  return useQuery<Todo[], Error>({
    //data is retrieved from the backend

    //that data is then stored in the cache
    //and will be accessible via the queryKey

    //set the queryKey to one or more values
    //it identifies the typpe of data we intend to store
    queryKey: ["todos"],

    //used to fetch the data from the backend
    //returns a promise
    //resolves data or throws error
    queryFn: fetchTodos,
    staleTime: 10 * 1000,
  });
};

export default useTodos;
