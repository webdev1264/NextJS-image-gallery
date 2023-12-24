"use client";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  return (
    <div>
      <h1>Error: {error.message}</h1>
      <button onClick={reset}>Try again</button>
    </div>
  );
};

export default Error;
