export interface COURSE_FEATURE {
  id: number;
  text: string;
  order: number;
}

export interface COURSE {
  id: number;
  name: string;
  description: string;
  price: string;        // DecimalField → string (IMPORTANT)
  image: string | null; // ImageField URL or null
  order: string;        // DecimalField (e.g. "1.1")
  badge: string | null;
  features: COURSE_FEATURE[];
}