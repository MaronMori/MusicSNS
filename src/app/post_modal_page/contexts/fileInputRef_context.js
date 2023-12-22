import {createContext, useContext, useState} from "react";

const PostContentContext = createContext();

export const PostContentProvider = ({children}) => {
    const [textContent, setTextContent ] = useState("");
    const [image, setImage ] = useState("")
    const [imagePreview, setImagePreview] = useState();

    const value = {
        textContent,
        setTextContent,
        image,
        setImage,
        imagePreview,
        setImagePreview
    };
    return (
        <PostContentContext.Provider value={value}>
            {children}
        </PostContentContext.Provider>
    )
}

export const usePostContentContext = () => useContext(PostContentContext);