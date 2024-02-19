import React, { useEffect, useState } from "react";
import axios from "axios";

const useBookSearch = (query, pageNumber) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    setBooks([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: "http://openlibrary.org/search.json",
      params: { q: query, page: pageNumber, limit: 12 },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        
        setBooks((prev) => {
          return [
            ...new Set([
              ...prev,
              ...res.data.docs.map((b) => ({
                title: b.title,
                publisher: b.publisher
                  ? b.publisher
                  : ["Indipendently Published"],
                work: b.key,
                cover: b.cover_i,
              })),
            ]),
          ];
        });
        setHasMore(res.data.docs.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        // setError(true);
        setError(e);
      });
    return () => cancel();
  }, [query, pageNumber]);

  return { loading, error, books, hasMore };
};
export default useBookSearch;
