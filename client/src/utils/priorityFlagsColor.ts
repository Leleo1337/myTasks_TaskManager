function getFlagsColor(text: string) {
   if (text === "Low") {
      return "#33cc04";
   } else if (text === "Medium") {
      return "#f0d50a";
   } else {
      return "#f53636";
   }
}

export default getFlagsColor