import { useEffect, useState } from "react";

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 90 ? 90 : prev + 10));
    }, 800);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-1 bg-zinc-800">
        <div
          className="h-full bg-zinc-100 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-4 h-4 bg-zinc-100 rounded-full animate-[bounce_1s_ease-in-out_infinite]"
            style={{
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
    </>
  );
};
