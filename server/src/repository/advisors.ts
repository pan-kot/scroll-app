import path from 'path';
import fs from 'fs';

import { TAdvisorCard } from '../../generator/types';

import { isTest } from '../config';

export type TSortProperty = 'feedback.reviews';

export type TSortDirection = 'asc' | 'desc';

export type TAdvisorsSort = {
  property: TSortProperty;
  direction: TSortDirection;
};

export type TAdvisorsFilter = {
  isOnline?: boolean;
  language?: string;
};

export type TAdvisorsQuery = {
  sort?: TAdvisorsSort;
  filter?: TAdvisorsFilter;
};

type TPredicate<T> = (item: T) => boolean;

export async function selectAdvisors(query: TAdvisorsQuery) {
  let data = await loadData();

  data = sortData(data, query);
  data = filterData(data, query);

  return data;
}

function sortData(data: TAdvisorCard[], query: TAdvisorsQuery) {
  if (query.sort) {
    const { property, direction } = query.sort;

    switch (property) {
      case 'feedback.reviews':
        return sortByReviews(data, direction);

      default:
        throw new Error(
          `Invariant violation: unsupported sort property: ${property}.`
        );
    }
  }

  return data;
}

function sortByReviews(data: TAdvisorCard[], direction: TSortDirection) {
  switch (direction) {
    case 'asc':
      return data.sort((a, b) => a.feedback.reviews - b.feedback.reviews);

    case 'desc':
      return data.sort((a, b) => b.feedback.reviews - a.feedback.reviews);

    default:
      throw new Error(
        `Invariant violation: unsupported sort direction: ${direction}.`
      );
  }
}

function filterData(data: TAdvisorCard[], query: TAdvisorsQuery) {
  const { isOnline, language } = query.filter || {};

  const predicates = [];

  if (isOnline) {
    predicates.push(createIsOnlinePredicate());
  }

  if (language) {
    predicates.push(createLanguagePredicate(language));
  }

  const applyFilter = composePredicates(predicates);

  return applyFilter(data);
}

function createIsOnlinePredicate() {
  return (it: TAdvisorCard) => it.presence.isOnline;
}

function createLanguagePredicate(language: string) {
  return (it: TAdvisorCard) => it.features.languages.includes(language);
}

function composePredicates<T>(predicates: TPredicate<T>[]): (data: T[]) => T[] {
  if (predicates.length === 0) {
    return (data) => data;
  }

  const composed = predicates.reduce((prev, next) => (it) =>
    prev(it) && next(it)
  );

  return (data) => data.filter(composed);
}

function loadData(): Promise<TAdvisorCard[]> {
  const filename = !isTest ? 'advisors.json' : 'advisors.test.json';

  return fs.promises
    .readFile(path.resolve(__dirname, '../..', 'data', filename), 'utf8')
    .then((data) => JSON.parse(data));
}
