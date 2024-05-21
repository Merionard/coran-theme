import { Search } from "lucide-react";
import { Input } from "./input";

type Props = {
  search: string;
  onSearch: (search: string) => void;
};

export const SearchInput = ({ search, onSearch }: Props) => {
  return (
    <div className="relative w-full">
      <Input
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Rechercher thème"
      />
      <Search className="h-6 w-6 absolute top-1/2  -translate-y-1/2 right-3 text-gray-400" />
    </div>
  );
};
