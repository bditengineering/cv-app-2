const year = new Date().getFullYear();
export const yearsOptions = Array.from(
  new Array(50),
  (val, index) => year - index,
);

export const englishLevels = [
  { value: "no proficiency", label: "No Proficiency" },
  { value: "elementary proficiency", label: "Elementary Proficiency" },
  {
    value: "limited working proficiency",
    label: "Limited Working Proficiency",
  },
  {
    value: "professional working proficiency",
    label: "Professional Working Proficiency",
  },
  {
    value: "full professional proficiency",
    label: "Full Professional Proficiency",
  },
  {
    value: "native or bilingual proficiency",
    label: "Native Or Bilingual Proficiency",
  },
];
