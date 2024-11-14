import s from "./SearchBar.module.css";

const SearchBar = () => {
  return (
    <div>
      <header className={s.header}>
        <form className={s.form}>
          <input
            className={s.input}
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
    </div>
  );
};

export default SearchBar;
