import { useEffect } from 'react';

const SITE_NAME = '2Dan Beats';

export const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
  }, [title]);
};
