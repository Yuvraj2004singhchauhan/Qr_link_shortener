function EmptyState({ message = "No data available." }) {
  return (
    <div className="flex items-center justify-center py-12 border rounded-lg bg-gray-50">
      <p className="text-gray-500 text-lg">{message}</p>
    </div>
  );
}

export default EmptyState;