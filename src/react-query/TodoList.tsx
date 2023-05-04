import axios from "axios";
import React, { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const TodoList = () => {
  // const [todos, setTodos] = useState<Todo[]>([]);
  // const [error, setError] = useState('');

  // useEffect(() => {
  //   axios
  //     .get('https://jsonplaceholder.typicode.com/todos')
  //     .then((res) => setTodos(res.data))
  //     .catch((error) => setError(error));
  // }, []);

  const fetchTodos = () =>
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.data);

  //fetch data with React Query
  const { data: todos, error } = useQuery<Todo[], Error>({
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
  });

  if (error) return <p>{error.message}</p>;

  return (
    <ul className="list-group">
      {todos?.map((todo) => (
        <li key={todo.id} className="list-group-item">
          {todo.title}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
