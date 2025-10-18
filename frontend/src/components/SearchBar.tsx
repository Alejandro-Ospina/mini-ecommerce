interface SearchBarProps {
  search: string;
  setSearch: (v: string) => void;
}

const SearchBar = ({ search, setSearch }: SearchBarProps) => {
  return (
    <div className="fixed top-16 left-0 w-full bg-white shadow-md z-40">
      <div className="max-w-4xl mx-auto p-3">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>
    </div>
  );
};

export default SearchBar;

