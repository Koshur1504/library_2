import React from "react";

const BookComponent = React.forwardRef(({ data, toggleModal }, ref) => {
  const { title, publisher, work, cover } = data;

  let imgurl =
    cover !== undefined
      ? `https://covers.openlibrary.org/b/id/${cover}-L.jpg`
      : `https://www.press.uillinois.edu/books/images/no_cover.jpg`;

  return (
    <div
      className="book-container"
      ref={ref}
      onClick={() => {
        toggleModal(data);
      }}
    >
      <h3>
        Title <br /> {title}
      </h3>
      <img src={imgurl} alt="" />
      <h4>
        Publisher <br /> {publisher[0]}
      </h4>
    </div>
  );
});

export default BookComponent;
