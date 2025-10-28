function getFlagsColor(text: string) {
   if (text === "low") {
      return "#33cc04";
   } else if (text === "medium") {
      return "#f0d50a";
   } else {
      return "#f53636";
   }
}

export default getFlagsColor  