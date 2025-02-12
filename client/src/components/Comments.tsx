import Giscus from '@giscus/react';

interface CommentsProps {
  movieId: string;
  movieTitle: string;
}

export const Comments = ({ movieId, movieTitle }: CommentsProps) => {
  return (
    <div className="mt-8 md:mt-12 rounded-none md:rounded-lg relative p-[1px] md:border-none border-t border-zinc-800">
      <h2 className="text-2xl font-bold mb-6 font-doto mt-3">Comments</h2>

      <div className="relative rounded-lg p-[1px] overflow-hidden">
        <span className="absolute inset-[-1000%]  md:bg-neutral-800 bg-transparent" />
        <div className="relative rounded-lg bg-zinc-950 md:p-6 p-0">
          <style>{`
            .gsc-header { border: none !important; }
            .gsc-comments { border: none !important; }
            .gsc-comments > .gsc-header { display: none !important; }
            .gsc-comment-box { border: none !important; background-color: transparent !important; }
            .gsc-comment-box-textarea { 
              border: 1px solid #333 !important;
              background-color: transparent !important;
              border-radius: 8px !important;
            }
            .gsc-comment-box-textarea:focus {
              border-color: #666 !important;
              box-shadow: none !important;
            }
            .gsc-comment { border: none !important; }
            .gsc-comment-header { border: none !important; background: transparent !important; }
            .gsc-comment-content { border: none !important; }
            .gsc-reactions { display: none !important; }
            .gsc-timeline { border: none !important; }
            .gsc-loading { border: none !important; }
          `}</style>

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
            theme="transparent_dark"
            lang="en"
          />
        </div>
      </div>
    </div>
  );
}; 