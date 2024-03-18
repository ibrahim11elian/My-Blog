import { Suspense, lazy, useEffect } from "react";
import DeveloperImage from "../components/aboutComponents/DeveloperImage";
import Header from "../components/header/Header";
import { useDispatch } from "react-redux";
import { updateArticle } from "../features/article/article-slice";
import useDocumentTitle from "../hooks/useDocumentTitle";
const MarkdownContent = lazy(() =>
  import("../components/articleComponents/MarkdownContent")
);

function About() {
  useDocumentTitle("Script Symphony - About");
  useEffect(() => scrollTo({ top: 0 }), []);

  const dispatch = useDispatch();

  useEffect(() => {
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
        dispatch(updateArticle({ content: decodedContent }));
      } catch (error) {
        console.error("Error fetching README:", error);
        return null;
      }
    })();
  });
  Suspense;
  return (
    <main>
      <Header headerText="Ibrahim Ahmed" />
      <section className="pt-4 background">
        <div className="container">
          <DeveloperImage />

          <Suspense fallback={<ContentPlaceholder />}>
            <MarkdownContent />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
export default About;

const ContentPlaceholder = () => {
  return (
    <div className="card-text placeholder-glow mt-5 d-flex flex-column gap-2 pb-1 ">
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
