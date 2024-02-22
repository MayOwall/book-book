export const getBookitems = async (keyword: string, page: number) => {
  const data = await fetch(`/api/searchbook?keyword=${keyword}&page=${page}`);
  const { total, bookitems } = await data.json();
  return { total, bookitems };
};
