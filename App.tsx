import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { SceneInputForm } from './components/SceneInputForm';
import { LoadingSpinner } from './components/LoadingSpinner';
import { EditedImageCard } from './components/EditedImageCard';
import { ImageModal } from './components/ImageModal';
import { SparklesIcon, ShirtIcon } from './components/Icons';
import { ImagePart, EditedImageResult, Theme } from './types';
import { fileToBase64 } from './utils/fileUtils';
import { editImage } from './services/geminiService';
import { BACKGROUND_PROMPTS, ARTISTIC_STYLE_TEMPLATES } from './constants';


export const App: React.FC = () => {
    const [theme, setTheme] = useState<Theme>('light');
    const [images, setImages] = useState<ImagePart[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [editedImageResult, setEditedImageResult] = useState<EditedImageResult | null>(null);
    const [fashionPose, setFashionPose] = useState<string>('');
    const [fashionBackgroundColor, setFashionBackgroundColor] = useState<string>('Cool Grey');
    const [artisticStyle, setArtisticStyle] = useState<string>('default');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
    const [modalImage, setModalImage] = useState<string | null>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);
    
    const handleThemeChange = (newTheme: Theme) => setTheme(newTheme);

    const handleReset = () => {
        setImages([]);
        setImagePreviews(prev => {
            prev.forEach(URL.revokeObjectURL);
            return [];
        });
        setEditedImageResult(null);
        setFashionPose('');
        setFashionBackgroundColor('Cool Grey');
        setArtisticStyle('default');
        setIsLoading(false);
        setError(null);
        setHasSubmitted(false);
        setModalImage(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleImageAdd = useCallback(async (files: FileList | null, onComplete?: () => void) => {
        if (!files || files.length === 0) {
            onComplete?.();
            return;
        }
        if (files.length > 1) {
            setError("يمكنك إضافة صورة واحدة فقط.");
            onComplete?.();
            return;
        }
        const file = files[0];
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            setError(`حجم الصورة '${file.name}' كبير. اختار صورة أصغر من 10 ميجا.`);
            onComplete?.();
            return;
        }
        try {
            setError(null);
            const imagePart = await fileToBase64(file);
            setImages([imagePart]);
            setImagePreviews(prev => {
                prev.forEach(URL.revokeObjectURL);
                return [URL.createObjectURL(file)];
            });
        } catch (err) {
            console.error("Error converting file:", err);
            setError("حصلت مشكلة واحنا بنجهز الصور.");
        } finally {
            onComplete?.();
        }
    }, []);

    const handleImageRemove = useCallback((indexToRemove: number) => {
        setImages(prev => prev.filter((_, i) => i !== indexToRemove));
        setImagePreviews(prev => {
            const urlToRemove = prev[indexToRemove];
            const newPreviews = prev.filter((_, i) => i !== indexToRemove);
            if (urlToRemove) {
                URL.revokeObjectURL(urlToRemove);
            }
            return newPreviews;
        });
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoading || images.length === 0 || !fashionPose) return;

        setIsLoading(true);
        setHasSubmitted(true);
        setError(null);
        setEditedImageResult(null);

        setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);

        const backgroundDescription = BACKGROUND_PROMPTS[fashionBackgroundColor] || BACKGROUND_PROMPTS['Cool Grey'];
        let prompt: string;

        if (artisticStyle === 'default') {
            prompt = `Your task is to perform a professional fashion product photo transformation. 1. **Isolate the Outfit:** From the reference image provided, meticulously isolate the complete outfit. 2. **Remove the Model:** Completely remove every trace of the human model. The final image must contain ONLY the clothing on a perfectly invisible mannequin. 3. **Re-render on Invisible Mannequin:** Re-render the isolated outfit as a hyperrealistic 3D object, worn by an invisible mannequin in the following pose: "${fashionPose}". 4. **CRITICAL for Headwear:** If the garment is a hijab, reconstruct the inner lining to look natural on an invisible head. 5. **Set the Scene:** Place the outfit in a clean, minimalist scene with this background: ${backgroundDescription}. Use soft, diffused studio lighting. 6. **Final Aesthetic:** The final image must have a high-fashion, sophisticated, and ethereal editorial photography aesthetic.`;
        } else {
            const template = ARTISTIC_STYLE_TEMPLATES[artisticStyle];
            prompt = template.replace('{{BACKGROUND_PLACEHOLDER}}', backgroundDescription);
        }

        try {
            const result = await editImage(images, prompt);
            setEditedImageResult(result);
        } catch (err: any) {
            const errorMessage = err.message || 'للأسف حصلت مشكلة. جرب تاني كمان شوية.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, [images, isLoading, fashionPose, fashionBackgroundColor, artisticStyle]);

    const renderResults = () => {
        if (isLoading) {
            return (
                <div className="flex justify-center items-center h-full min-h-[400px]">
                    <LoadingSpinner />
                </div>
            );
        }
        if (error) {
            return (
                <div className="mt-12 text-center text-red-800 bg-red-200/50 p-4 rounded-lg animate-fade-in-up">
                    <p>{error}</p>
                </div>
            );
        }
        if (!hasSubmitted) {
            return (
                 <div className="flex flex-col justify-center items-center h-full min-h-[400px] text-center text-stone-500 p-8 border-2 border-dashed border-stone-300 rounded-2xl animate-fade-in-up">
                    <SparklesIcon className="w-16 h-16 mb-4 text-stone-400" />
                    <h2 className="text-2xl font-bold text-stone-700 mb-2">حوّل صور ملابسك لاحترافية</h2>
                    <p>ارفع صورة لقطعة ملابس، اختار الوضعية، والذكاء الاصطناعي هيعرضهالك على موديل خفي في استوديو احترافي.</p>
                </div>
            );
        }
        if (!editedImageResult) {
             return (
                 <div className="flex flex-col justify-center items-center h-full min-h-[400px] text-center text-stone-500 p-8 animate-fade-in-up">
                    <h2 className="text-2xl font-bold text-stone-700 mb-2">مفيش نتيجة طلعت</h2>
                    <p>الذكاء الاصطناعي معرفش يحلل الصورة دي. جرب صورة تانية.</p>
                </div>
            );
        }
        return (
            <div className="animate-fade-in-up">
                <EditedImageCard originalImages={imagePreviews} result={editedImageResult} onImageClick={setModalImage} />
            </div>
        );
    };
    
    return (
        <div className="min-h-screen text-stone-800 flex flex-col">
            <div className="flex-grow">
                <Header onReset={handleReset} theme={theme} onThemeChange={handleThemeChange} />
                <main className="container mx-auto px-4 py-8">
                    <div className="lg:grid lg:grid-cols-5 lg:gap-8">
                        <div className="lg:col-span-2 lg:sticky lg:top-8 self-start lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto custom-scrollbar">
                            <div className="bg-[rgba(var(--color-surface-rgb),0.3)] backdrop-blur-md border border-[rgba(var(--color-border-rgb),0.3)] rounded-2xl p-6 shadow-2xl shadow-stone-900/10">
                                <div className="flex items-center justify-center gap-2 pb-3 mb-6 border-b-2 border-red-800">
                                    <ShirtIcon className="w-5 h-5 text-red-800" />
                                    <h2 className="text-md font-bold text-red-800">الخياط الرقمي</h2>
                                </div>
                                <SceneInputForm
                                    handleSubmit={handleSubmit}
                                    isLoading={isLoading}
                                    imagePreviews={imagePreviews}
                                    handleImageAdd={handleImageAdd}
                                    handleImageRemove={handleImageRemove}
                                    fashionPose={fashionPose}
                                    setFashionPose={setFashionPose}
                                    fashionBackgroundColor={fashionBackgroundColor}
                                    setFashionBackgroundColor={setFashionBackgroundColor}
                                    artisticStyle={artisticStyle}
                                    setArtisticStyle={setArtisticStyle}
                                />
                            </div>
                        </div>
                        <div className="lg:col-span-3 mt-12 lg:mt-0" ref={resultsRef}>
                            {renderResults()}
                        </div>
                    </div>
                </main>
            </div>
            <footer className="text-center py-6 mt-auto">
                <p className="text-sm text-stone-500">صُنع بحب بواسطة زقعــــــــــار صلاح الدين ❤️</p>
            </footer>
            {modalImage && <ImageModal src={modalImage} onClose={() => setModalImage(null)} />}
        </div>
    );
};