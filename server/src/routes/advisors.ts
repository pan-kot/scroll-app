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

type TPagination = {
  page: number;
  size: number;
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
  const parsedPagination = parsePagination(query);

  const badResults: any[] = [parsedSort, parsedFilter, parsedPagination].filter(
    ([ok]) => !ok
  );

  if (badResults.length > 0) {
    return [false, badResults.map(([, message]) => message)];
  }

  const sort = parsedSort[0] ? parsedSort[1] : undefined;
  const filter = parsedFilter[0] ? parsedFilter[1] : undefined;
  const pagination = parsedPagination[0] ? parsedPagination[1] : undefined;

  return [true, { sort, filter, ...pagination }];
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

function parsePagination(query: TQuery): [true, TPagination] | [false, string] {
  const pagination: TPagination = { page: 0, size: 50 };

  if (Array.isArray(query.page)) {
    return [false, 'Multiple page parameter found.'];
  }

  if (query.page && isNaN(parseInt(query.page, 10))) {
    return [false, 'Provided page parameter is not a number.'];
  }

  if (query.page) {
    pagination.page = parseInt(query.page, 10);
  }

  if (Array.isArray(query.size)) {
    return [false, 'Multiple size parameter found.'];
  }

  if (query.page && isNaN(parseInt(query.size, 10))) {
    return [false, 'Provided size parameter is not a number.'];
  }

  if (query.size) {
    pagination.size = parseInt(query.size, 10);
  }

  return [true, pagination];
}

export default router;
