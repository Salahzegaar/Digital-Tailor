import React, { useState } from 'react';
import { ShirtIcon, EyeIcon, EyeOffIcon } from './Icons';

interface LoginProps {
    onLoginWithKey: (key: string) => void;
    onSelectFromStudio: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginWithKey, onSelectFromStudio }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiKey, setApiKey] = useState('');
    const [showKey, setShowKey] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!apiKey) return;
        setIsLoading(true);
        // Simulate a small delay to show loading, as the state change is instant
        setTimeout(() => {
            onLoginWithKey(apiKey);
            setIsLoading(false);
        }, 100);
    };

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
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                           <label htmlFor="api-key-input" className="block text-sm font-bold text-stone-700 mb-2">
                                أدخل مفتاح API الخاص بك
                            </label>
                            <div className="relative">
                                <input
                                    id="api-key-input"
                                    type={showKey ? 'text' : 'password'}
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                    placeholder="AIzaSy... "
                                    className="w-full px-4 py-3 pr-10 bg-white/50 border-2 border-stone-300/70 rounded-lg text-stone-800 focus:ring-2 focus:ring-red-800 focus:border-red-800 transition-colors"
                                    required
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowKey(!showKey)}
                                    className="absolute inset-y-0 right-0 flex items-center px-3 text-stone-500 hover:text-red-800"
                                    aria-label={showKey ? 'إخفاء مفتاح API' : 'إظهار مفتاح API'}
                                >
                                    {showKey ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                        
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading || !apiKey}
                                className="w-full mt-2 px-8 py-3 bg-red-800 text-white font-bold rounded-lg hover:bg-red-700 disabled:bg-stone-400/50 disabled:cursor-not-allowed disabled:text-stone-600 transition-all duration-300 transform hover:scale-105 active:scale-[0.98] shadow-lg shadow-red-900/30"
                            >
                                {isLoading ? '...جاري الدخول' : 'دخول'}
                            </button>
                        </div>
                    </form>
                    
                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-stone-400/50"></div>
                        <span className="flex-shrink mx-4 text-stone-500 text-sm">أو</span>
                        <div className="flex-grow border-t border-stone-400/50"></div>
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