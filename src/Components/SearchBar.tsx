import { FC, InputHTMLAttributes } from "react";
import { BsSearch } from "react-icons/bs";

type searchBarProps = InputHTMLAttributes<HTMLInputElement>;

const SearchBar: FC<searchBarProps> = (props) => {

  return (
    <div className="relative">
      <input
        {...props}
        className="px-4 py-1 w-full rounded-full border-2 border-black"
        type="text"
        placeholder="Search"
      />
      <BsSearch className="absolute right-4 top-1/2 -translate-y-1/2" />
    </div>
  );
};

export default SearchBar;
