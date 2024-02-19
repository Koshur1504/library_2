import { useState, useCallback, useRef } from "react";
import "./App.css";
import useBookSearch from "./utils/useBookSearch";
import BookComponent from "./components/BookComponent";
import Modal from "./components/Modal";

function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { books, hasMore, loading, error } = useBookSearch(query, pageNumber);
  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPageNumber(1);
  };
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState([]);

  const toggleModal = (data) => {
    setModal((old) => {
      return !old;
    });

    if (!modal) {
      setModalData((old) => data);
    }
    if (modal) {
      setModalData([]);
    }
  };

  return (
    <div className="App">
      {!modal && (
        <input
          placeholder="Enter A book Title"
          type="text"
          id="input"
          name="input"
          onChange={handleSearch}
          value={query}
        />
      )}

      <div className="container">
        {modal ? (
          <Modal
            toggleModal={toggleModal}
            modalData={modalData}
            setModal={setModal}
          />
        ) : (
          <>
            {books.map((book, index) => {
              if (books.length === index + 1) {
                return (
                  <BookComponent
                    data={book}
                    key={index}
                    toggleModal={toggleModal}
                    ref={lastBookElementRef}
                  />
                );
              } else {
                return (
                  <BookComponent
                    data={book}
                    key={index}
                    toggleModal={toggleModal}
                  />
                );
              }
            })}
          </>
        )}
      </div>
      {!modal && loading && (
        <div className="loading">
          <img
            src="https://media.tenor.com/wfEN4Vd_GYsAAAAC/loading.gif"
            alt=""
          />
        </div>
      )}
      {!modal && error && <div className="error">{error}</div>}
    </div>
  );
}

export default App;
