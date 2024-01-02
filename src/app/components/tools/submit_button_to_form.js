import {motion} from "framer-motion";

export const Submit_button_to_form = ({text}) => {
    return (
        <div>
            <motion.button
                whileHover={{ scale: 1.1,  }}
                className="border border-black px-2 py-1  rounded-2xl w-24 h-12"
                type="submit">{text}</motion.button>
        </div>
    )
}