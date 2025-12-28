import { init, id } from '@instantdb/react';

const db = init({
  appId: import.meta.env.VITE_INSTANTDB_APP_ID,
});

export { db, id };
