import {useState} from "react";
import {Post_timeline_section} from "@/app/components/main_page_sections_/post_timeline_section/post_timeline_section";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Search_timeline = () => {
    const [ searchTerm, setSearchTerm ] = useState("");
    const [ isFocused, setIsFocused] = useState(false)

    const handleUserInput = (e) => {
        setSearchTerm(e.target.value)
    }
    const handleFocus = () => {
        // 親要素のクラスを変更する
        document.querySelector('.search_ber').classList.add('focus');
        setIsFocused(true)
    };

    const handleBlur = () => {
        // 親要素のクラスを元に戻す
        document.querySelector('.search_ber').classList.remove('focus');
        setIsFocused(false)
    };

    return(
        <div className={"h-screen"}>
            <div className={"flex justify-center"}>
                <div
                    className={"w-4/5 md:w-full border border-black search_ber mt-8 text-center py-2 flex justify-between"}>
                    <div className={"flex justify-center"}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={"search-icon p-4 "}
                                         color={isFocused ? "aqua" : ""}/>
                    </div>
                    <input type={"text"} className={"py-2 w-4/5 bg-transparent"} value={searchTerm} onChange={handleUserInput}
                           onFocus={handleFocus} onBlur={handleBlur}/>
                </div>
            </div>

            {searchTerm ? <Post_timeline_section searchTerm={searchTerm}/>: <div className={"mt-32 text-center"}>Please enter something you want to find...</div>}
        <style jsx>
            {`
            input[type="text"]:focus{
              outline: none;
            }
            .search_ber.focus{
              border-color: aqua;
            }
            `}

        </style>
        </div>
    )
}