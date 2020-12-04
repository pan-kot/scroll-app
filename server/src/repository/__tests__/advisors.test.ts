import { selectAdvisors } from '../advisors';

describe('advisors repository', () => {
  it('should return all advisors', async () => {
    const result = await selectAdvisors({ size: 100 });

    expect(result).toHaveLength(100);
  });

  it('should return advisors in pages', async () => {
    const result = await selectAdvisors({ size: 100 });

    const part1 = await selectAdvisors({ size: 50 });
    const part2 = await selectAdvisors({ page: 1, size: 50 });

    expect([...part1, ...part2]).toHaveLength(100);
    expect([...part1, ...part2]).toEqual(result);
  });

  it('should return all advisors sorted by reviews asc', async () => {
    const result = await selectAdvisors({
      size: 100,
      sort: { property: 'feedback.reviews', direction: 'asc' },
    });

    expect(result).toHaveLength(100);

    const reviews = result.map((it) => it.feedback.reviews);

    expect(isSorted(reviews, (prev, curr) => prev <= curr)).toBe(true);
  });

  it('should return all advisors sorted by reviews desc', async () => {
    const result = await selectAdvisors({
      size: 100,
      sort: { property: 'feedback.reviews', direction: 'desc' },
    });

    expect(result).toHaveLength(100);

    const reviews = result.map((it) => it.feedback.reviews);

    expect(isSorted(reviews, (prev, curr) => prev >= curr)).toBe(true);
  });

  it('should return only advisors that are online', async () => {
    const result = await selectAdvisors({
      size: 100,
      filter: { isOnline: true },
    });

    expect(result).toHaveLength(8);
  });

  it('should return only advisors that speak Enlish', async () => {
    const result = await selectAdvisors({
      size: 100,
      filter: { language: 'EN' },
    });

    expect(result).toHaveLength(72);
  });

  it('should return only advisors that speak Enlish and are online sorted by reviews desc', async () => {
    const result = await selectAdvisors({
      size: 10,
      sort: { property: 'feedback.reviews', direction: 'desc' },
      filter: { isOnline: true, language: 'EN' },
    });

    expect(result).toHaveLength(6);

    const reviews = result.map((it) => it.feedback.reviews);

    expect(isSorted(reviews, (prev, curr) => prev >= curr)).toBe(true);
  });
});

function isSorted<T>(array: T[], compare: (prev: T, curr: T) => boolean) {
  if (array.length === 0) {
    return true;
  }

  const [, sorted] = array.reduce(
    ([prev, status], curr) => [curr, status && compare(prev, curr)],
    [array[0], true]
  );

  return sorted;
}
