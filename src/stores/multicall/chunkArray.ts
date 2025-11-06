/**
 * 将一个数组分割成多个块（子数组），每个块的大小不超过给定的最大块大小（maxChunkSize），
 * 并尝试在所有块之间尽可能均匀地分布元素
 */
export default function chunkArray<T>(items: T[], maxChunkSize: number): T[][] {
  if (maxChunkSize < 1) throw new Error('maxChunkSize must be gte 1');
  // 长度大于 maxChunkSize 防止一次请求太多被拦截掉导致错误
  if (items.length <= maxChunkSize) return [items];

  const numChunks: number = Math.ceil(items.length / maxChunkSize);
  const chunkSize = Math.ceil(items.length / numChunks);

  return [...Array.from({ length: numChunks }).keys()].map((ix) =>
    items.slice(ix * chunkSize, ix * chunkSize + chunkSize),
  );
}
