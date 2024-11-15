import { toast } from "react-hot-toast";
import s from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const searchTerm = form.elements.searchTerm.value.trim();

    if (searchTerm.length < 3) {
      toast.error("Search text must be longer than 2 characters.");
      return;
    }

    onSubmit(searchTerm);
    form.reset();
  };

  return (
    <header className={s.header}>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          className={s.input}
          name="searchTerm"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={s.btn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
