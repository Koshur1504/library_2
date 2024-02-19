import React, { useEffect } from "react";

const Modal = ({ toggleModal, modalData, setModal }) => {
  const { title, publisher, work, cover } = modalData;
  let imgurl =
    cover !== undefined
      ? `https://covers.openlibrary.org/b/id/${cover}-L.jpg`
      : `https://www.press.uillinois.edu/books/images/no_cover.jpg`;

  useEffect(() => {
    document.addEventListener("keydown", handleKey, true);
  }, []);
  const handleKey = (e) => {
    e.keyCode === 27 && setModal((old) => false);
  };

  return (
    <div
      className="modal-background"
      onClick={() => {
        toggleModal();
      }}
      tabIndex={0}
    >
      <div className="modal-content">
        <img src={imgurl} alt="" />
        <div>
          <h2>Title: {title}</h2>
          <h4>
            Publisher :{" "}
            {publisher?.map((i, idx) => {
              return <span key={idx}>{i} </span>;
            })}
          </h4>
          <a href={`https://openlibrary.org${work}`} target="_blank">
            Goto Open Library
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;
