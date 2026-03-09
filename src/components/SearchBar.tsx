import React, { useState } from 'react';

interface Props {
  onSearch: (city: string) => void;
  onGeolocate: () => void;
  loading: boolean;
}

const SearchBar: React.FC<Props> = ({ onSearch, onGeolocate, loading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search city... e.g. London, Manchester, Tokyo"
        className="flex-1 px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-5 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors disabled:opacity-50"
      >
        {loading ? '⏳' : '🔍'}
      </button>
      <button
        type="button"
        onClick={onGeolocate}
        disabled={loading}
        title="Use my location"
        className="px-4 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors border border-white/30 disabled:opacity-50"
      >
        📍
      </button>
    </form>
  );
};

export default SearchBar;