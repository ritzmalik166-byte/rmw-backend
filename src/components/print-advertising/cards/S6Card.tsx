import { BsArrowRight } from "react-icons/bs";
import styles from "../page.module.css"


function S6Card({ data }: { data: { name: string, language: string } }) {
    return (
        <div className="w-full max-w-[235px] xl:w-[235px] flex flex-col justify-center gap-3 sm:gap-4 xl:gap-4 border border-[#E5E5E5] rounded-[5px] p-3 sm:p-4 xl:p-4">
            <h6 className={`font-[600] text-[16px] sm:text-[18px] ${styles.fontmontserrat} whitespace-nowrap overflow-hidden text-ellipsis`}>{data.name}</h6>
            <div className="w-full flex justify-between items-center gap-2">
                <p className={`font-[400] text-[14px] sm:text-[16px] ${styles.fontopensans}`}>{data.language}</p>
                <BsArrowRight className="w-4 h-4 sm:w-5 sm:h-5 xl:w-5 xl:h-5 flex-shrink-0" />
            </div>
        </div>
    )
}

export default S6Card;