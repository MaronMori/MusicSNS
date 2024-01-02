import ClearIcon from '@mui/icons-material/Clear';
import {motion} from "framer-motion";

export const Post_modal_header = ({onClose}) => {
    return (
        <div className={"modal-header"}>
            <div className={"modal-cancel-icon"}>
                <motion.button whileHover={{ scale: 1.1}} className={"mb-2"} onClick={onClose}>
                    <ClearIcon />
                </motion.button>
            </div>
            <hr className={"font-bold"}/>
        </div>
    )
}