import { motion } from "framer-motion";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

export const Post_spotify_song = ({ setPostMusic }) => {
  const clickHandler = () => {
    setPostMusic(true);
  };

  return (
    <button onClick={clickHandler}>
      <motion.div
        whileHover={{ scale: 1.2, rotate: 30 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <MusicNoteIcon />
      </motion.div>
    </button>
  );
};
