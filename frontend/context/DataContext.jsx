import { createContext, useState } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [authors, setAuthors] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const value = {
    authors,
    setAuthors,
    blogs,
    setBlogs,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
