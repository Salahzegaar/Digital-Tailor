import { ColorOption, PoseCategory, ArtisticStyle, ImageFilter } from './types';

export const COLORS: ColorOption[] = [
    { name: 'White', arName: 'أبيض', hex: '#ffffff' },
    { name: 'Warm Beige', arName: 'بيج دافئ', hex: '#eaddd7' },
    { name: 'Cool Grey', arName: 'رمادي بارد', hex: '#d1d5db' },
    { name: 'Soft Pink', arName: 'وردي ناعم', hex: '#fbcfe8' },
    { name: 'Sky Blue', arName: 'أزرق سماوي', hex: '#bae6fd' },
    { name: 'Olive Green', arName: 'أخضر زيتوني', hex: '#6b705c' },
    { name: 'Burnt Orange', arName: 'برتقالي محروق', hex: '#d97706' },
    { name: 'Rich Maroon', arName: 'أحمر داكن', hex: '#883a3a' },
    { name: 'Deep Navy', arName: 'أزرق كحلي', hex: '#2b2d42' },
    { name: 'Charcoal', arName: 'فحمي داكن', hex: '#374151' },
];

export const POSE_CATEGORIES: PoseCategory[] = [
    {
        title: 'للملابس الرسمية والأنيقة',
        poses: [
            { ar: 'مشية موديل واثقة', en: 'a confident walking pose' },
            { ar: 'وقفة تصوير شيك', en: 'an elegant and poised standing pose' },
            { ar: 'كأنها بتتكلم في اجتماع', en: 'as if assertively explaining a point' },
            { ar: 'وقفة راقية (إيد عـ الوسط)', en: 'a sophisticated pose with one hand on the hip' },
            { ar: 'نزلة ستايل من ع السلم', en: 'as if confidently descending a staircase' }
        ]
    },
    {
        title: 'للملابس الرياضية والحركية',
        poses: [
            { ar: 'لقطة جري رياضي', en: 'a powerful running motion' },
            { ar: 'قفزة ديناميكية في الهوا', en: 'a dynamic mid-air jumping pose' },
            { ar: 'وضعية يوغا أو إطالة', en: 'a focused yoga or stretching pose' },
            { ar: 'كأنها بتشوط كورة', en: 'in a dynamic pose as if kicking a ball' },
            { ar: 'إطالة بعد التمرين', en: 'a powerful post-workout stretching pose' }
        ]
    },
    {
        title: 'للملابس الكاجوال والمريحة',
        poses: [
            { ar: 'حركة عائمة ومريحة', en: 'a relaxed floating pose, suggesting ease' },
            { ar: 'تتمايل مع نسمة هوا', en: 'gently swaying as if caught in a breeze' },
            { ar: 'ساندة على حاجة', en: 'a casual leaning pose' },
            { ar: 'قاعدة في الهوا', en: 'casually sitting on an invisible stool' },
            { ar: 'ساندة على حيطة وهمية', en: 'leaning against an invisible wall with crossed arms' }
        ]
    },
    {
        title: 'للفساتين والملابس الحريمي',
        poses: [
            { ar: 'لفة فستان رشيقة', en: 'a graceful twirling motion, with the fabric flowing out' },
            { ar: 'مشية فخمة وساحرة', en: 'a sweeping, majestic walking pose' },
            { ar: 'انحناءة بسيطة وأنيقة', en: 'a gentle curtsy pose, with the fabric draping elegantly' },
            { ar: 'وقفة درامية لعرض الأكمام', en: 'a dramatic pose with arms outstretched, showcasing the sleeves' }
        ]
    },
    {
        title: 'وضعيات حركية وديناميكية',
        poses: [
            { ar: 'ماشية عكس الريح', en: 'a powerful forward stride, as if walking into a strong wind' },
            { ar: 'قفزة جانبية درامية', en: 'a dramatic mid-air leap to the side' },
            { ar: 'وقفة استعداد للانطلاق', en: 'an athletic pose, as if about to sprint off the blocks' },
            { ar: 'لفة سريعة مع حركة القماش', en: 'a quick twisting motion, capturing the fabric in movement' },
            { ar: 'حركة احتفالية', en: 'arms thrown up in a celebratory motion' }
        ]
    }
];

