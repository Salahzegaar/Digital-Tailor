import React from 'react';
import { IMAGE_FILTERS } from '../constants';
import { ImageFilter } from '../types';

interface ImageFilterSelectorProps {
    selectedFilter: string;
    onSelectFilter: (filterKey: string) => void;
}

export const ImageFilterSelector: React.FC<ImageFilterSelectorProps> = ({ selectedFilter, onSelectFilter }) => {
    return (
        <div className="flex flex-wrap gap-2 justify-center">
            {IMAGE_FILTERS.map((filter: ImageFilter) => (
                <button
                    key={filter.key}
                    type="button"
                    onClick={() => onSelectFilter(filter.key)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-stone-100 focus:ring-red-800 ${
                        selectedFilter === filter.key
                            ? 'bg-red-800 text-white shadow-md'
                            : 'bg-white/60 text-stone-800 hover:bg-stone-300/70'
                    }`}
                >
                    {filter.name}
                </button>
            ))}
        </div>
    );
};
