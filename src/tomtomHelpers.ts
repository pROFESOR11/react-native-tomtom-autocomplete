import { TomTomPOISearchResponseResult } from "./types";

type TomTomQueryOptions = {
  limit?: number;
  typeahead?: boolean;
};

export function getPlacesFromTomTom(
  query: string,
  options: TomTomQueryOptions = {}
): Promise<TomTomPOISearchResponseResult[]> {
  /*   if (query.length <= 2 || query == undefined)
    return new Promise((resolve, reject) => resolve([])); */
  const toQuery = encodeURIComponent(query.trim());

  const { limit = 10, typeahead = true } = options;

  return fetch(
    `https://api.tomtom.com/search/2/search/${toQuery}.json?typeahead=${
      typeahead.toString() || "true"
    }&limit=${limit}&key=C198lwpRLHCAk7RpTpEEvBwSOla2xE8k`
  )
    .then((res) => res.json())
    .then((resJson) => resJson.results || [])
    .catch((err) => {
      console.log("err", err);
      return [];
    });
}
