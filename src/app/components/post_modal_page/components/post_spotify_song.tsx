import MusicNoteIcon from '@mui/icons-material/MusicNote';

export const Post_spotify_song = ({setPostMusic}) => {
    const clickHandler = () => {
        setPostMusic(true)
    }

    return (
        <button onClick={clickHandler}>
            <MusicNoteIcon />
        </button>
    )
}