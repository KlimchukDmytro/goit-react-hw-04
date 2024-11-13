const SearchBar = () => {
  return (
    <div>
      <header>
        <form>
          <input
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
          <button type="submit">Search</button>
        </form>
      </header>
    </div>
  );
};

export default SearchBar;
