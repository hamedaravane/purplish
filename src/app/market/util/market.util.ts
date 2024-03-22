export function filterMapBasedOnOmpfinexMarkets(sourceMap: Map<string, any>, desMap: Map<string, any>) {
  const filtered = new Map<string, any>();
  desMap.forEach((value, key) => {
    if (sourceMap.has(key)) {
      filtered.set(key, value);
    }
  })
  return filtered;
}
