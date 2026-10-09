import { MergedBlogs2 } from "@/allPages/blogPage/Articles";
import React, { createContext, useState, useContext, useCallback } from "react";

interface BlogContextType {
  blogTitle: string;
  blogBanner: string;
  metaTitle: string;
  metaDescription: string;
  innerImg: string;
  metaKeywords: string;
  mtDesc: string;
  setBlogTitle: (val: string) => void;
  setBlogBanner: (val: string) => void;
  setMetaTitle: (val: string) => void;
  setInnerImg: (val: string) => void;
  setMetaDescription: (val: string) => void;
  setMetaKeywords: (val: string) => void;
  setMtDesc: (val: string) => void;
  resetBlogForm: () => void;
  blogs: MergedBlogs2[];
  setBlogs: React.Dispatch<React.SetStateAction<MergedBlogs2[]>>;
  liveUsers: number;
  setLiveUsers: (val: number) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogBanner, setBlogBanner] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [innerImg, setInnerImg] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [mtDesc, setMtDesc] = useState("");
  const [blogs, setBlogs] = useState<MergedBlogs2[]>([]);
  const [liveUsers, setLiveUsers] = useState(0);

  const resetBlogForm = useCallback(() => {
    setBlogTitle("");
    setBlogBanner("");
    setMetaTitle("");
    setMetaDescription("");
    setInnerImg("");
    setMetaKeywords("");
    setMtDesc("");
  }, []);

  return (
    <BlogContext.Provider
      value={{
        blogBanner,
        blogTitle,
        metaDescription,
        metaKeywords,
        innerImg,
        metaTitle,
        mtDesc,
        setBlogBanner,
        setBlogTitle,
        setMetaTitle,
        setInnerImg,
        setMetaDescription,
        setMetaKeywords,
        setMtDesc,
        resetBlogForm,
        blogs,
        setBlogs,
        liveUsers,
        setLiveUsers,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (!context)
    throw new Error("useBlogContext must be used within a BlogProvider");
  return context;
};