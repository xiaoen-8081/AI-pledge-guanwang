/* eslint-disable jsdoc/check-param-names */
function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function waitRandom(min: number, max: number): Promise<void> {
  return wait(min + Math.round(Math.random() * Math.max(0, max - min)));
}

/**
 * This error is thrown if the function is cancelled before completing
 */
export class CancelledError extends Error {
  constructor() {
    super('Cancelled');
  }
}

/**
 * Throw this error if the function should retry
 */
export class RetryableError extends Error {}

/**
 * Retries the function that returns the promise until the promise successfully resolves up to n retries
 * 给定的返回 Promise 的函数进行重试，直到满足 条件
 * @param fn 一个函数，调用时返回一个 Promise，表示需要重试的操作
 * @param n 最大重试次数
 * @param minWait 两次重试之间的最短等待时间（毫秒）
 * @param maxWait 两次重试之间的最长等待时间（毫秒）
 */
export function retry<T>(
  fn: () => Promise<T>,
  { n, minWait, maxWait }: { maxWait: number; minWait: number; n: number },
): { cancel: () => void; promise: Promise<T> } {
  // 用于标记是否已完成，防止多次解决或拒绝 Promise
  let completed = false;
  // 用于在取消操作时拒绝 Promise，抛出 CancelledError
  let rejectCancelled: (error: Error) => void;
  // eslint-disable-next-line no-async-promise-executor
  const promise = new Promise<T>(async (resolve, reject) => {
    rejectCancelled = reject;
    while (true) {
      let result: T;
      try {
        result = await fn();
        if (!completed) {
          resolve(result);
          completed = true;
        }
        break;
      } catch (error) {
        console.error(error);
        if (completed) {
          break;
        }
        if (n <= 0 || !(error instanceof RetryableError)) {
          reject(error);
          completed = true;
          break;
        }
        n--;
      }
      await waitRandom(minWait, maxWait);
    }
  });
  return {
    promise,
    cancel: () => {
      if (completed) return;
      completed = true;
      rejectCancelled(new CancelledError());
    },
  };
}
