function maxProfit(arr) {
  if (arr.length < 2) return 0;

  let profit = 0;

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < arr[i + 1]) {
      profit += arr[i + 1] - arr[i];
    }
  }

  return profit;
}
