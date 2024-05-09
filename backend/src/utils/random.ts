export function getRandomElement<T>(arr: Array<T>, weights?: number[]): T {
  // If no weights are provided, return a random element (uniform distribution)
  if (!weights || weights.length !== arr.length) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Calculate the total weight
  const totalWeight = weights.reduce((acc, weight) => acc + weight, 0);
  // Generate a random position in this range
  let random = Math.random() * totalWeight;

  // Determine which element to return based on its weight
  for (let i = 0; i < arr.length; i++) {
    // Subtract the weight of the current element from the random position
    random -= weights[i];
    // If we've reached or passed zero, return the current element
    if (random <= 0) {
      return arr[i];
    }
  }

  // As a fallback (though theoretically not reachable), return the last element
  return arr[arr.length - 1];
}
