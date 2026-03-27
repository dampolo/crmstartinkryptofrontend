export enum STATUS {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED'
}

export enum LANGUAGE {
  DE = 'DE',
  PL = 'PL',
}

export interface COURSE_FEATURE {
    id: number;
    text: string;
    order: number;
}

export interface UPDATE_COURSE_FEATURE {
  course: number;
  order: number;
  text: string;
}

export interface COURSE {
    id: number;
    name: string;
    description: string;
    price: string;        // DecimalField → string (IMPORTANT)
    image: string | null; // ImageField URL or null
    order: string; 
    badge: string | null;
    status: STATUS;
    features: COURSE_FEATURE[]
}

export interface PURCHASED_COURSE {
    id: number;
    name: string;
    description: string;
    image: string | null;
    order: string;      // DecimalField → string
    language: string;
}

export interface PDF {
    id: number;
    title: string;
    file: string
}

export interface PURCHASE {
    id: number;
    course: PURCHASED_COURSE;
    lessons_count: number;
    discount: number | null; // FK id or null
    price: string;           // DecimalField → string
    created_at: string;      // ISO datetime string
}

export interface LESSON {
    id: number;
    course: number;
    title: string;
    description: string;
    video: string | null;
    description_under_video: string;
    order: string;
    status: 'draft' | 'published';
    duration: number;
    pdfs: PDF[]
}

export interface DISCOUNT_CODE {
    id: number
    code: string
    percent_value: number
}

export interface TAX {
    name: string,
    percent: string,
    active: boolean
}