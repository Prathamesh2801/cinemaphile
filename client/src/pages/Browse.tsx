import { Layout } from "../layout/Layout";
import { BrowseCards } from "../components/BrowseCards";

export const Browse = () => {
  return (
    <>
      <Layout>
        <div className="p-6">
          <button
            onClick={() => window.history.back()}
            className="mb-12 flex items-center text-neutral-400 hover:text-neutral-100 transition-colors cursor-pointer"
            title="Go Back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="flex flex-col gap-4 md:flex-row md:gap-8">
            <div className="w-full">
              <BrowseCards />
              <BrowseCards />
              <BrowseCards />
              <BrowseCards />
            </div>
            <div className="w-full">
              <BrowseCards />
              <BrowseCards />
              <BrowseCards />
              <BrowseCards />
            </div>
            <div className="w-full">
              <BrowseCards />
              <BrowseCards />
              <BrowseCards />
              <BrowseCards />
            </div>
            <div className="w-full">
              <BrowseCards />
              <BrowseCards />
              <BrowseCards />
              <BrowseCards />
            </div>
            <div className="w-full">
              <BrowseCards />
              <BrowseCards />
              <BrowseCards />
              <BrowseCards />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
