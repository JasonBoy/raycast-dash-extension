import { Docset } from "../types";

export const getFilteredDocsets = (docsets: Docset[], searchText: string) =>
  docsets.filter(
    (docset) =>
      docset.docsetName.toLowerCase().includes(searchText.toLowerCase()) ||
      docset.docsetKeyword.toLowerCase().includes(searchText.toLowerCase())
  );

export const getDocsetByKeyword = (docsets: Docset[], keyword: string) => {
  if (!keyword) return;
  return docsets.find((docset) => docset.docsetKeyword.toLowerCase() === keyword.toLowerCase());
};
