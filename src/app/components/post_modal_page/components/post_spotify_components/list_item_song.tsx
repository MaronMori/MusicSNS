import { motion } from "framer-motion"

export const List_item_song = ({song, setSongPost, setTrackInfoForPost}) => {
    // console.log(song.track.artists[0])

    const hoverAnimation = {
        backgroundColor: "#CCFFFF"
    }
    const transition = {
        type: "tween", // トランジションの種類
        duration: 0.2 // トランジションの時間
    }

    const songSelected = (event) => {
        event.preventDefault()
        setTrackInfoForPost(song)
        setSongPost(true)
    }

    return (
        <div className={"w-full border-b-2"}>
            <motion.button whileHover={hoverAnimation} transition={transition} className={"flex w-full items-center bg-white"} onClick={(event) => songSelected(event)}>
                <img src={song.track.album.images[0].url} alt={"Song Picture"} className={"h-24 w-24"}/>
                <div className={"text-left pl-2 flex flex-col justify-center"}>
                        <p>{song.track.artists[0].name}</p>
                        <p className={"font-bold"}>{song.track.name}</p>
                </div>
            </motion.button>
        </div>
    )
}