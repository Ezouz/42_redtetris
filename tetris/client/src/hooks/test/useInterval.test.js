import { useInterval } from '../useInterval';
import { renderHook } from '@testing-library/react-hooks';

describe('The useGameStatus hook', () => {
  it('should not throw an error', () => {
    const { result } = renderHook(() => useInterval());
  });
});