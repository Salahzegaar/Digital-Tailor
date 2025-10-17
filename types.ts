export interface ImagePart {
  data: string;
  mimeType: string;
}

export interface EditedImageResult {
  newImage: ImagePart;
  responseText?: string;
}

export type Theme = 'light' | 'dark';

export type DropState = 'idle' | 'dragging' | 'processing';

export interface ColorOption {
    name: string;
    arName: string;
    hex: string;
}

export interface Pose {
    ar: string;
    en: string;
}

export interface PoseCategory {
    title: string;
    poses: Pose[];
}

export interface ArtisticStyle {
    key: string;
    name: string;
}

export interface ImageFilter {
    key: string;
    name: string;
    className: string;
}
