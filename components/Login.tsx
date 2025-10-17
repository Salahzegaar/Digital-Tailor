
import React, { useState } from 'react';
import { ShirtIcon } from './Icons';

interface LoginProps {
    onSelectFromStudio: () => void;
}

// FIX: Removed all logic and UI related to manual API key input to comply with guidelines.
// The component now only supports selecting a key from AI Studio.
export const Login: React.FC<LoginProps> = ({ onSelectFromStudio }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSelectFromStudio = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);
        onSelectFromStudio();
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-[rgba(var(--color-surface-rgb),0.3)] backdrop-blur-md border border-[rgba(var(--color-border-rgb),0.3)] rounded-2xl p-8 shadow-2xl shadow-stone-900/10 animate-fade-in-up">
                    <div className="text-center mb-8">
                        <div className="flex justify-center items-center gap-4">
                            <ShirtIcon className="w-10 h-10 text-red-800" />
                            <div>
                                <h1 className="text-3xl font-black text-stone-900 tracking-wider">الخياط الرقمي</h1>
                                <p className="text-stone-600 mt-0.5 text-sm">أزياء عصرية بلمسة ذكاء</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="text-center">
                         <button
                            onClick={handleSelectFromStudio}
                            disabled={isLoading}
                            className="w-full px-8 py-3 bg-stone-200/50 text-stone-700 font-bold rounded-lg border border-stone-400/50 hover:bg-stone-300/70 disabled:bg-stone-400/50 disabled:cursor-not-allowed disabled:text-stone-600 transition-all duration-300"
                        >
                            {isLoading ? '...جاري الفتح' : 'اختر مفتاح من AI Studio'}
                        </button>
                        <p className="text-center text-xs text-stone-500 pt-4">
                            قد يتم تطبيق رسوم. <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-red-800 underline hover:text-red-600 transition-colors">اعرف المزيد عن الفوترة</a>.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};
