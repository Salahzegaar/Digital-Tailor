import React, { useState } from 'react';
import { ChevronDownIcon } from './Icons';
import { POSE_CATEGORIES } from '../constants';

interface FashionPoseSelectorProps {
    selectedPose: string;
    onSelectPose: (pose: string) => void;
    disabled: boolean;
}

export const FashionPoseSelector: React.FC<FashionPoseSelectorProps> = ({ selectedPose, onSelectPose, disabled }) => {
    const [openCategory, setOpenCategory] = useState<string | null>(POSE_CATEGORIES[0]?.title ?? null);

    return (
        <div className="space-y-2 animate-fade-in-up">
            {POSE_CATEGORIES.map((category) => {
                const isOpen = openCategory === category.title;
                const categoryId = `poses-${category.title.replace(/\s/g, '-')}`;
                return (
                    <div key={category.title} className="p-3 bg-stone-200/50 rounded-lg">
                        <button
                            type="button"
                            onClick={() => setOpenCategory(p => p === category.title ? null : category.title)}
                            className="w-full flex justify-between items-center text-left"
                            aria-expanded={isOpen}
                            aria-controls={categoryId}
                        >
                            <h5 className="text-sm font-bold text-stone-700">{category.title}</h5>
                            <ChevronDownIcon className={`w-5 h-5 text-stone-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <div
                            id={categoryId}
                            className={`grid transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'grid-rows-[1fr] mt-2' : 'grid-rows-[0fr]'}`}
                        >
                            <div className="min-h-0">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {category.poses.map((pose) => (
                                        <button
                                            key={pose.en}
                                            type="button"
                                            disabled={disabled}
                                            onClick={() => onSelectPose(pose.en)}
                                            className={`w-full p-2 text-xs font-semibold rounded-md text-left transition-all transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-stone-200 focus:ring-red-800 disabled:opacity-50 ${
                                                selectedPose === pose.en ? 'bg-red-800 text-white shadow-md' : 'bg-white/60 text-stone-800 hover:bg-stone-300/70'
                                            }`}
                                        >
                                            {pose.ar}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
