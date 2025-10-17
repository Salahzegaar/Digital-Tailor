import React from 'react';
import { CheckIcon } from './Icons';
import { COLORS } from '../constants';

interface BackgroundColorSelectorProps {
    selectedColor: string;
    onSelectColor: (color: string) => void;
    disabled: boolean;
}

export const BackgroundColorSelector: React.FC<BackgroundColorSelectorProps> = ({ selectedColor, onSelectColor, disabled }) => {
    return (
        <div className="grid grid-cols-5 gap-3 p-2 bg-stone-200/50 rounded-lg">
            {COLORS.map((color) => {
                const isSelected = selectedColor === color.name;
                const isDark = ['Olive Green', 'Burnt Orange', 'Rich Maroon', 'Deep Navy', 'Charcoal'].includes(color.name);
                return (
                    <button
                        key={color.name}
                        type="button"
                        title={color.arName}
                        disabled={disabled}
                        onClick={() => onSelectColor(color.name)}
                        className={`w-10 h-10 rounded-full border-2 transition-all duration-200 transform active:scale-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-stone-200 focus:ring-red-800 disabled:opacity-50 flex items-center justify-center ${
                            isSelected ? 'border-red-800 scale-110 shadow-lg' : 'border-stone-400/50 hover:border-red-800/80'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        aria-pressed={isSelected}
                    >
                        {isSelected && <CheckIcon className={`w-6 h-6 ${isDark ? 'text-white' : 'text-stone-900'}`} />}
                    </button>
                );
            })}
        </div>
    );
};
