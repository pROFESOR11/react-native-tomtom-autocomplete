import { TomTomPOISearchResponseResult, TomTomOptions } from "./types";

export function buildTomTomRequestUrl(query: string, options: TomTomOptions) {
  try {
    let baseUrl = `https://api.tomtom.com/search/2/search/${query}.json?`;
    for (const key of Object.keys(options)) {
      baseUrl += `&${key.toString()}=${options[key].toString()}`;
    }
    return baseUrl;
  } catch (error) {
    throw new Error("Error occured while building request url");
  }
}

export function getPlacesFromTomTom(
  query: string,
  options: TomTomOptions
): Promise<TomTomPOISearchResponseResult[]> {
  try {
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
  } catch (error) {
    throw new Error("Error occured while fetching results");
  }
}
