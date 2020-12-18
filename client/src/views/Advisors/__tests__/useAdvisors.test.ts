/* tslint:disable no-implicit-dependencies */

import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import useAdvisors from '../useAdvisors';

const mock = new MockAdapter(axios);

describe('Advisors useAdvisors', () => {
  beforeAll(() => {
    mock.onGet('/advisors').reply(200, {
      total: 0,
      items: [],
    });

    mock.onGet('/languages').reply(200, []);
  });

  it('should init correctly', () => {
    const { result } = renderHook(() => useAdvisors());

    expect(result.current.data).toEqual({ total: 0, items: [] });
  });
});
