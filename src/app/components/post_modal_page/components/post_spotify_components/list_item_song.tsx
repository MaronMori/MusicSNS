export const List_item_song = ({song}) => {
    // console.log(song.track.artists[0])
    return (
        <div className={"w-full"}>
            <button className={"flex w-max justify-between"}>
                <img src={song.track.album.images[0].url} alt={"Song Picture"} className={"h-24 w-24"}/>
                <div className={"text-left"}>
                    <p>{song.track.artists[0].name}</p>
                    <p>{song.track.name}</p>
                </div>
            </button>
        </div>
    )
}