export interface StoryFolder {
  id: number;
  title: string;
  category: string;
  date: string;
  slug: string;
}

export interface Story {
  id: number;
  title: string;
  slug: string;
  slides: Slide[];
  image: string;
}

export interface Slide {
  type: string;
  text: string;
  image: string;
} 