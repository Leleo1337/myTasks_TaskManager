import clsx from "clsx";
import type { customFlagProps } from "../types/flagsTypes";
import hexToRGB from "../utils/hexToRgba";

export default function CustomFlag({ text, color, size, allowDelete, onClick }: customFlagProps) {
   const backgroundColor = hexToRGB(color, "0.25");
   const textColor = hexToRGB(color, "1");
   return (
      <>
         <div onClick={onClick}
            className={clsx(
               `px-2 py-0.5 rounded-md font-semibold`,
               size === "small" && `text-xs`,
               size === "medium" && `text-md px-3`,
               allowDelete && "cursor-pointer hover:opacity-50"
            )}
            style={{ backgroundColor: backgroundColor, color: textColor }}>
            {text}
         </div>
      </>
   );
}
