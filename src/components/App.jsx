import { useEffect, useState } from "react";
import "./App.css";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import SearchBar from "./SearchBar/SearchBar";
import { fetchData } from "../unsplash-api";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./ImageModal/ImageModal";
import { Toaster, toast } from "react-hot-toast";

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [imageModalIsOpen, setImageModalIsOpen] = useState(false);
  const [imageModal, setImageModal] = useState({});
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (query === "") {
      return;
    }

    async function getImages() {
      try {
        setLoading(true);
        setError(false);
        setErrorMessage("");
        const apiResponse = await fetchData(query, page);
        setResults((prevResults) => [
          ...prevResults,
          ...apiResponse.data.results,
        ]);
        setTotalPages(apiResponse.data.total_pages);

        if (apiResponse.data.results.length === 0) {
          toast.error("No images found for your query.");
        }
      } catch (error) {
        setError(true);
        handleAxiosError(error);
      } finally {
        setLoading(false);
      }
    }
    getImages();
  }, [query, page]);

  function openModal(img) {
    setImageModal(img);
    setImageModalIsOpen(true);
  }

  function closeModal() {
    setImageModal({});
    setImageModalIsOpen(false);
  }

  function handleAxiosError(error) {
    if (error.response) {
      setErrorMessage(`Server error: ${error.response.data}`);
    } else if (error.request) {
      setErrorMessage("No response from server. Please check your network.");
    } else {
      setErrorMessage(`Request setup error: ${error.message}`);
    }
  }

  const handleSearch = (searchTerm) => {
    setResults([]);
    setQuery(searchTerm);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const isEmtpyResults = !loading && query && results.length === 0;

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          success: { duration: 3000 },
          error: {
            duration: 5000,
            style: { background: "red", color: "white" },
          },
        }}
      />
      <SearchBar onSubmit={handleSearch} />
      {results.length > 0 && (
        <ImageGallery results={results} openModal={openModal} />
      )}
      {page < totalPages && !loading && (
        <LoadMoreBtn handleLoadMore={handleLoadMore} />
      )}
      {loading && <Loader />}
      {error && <ErrorMessage errorMsg={errorMessage} />}
      {isEmtpyResults && <p>No images found</p>}
      {imageModalIsOpen && (
        <ImageModal
          isOpen={imageModalIsOpen}
          closeModal={closeModal}
          img={imageModal}
        />
      )}
    </>
  );
}

export default App;
