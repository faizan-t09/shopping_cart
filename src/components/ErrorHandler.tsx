import React from "react";

const ErrorHandler: React.FC<{
  error: Error;
  resetErrorBoundary: () => void;
}> = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => {
  return (
    <div>
      <h1>An error occurred: {error.message}</h1>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export default ErrorHandler;
