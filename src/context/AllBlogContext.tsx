"use client";

import React, {
  createContext,
  useContext,
  useState,
  //   useEffect,
  ReactNode,
} from "react";

// Blog type
export interface MergedBlogs {
  id: string;
  banner: string;
  title: string;
  createdAt: string;
  meta_description: string;
  status?: string;
  slug?: string;
}

// Context interface
interface BlogContextType {
  blogs: MergedBlogs[];
  setBlogs: React.Dispatch<React.SetStateAction<MergedBlogs[]>>;
}

// Create Context
const BlogContext = createContext<BlogContextType | undefined>(undefined);

// Provider component
export const BlogProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [blogs, setBlogs] = useState<MergedBlogs[]>([]);

  return (
    <BlogContext.Provider value={{ blogs, setBlogs }}>
      {children}
    </BlogContext.Provider>
  );
};

// Custom hook to access the context
export const useBlogContext = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlogContext must be used within a BlogProvider");
  }
  return context;
};
