import { Filter } from 'lucide-react';

interface FilterSidebarProps {
  onFilterChange: (filters: {
    year?: number;
    minRating?: number;
  }) => void;
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);
  const ratings = [9, 8, 7, 6, 5];

  return (
    <div className="bg-gray-900 rounded-lg p-6 sticky top-24">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-red-600" />
        <h2 className="text-xl font-bold text-white">Filtreler</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-white font-medium mb-3 block">Yıl</label>
          <select
            onChange={(e) => onFilterChange({ year: e.target.value ? parseInt(e.target.value) : undefined })}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <option value="">Tüm Yıllar</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-white font-medium mb-3 block">Minimum Puan</label>
          <select
            onChange={(e) => onFilterChange({ minRating: e.target.value ? parseInt(e.target.value) : undefined })}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <option value="">Tümü</option>
            {ratings.map((rating) => (
              <option key={rating} value={rating}>
                {rating}+ IMDB
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => onFilterChange({})}
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
        >
          Filtreleri Temizle
        </button>
      </div>
    </div>
  );
}
