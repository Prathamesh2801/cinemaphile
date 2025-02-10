import Giscus from '@giscus/react';

interface CommentsProps {
  movieId: string;
  movieTitle: string;
}

export const Comments = ({ movieId, movieTitle }: CommentsProps) => {
  return (
    <div className="mt-12 p-6 bg-zinc-900 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 font-doto">Comments</h2>
      <Giscus
        id={movieId}
        repo="arx9781/cinemaphile"
        repoId="R_kgDONwNsvg"
        category="Comments"
        categoryId="DIC_kwDONwNsvs4Cm09Q"
        mapping="specific"
        term={`movie-${movieId}-${movieTitle}`}
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="dark"
        lang="en"
      />
    </div>
  );
}; 