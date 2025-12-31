import { init, id } from '@instantdb/react';

const db = init({
  appId: import.meta.env.VITE_INSTANTDB_APP_ID || 'cf655577-6953-488f-a968-3574974f1b51',
});

export { db, id };
