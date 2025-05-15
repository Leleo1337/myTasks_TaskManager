import type { customFlagProps } from "../types/Flags";
import hexToRGB from "../utils/hexToRgba";

export default function CustomFlag({ text, color }: customFlagProps) {
   const backgroundColor = hexToRGB(color, "0.25");
   const textColor = hexToRGB(color, "1");
   return (
      <div
         className="px-2 rounded-xl font-semibold text-xs"
         style={{ backgroundColor: backgroundColor, color: textColor }}>
         {text}
      </div>
   );
}
