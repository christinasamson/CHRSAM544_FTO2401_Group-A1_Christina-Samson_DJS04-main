// Define the BookPreview custom element
class BookPreview extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      const { image, title, author } = this.dataset;
  
      const template = `
        <style>
          .preview {
            display: flex;
            flex-direction: column;
            align-items: center;
            border: 1px solid #ccc;
            padding: 10px;
            cursor: pointer;
            width: 100%;
          }
          .preview__image {
            max-width: 100px;
            height: auto;
          }
          .preview__info {
            text-align: center;
            margin-top: 10px;
          }
          .preview__title {
            margin: 0;
            font-size: 1.2em;
          }
          .preview__author {
            margin: 5px 0;
            color: #666;
          }
        </style>
        <button class="preview">
          <img class="preview__image" src="${image}" alt="Book cover of ${title}" />
          <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${author}</div>
          </div>
        </button>
      `;
  
      this.shadowRoot.innerHTML = template;
    }
  }
  
  
  // Define the custom element
  customElements.define('book-preview', BookPreview);
  
  // Importing data and constants from data.js file
  import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";
  
  // Function to create HTML elements with specified attributes and innerHTML
  const createElement = (tag, attributes, innerHTML) => {
    const element = document.createElement(tag); // Create the specified HTML element
    // Set attributes for the element
    Object.entries(attributes).forEach(([key, value]) =>
      element.setAttribute(key, value)
    );
    element.innerHTML = innerHTML; // Set the innerHTML of the element
    return element; // Return the created element
  };
  
  // Function to render dropdown options based on provided data
  const renderOptions = (data, selector, defaultValue) => {
    const fragment = document.createDocumentFragment(); // Create a document fragment to hold the options
    // Create a default option with the provided defaultValue
    fragment.appendChild(
      createElement("option", { value: "any" }, defaultValue)
    );
    // Create options for each entry in the data object and append them to the fragment
    Object.entries(data).forEach(([id, name]) =>
      fragment.appendChild(createElement("option", { value: id }, name))
    );
    document.querySelector(selector).appendChild(fragment); // Append the fragment to the specified selector
  };
  
  // Function to render books with preview information
  const renderBooks = (matches, limit) => {
    const fragment = document.createDocumentFragment(); // Create a document fragment to hold the book previews
    // Create a preview button for each book in the matches array
    matches.slice(0, limit).forEach(({ author, id, image, title }) => {
      const bookPreview = document.createElement("book-preview");
      bookPreview.dataset.image = image;
      bookPreview.dataset.title = title;
      bookPreview.dataset.author = authors[author];
      fragment.appendChild(bookPreview); // Append the preview button to the fragment
    });
    document.querySelector("[data-list-items]").appendChild(fragment); // Append the fragment to the list items container
  };
  
  // Initial rendering of books and dropdown options
  renderBooks(books, BOOKS_PER_PAGE);
  renderOptions(genres, "[data-search-genres]", "All Genres");
  renderOptions(authors, "[data-search-authors]", "All Authors");
  
  