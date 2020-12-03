import express from 'express';

import {
  TAdvisorsSort,
  TAdvisorsFilter,
  TAdvisorsQuery,
  selectAdvisors,
} from '../repository/advisors';

type TQuery = {
  [property: string]: string | string[];
};

const SUPPORTED_SORT_PROPERTIES = ['feedback.reviews'];
const SUPPORTED_SORT_DIRECTIONS = ['asc', 'desc'];

const router = express.Router();

router.get('/', async (req, res) => {
  const queryParams: any = req.query;

  const parsedQuery = parseQueryParams(queryParams);

  if (!parsedQuery[0]) {
    const [, errors] = parsedQuery;

    return res.status(400).send(errors);
  }

  const [, advisorsQuery] = parsedQuery;
  const items = await selectAdvisors(advisorsQuery);

  res.status(200).send({ items, total: items.length });
});

function parseQueryParams(
  query: TQuery
): [true, TAdvisorsQuery] | [false, string[]] {
  const parsedSort = parseSort(query);
  const parsedFilter = parseFilter(query);

  const badResults: any[] = [parsedSort, parsedFilter].filter(([ok]) => !ok);

  if (badResults.length > 0) {
    return [false, badResults.map(([, message]) => message)];
  }

  const sort = parsedSort[0] ? parsedSort[1] : undefined;
  const filter = parsedFilter[0] ? parsedFilter[1] : undefined;

  return [true, { sort, filter }];
}

function parseSort(
  query: TQuery
): [true, TAdvisorsSort | null] | [false, string] {
  if (!query.sort) {
    return [true, null];
  }

  if (Array.isArray(query.sort)) {
    return [false, 'Multiple sort is not supported.'];
  }

  const parts = query.sort.split(',');

  if (parts.length > 2) {
    return [
      false,
      'Malformed sort property. Expected "sort=property" or "sort=property,direction".',
    ];
  }

  const [property, direction = 'asc'] = parts;

  if (!SUPPORTED_SORT_PROPERTIES.includes(property)) {
    return [
      false,
      `Property ${property} is not supported for sorting. Supported: ${SUPPORTED_SORT_PROPERTIES}.`,
    ];
  }

  if (!SUPPORTED_SORT_DIRECTIONS.includes(direction)) {
    return [
      false,
      `Direction ${direction} is not supported. Supported: ${SUPPORTED_SORT_DIRECTIONS}.`,
    ];
  }

  const sort: any = { property, direction };

  return [true, sort];
}

function parseFilter(query: TQuery): [true, TAdvisorsFilter] | [false, string] {
  const filter: TAdvisorsFilter = {};

  if (query.isOnline !== undefined) {
    filter.isOnline = true;
  }

  if (Array.isArray(query.language)) {
    return [false, 'Multiple language filters are not supported.'];
  }

  if (query.language) {
    filter.language = query.language;
  }

  return [true, filter];
}

export default router;
