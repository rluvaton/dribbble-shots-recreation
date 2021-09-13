export function toOnlyBeCalledWith(spiedFn: jest.SpyInstance, args: any[]) {
  if(!jest.isMockFunction(spiedFn)) {
    throw new Error('Passed fn must be spied');
  }

  const allCalls = new Array(spiedFn.mock.calls.length)
    // Filling with 0 as if we fill with object, every item in the array will have the same reference
    .fill(0)
    .map(() => [...args]);

  expect(spiedFn.mock.calls).toEqual(allCalls);
}