export const ARTISTIC_STYLES: ArtisticStyle[] = [
    { key: 'default', name: 'الوضع العادي (افتراضي)' },
    { key: 'cinematic', name: 'إضاءة سينمائية' },
    { key: 'ethereal', name: 'أثيري وهوت كوتور' },
    { key: 'minimalist', name: 'بسيط وحركي' },
    { key: 'street', name: 'ستريت ستايل وظلال' }
];

export const IMAGE_FILTERS: ImageFilter[] = [
    { key: 'none', name: 'بدون فلتر', className: 'filter-none' },
    { key: 'vintage', name: 'فينتاج', className: 'filter-vintage' },
    { key: 'bw', name: 'أبيض وأسود', className: 'filter-bw' },
    { key: 'saturated', name: 'ألوان مشبعة', className: 'filter-saturated' },
    { key: 'cool', name: 'تون بارد', className: 'filter-cool' },
    { key: 'warm', name: 'تون دافئ', className: 'filter-warm' }
];

export const BACKGROUND_PROMPTS: Record<string, string> = {
    'White': "a seamless, pure white studio background",
    'Warm Beige': "a seamless, warm beige studio background",
    'Cool Grey': "a seamless, gradient cool grey studio background",
    'Soft Pink': "a seamless, soft pastel pink studio background",
    'Sky Blue': "a seamless, light sky blue studio background",
    'Olive Green': "a seamless, muted olive green studio background",
    'Burnt Orange': "a seamless, warm burnt orange studio background",
    'Rich Maroon': "a seamless, rich maroon studio background",
    'Deep Navy': "a seamless, deep navy blue studio background",
    'Charcoal': "a seamless, dark charcoal grey studio background"
};

export const ARTISTIC_STYLE_TEMPLATES: Record<string, string> = {
    'cinematic': "A stunning, high-fashion product photograph of a garment, gracefully floating or suspended. The composition is centered. Dramatic, cinematic lighting from the upper right creates intense, warm highlights and ethereal, glowing rim light effect that sharply contrasts with cooler shadows. The background is {{BACKGROUND_PLACEHOLDER}}. The overall aesthetic is clean, modern, and elegant, rendered with photorealistic precision, emphasizing the delicate texture and luxurious feel of the fabric, achieved with a shallow depth of field.",
    'ethereal': "A highly detailed, ethereal, high-fashion studio shot of a pristine white mannequin gracefully 'floating' mid-air, wearing an exquisite garment. The entire scene is bathed in soft, diffused, high-key overhead lighting. Surrounding the mannequin are numerous delicate, abstract, petal-like fabric elements, fluttering around. The background is a vast, flowing cascade of smooth fabric that is {{BACKGROUND_PLACEHOLDER}}. The image exudes a sense of purity, lightness, and elegant motion, rendered with hyperrealistic detail.",
    'minimalist': "A high-key, minimalist studio product photograph of a garment, dynamically suspended mid-air as if in motion. The garment exhibits natural folds and creases. The composition features the garment floating against a clean, seamless background which is {{BACKGROUND_PLACEHOLDER}}. Soft, diffused professional studio lighting illuminates the garment from above and slightly in front, creating subtle volumetric shadows. A soft, elongated shadow is cast beneath the garment. Shot with a shallow depth of field, sharp focus, evoking a clean, contemporary aesthetic.",
    'street': "A full-body, high-fashion studio shot of an invisible person or headless mannequin, dynamically posed. The background is a clean, minimalist seamless studio setup which is {{BACKGROUND_PLACEHOLDER}}. Dramatic, high-contrast, directional natural light originates from the upper left, casting intricate, sharp, elongated shadow patterns resembling palm fronds or window blinds across the entire background and subtly onto the subject. The lighting creates strong specular highlights on the fabric. The overall aesthetic is modern, clean, editorial, and sophisticated with a strong focus on light and shadow play."
};