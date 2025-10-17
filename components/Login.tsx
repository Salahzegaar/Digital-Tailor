import React, { useState } from 'react';
import { ShirtIcon } from './Icons';

interface LoginProps {
    onSelectKey: () => void;
}

export const Login: React.FC<LoginProps> = ({ onSelectKey }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);
        onSelectKey();
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
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                        <div className="text-center">
                            <p className="text-md text-stone-600 pt-4 pb-2">
                                للبدء، يرجى اختيار مفتاح API الخاص بك من Google AI Studio.
                            </p>
                            <p className="text-center text-xs text-stone-500 pb-4">
                                قد يتم تطبيق رسوم. <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-red-800 underline hover:text-red-600 transition-colors">اعرف المزيد عن الفوترة</a>.
                            </p>
                        </div>
                        <div className="pt-4">
                            <button
                                onClick={handleSelect}
                                disabled={isLoading}
                                className="w-full px-8 py-3 bg-red-800 text-white font-bold rounded-lg hover:bg-red-700 disabled:bg-stone-400/50 disabled:cursor-not-allowed disabled:text-stone-600 transition-all duration-300 transform hover:scale-105 active:scale-[0.98] shadow-lg shadow-red-900/30"
                            >
                                {isLoading ? '...جاري الفتح' : 'اختر مفتاح API'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};