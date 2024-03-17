import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface Context {
  textContent: string;
  setTextContent: Dispatch<string>;
  image: string;
  setImage: Dispatch<SetStateAction<string | ArrayBuffer>>;
  imagePreview: string;
  setImagePreview: Dispatch<SetStateAction<string | ArrayBuffer>>;
}

const PostContentContext = createContext<Context>({
  textContent: "",
  setTextContent: () => {},
  image: "",
  setImage: () => {},
  imagePreview: "",
  setImagePreview: () => {},
});

export const PostContentProvider = ({ children }) => {
  const [textContent, setTextContent] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const value = {
    textContent,
    setTextContent,
    image,
    setImage,
    imagePreview,
    setImagePreview,
  };
  return (
    <PostContentContext.Provider value={value}>
      {children}
    </PostContentContext.Provider>
  );
};

export const usePostContentContext = () => useContext(PostContentContext);
