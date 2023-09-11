const year = new Date().getFullYear();
export const yearsOptions = Array.from(
  new Array(50),
  (val, index) => year - index
);
