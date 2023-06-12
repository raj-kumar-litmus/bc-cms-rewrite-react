export const isAllEqual = (arr) => arr.every((item) => item === arr[0]);

export const searchString = (search) => {
  return search.includes(",")
    ? search?.replaceAll(" ", "")?.split(",")
    : search?.trim();
};
