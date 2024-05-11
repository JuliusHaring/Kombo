// services/dancingService.ts

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * Generates a dance combination.
 * @param danceId The ID of the dance.
 * @param length The length of the combination.
 * @param difficulty The difficulty level of the combination.
 */
async function generateCombination(
  danceId: number,
  length: number,
  difficulty: number,
): Promise<any> {
  const response = await fetch(
    `${BACKEND_URL}/dancing/${danceId}/generateCombination/${length}/${difficulty}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch the dance combination.');
  }

  return response.json();
}

export default {
  generateCombination,
};
