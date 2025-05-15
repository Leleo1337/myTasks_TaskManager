import type { priorityFlagProps } from "../types/flagsTypes";
import hexToRGB from "../utils/hexToRgba";
import getFlagsColor from "../utils/priorityFlagsColor";

export default function PriorityFlag({ type }: priorityFlagProps) {
   const color = getFlagsColor(type);

   return (
      <div
         className="flex items-center justify-center px-2 rounded-xl font-semibold text-xs"
         style={{ backgroundColor: hexToRGB(color, "0.15"), color: hexToRGB(color, "1") }}>
         {type}
      </div>
   );
}
