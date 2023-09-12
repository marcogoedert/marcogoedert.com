"use client"; // Error components must be Client Components

import { useEffect, useState } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const [errorObj, setErrorObj] = useState<Error | null>(null);

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
    setErrorObj(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        className="p-2 border rounded border-gray-500 dark:border-gray-400"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
      <br />
      Error: {JSON.stringify(errorObj)}
    </div>
  );
}
