function sortObjects<T, K extends keyof T>(
  records: Array<T>,
  fields: Array<K>,
): void {
  (records ?? []).sort((current, next) => {
    let pos = 0;
    for (let i = 0; i < fields.length; i += 1) {
      const [currentValue, nextValue] = typeof current[fields[i]] === 'string'
        ? [

          (current[fields[i]] as unknown as string).toLowerCase(),
          (next[fields[i]] as unknown as string ?? '').toLowerCase(),

        ]
        : [current[fields[i]], next[fields[i]]];

      if (currentValue > nextValue) pos = 1;
      else if (currentValue < nextValue) pos = -1;
      if (pos !== 0) break;
    }

    return pos;
  });
}

export default sortObjects;
