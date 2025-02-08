import { useEffect } from "react";

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;

    return () => {
      document.title = "Cleanup title";
    };
  }, [title]);
}
