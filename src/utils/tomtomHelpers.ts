import { TomTomPOISearchResponseResult, TomTomOptions } from "./types";

export function buildTomTomRequestUrl(query: string, options: TomTomOptions) {
  let baseUrl = `https://api.tomtom.com/search/2/search/${query}.json?`;
  for (const key of Object.keys(options)) {
    baseUrl += `&${key.toString()}=${options[key].toString()}`;
  }
  return baseUrl;
}

export function getPlacesFromTomTom(
  query: string,
  options: TomTomOptions
): Promise<TomTomPOISearchResponseResult[]> {
  if (query.length <= 0 || query == undefined)
    return new Promise((resolve) => resolve([]));
  const toQuery = encodeURIComponent(query.trim());

  const uri = buildTomTomRequestUrl(toQuery, options);

  return fetch(uri)
    .then((res) => res.json())
    .then((resJson) => resJson.results || [])
    .catch((err) => {
      console.log("err", err);
      return [];
    });
}
