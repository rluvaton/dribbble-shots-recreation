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

export function restoreJestTimers() {
  // It's important to also call `runOnlyPendingTimers` before switching to real timers.
  // This will ensure you flush all the pending timers before you switch to real timers.
  // If you don't progress the timers and just switch to real timers, the scheduled tasks won't get executed and you'll get an unexpected behavior.
  // This is mostly important for 3rd parties that schedule tasks without you being aware of it.
  //
  // From https://testing-library.com/docs/using-fake-timers
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
}
