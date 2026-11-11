/**
 * Puts each item, in order, into the column that is currently shortest
 * (ties go to the leftmost), so columns stay within about one item of each
 * other. Deterministic: appending items never moves the earlier ones.
 */
export function splitIntoColumns<T>(items: readonly T[], count: number, getHeight: (item: T) => number): T[][] {
  const columns: T[][] = Array.from({ length: count }, () => []);
  const heights: number[] = new Array(count).fill(0);

  for (const item of items) {
    let shortest = 0;
    for (let i = 1; i < count; i++) {
      if (heights[i] < heights[shortest]) shortest = i;
    }

    columns[shortest].push(item);
    heights[shortest] += getHeight(item);
  }

  return columns;
}
