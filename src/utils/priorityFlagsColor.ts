function getFlagsColor(text: string) {
   if (text === "LOW") {
      return "#33cc04";
   } else if (text === "MEDIUM") {
      return "#f0d50a";
   } else {
      return "#f53636";
   }
}

export default getFlagsColor  