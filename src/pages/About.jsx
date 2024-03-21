import { Suspense, lazy, useEffect } from "react";
import DeveloperImage from "../components/aboutComponents/DeveloperImage";
import Header from "../components/header/Header";
import { useDispatch } from "react-redux";
import { updateArticle } from "../features/article/article-slice";
import useDocumentTitle from "../hooks/useDocumentTitle";

// Lazy load MarkdownContent component
const MarkdownContent = lazy(() =>
  import("../components/articleComponents/MarkdownContent")
);

function About() {
  // Set document title
  useDocumentTitle("Script Symphony - About");

  // Scroll to top on component mount
  useEffect(() => {
    scrollTo({ top: 0 });
  }, []);

  const dispatch = useDispatch();

  // Fetch README content from GitHub on component mount
  useEffect(() => {
    // Fetch README content from GitHub API
    (async function fetchUserData() {
      try {
        const response = await fetch(
          `https://api.github.com/repos/ibrahim11elian/ibrahim11elian/readme`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch README");
        }
        const readme = await response.json();
        // The README content will be base64-encoded
        // Decode the base64 content as UTF-8
        const decodedContent = decodeURIComponent(escape(atob(readme.content)));
        // Update article content in Redux store
        dispatch(updateArticle({ content: decodedContent }));
      } catch (error) {
        console.error("Error fetching README:", error);
      }
    })();
  }, [dispatch]);

  return (
    <main>
      <Header headerText="Ibrahim Ahmed" />
      <section className="pt-4 background">
        <div className="container">
          {/* Developer image component */}
          <DeveloperImage />

          {/* Suspense for lazy-loaded MarkdownContent */}
          <Suspense fallback={<ContentPlaceholder />}>
            <MarkdownContent />
          </Suspense>
        </div>
      </section>
    </main>
  );
}

export default About;

// Placeholder component for Suspense fallback
const ContentPlaceholder = () => {
  return (
    <div className="card-text placeholder-glow mt-5 d-flex flex-column gap-2 pb-1 ">
      {/* Placeholder elements */}
      <span className="placeholder rounded-1 col-6"></span>
      <span className="placeholder rounded-1 col-7"></span>
      <h2>
        <span className="placeholder rounded-1 col-4"></span>
      </h2>
      <span className="placeholder rounded-1 col-6"></span>
      <span className="placeholder rounded-1 col-4"></span>
      <span className="placeholder rounded-1 col-7"></span>
      <span className="placeholder rounded-1 col-5"></span>
      <span className="placeholder rounded-1 col-8"></span>
      <span className="placeholder rounded-1 col-6"></span>
      <span className="placeholder rounded-1 col-7"></span>
      <span className="placeholder rounded-1 col-4"></span>
      <span className="placeholder rounded-1 col-8"></span>
      <h3>
        <span className="placeholder rounded-1 col-5"></span>
      </h3>
      <span className="placeholder rounded-1 col-8"></span>
      <span className="placeholder rounded-1 col-6"></span>
    </div>
  );
};
