// components/DanceCombinationGenerationResult.tsx
interface Props {
  combination: any; // Define a more specific type based on what the API returns
}

const DanceCombinationGenerationResult: React.FC<Props> = ({ combination }) => {
  if (!combination) return null; // Or some placeholder indicating no data

  return (
    <div className="mt-4 rounded-lg border p-4 shadow">
      <h2 className="text-lg font-bold">Generated Combination Result:</h2>
      <pre>{JSON.stringify(combination, null, 2)}</pre>
    </div>
  );
};

export default DanceCombinationGenerationResult;
