import React from 'react';
import { MapPin, Search } from 'lucide-react';

interface SearchBarProps {
  city: string;
  setCity: (city: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ city, setCity, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex items-center bg-black/50 backdrop-blur-xl rounded-full p-2 ring-1 ring-white/10">
          <MapPin className="h-6 w-6 text-blue-400 ml-4" />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Buscar ciudad..."
            className="flex-1 bg-transparent px-4 py-3 text-lg text-white placeholder-blue-200/70 focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-2"
          >
            <Search className="h-5 w-5" />
            <span>Buscar</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;