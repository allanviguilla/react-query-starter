import React, { useState } from "react";

import usePosts from "./hooks/usePosts";

const PostList = () => {
  // const [userId, setUserId] = useState<number>();

  // const { data: posts, error, isLoading } = usePosts(userId);

  const pageSize = 10;

  const {
    data: posts,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = usePosts({ pageSize });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      {/* <select
        className="form-select mb-3"
        onChange={(event) => setUserId(parseInt(event.target.value))}
        value={userId}
      >
        <option value=""></option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select> */}
      <ul className="list-group">
        {posts.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((post) => (
              <li key={post.id} className="list-group-item">
                {post.title}
              </li>
            ))}
          </React.Fragment>
        ))}
        {/* {posts?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))} */}
      </ul>
      <button
        className="btn btn-primary my-3 ms-3"
        disabled={isFetchingNextPage}
        onClick={() => fetchNextPage()}
      >
        {isFetchingNextPage ? "Loading..." : "Load More"}
      </button>
      {/* <button
        disabled={page === 1}
        className="btn btn-primary my-3"
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>
      <button
        className="btn btn-primary my-3 ms-3"
        onClick={() => setPage(page + 1)}
      >
        Next
      </button> */}
    </>
  );
};

export default PostList;
