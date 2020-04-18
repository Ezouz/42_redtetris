import { useGameStatus } from '../useGameStatus'
import { renderHook, act } from '@testing-library/react-hooks';

describe('The useGameStatus hook', () => {
  const { result } = renderHook(() => useGameStatus());
  it('should initialize correctly states', () => {
    expect(result.current[0]).toBe(0);
    expect(result.current[2]).toBe(0);
    expect(result.current[4]).toBe(0);
  });

  it('should updaye score, rows and level', () => {
    act(() => {
      result.current[1](5)
      result.current[3](6)
      result.current[5](7)
    })
    expect(result.current[0]).toBe(5);
    expect(result.current[2]).toBe(6);
    expect(result.current[4]).toBe(7);
  });
});