function largestSubarraySum(arr) {
  if (!arr?.length) return 0;

  let maxSum = Number.NEGATIVE_INFINITY;
  let currentSum = 0;

  for (let num of arr) {
    currentSum += num;
    maxSum = Math.max(maxSum, currentSum);
    currentSum = Math.max(currentSum, 0);
  }

  return maxSum;
}
