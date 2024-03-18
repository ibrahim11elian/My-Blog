import { useEffect } from "react";

function useDocumentTitle(title) {
  useEffect(() => {
    // Save the current title so it can be reverted later
    const previousTitle = document.title;

    // Update the document title with the new value
    document.title = title;

    // Return a cleanup function to revert the title
    // whenever the component is unmounted or when the title changes,
    // the cleanup function will be called, reverting the document title back to its previous value.
    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}

export default useDocumentTitle;
