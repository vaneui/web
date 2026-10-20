// Prebuild step: fetch the full git history when the clone is shallow (Vercel
// clones shallow), so docs page dates come from real commits. Prints one line,
// and only for a shallow clone; never fails the build.
import { ensureFullHistory } from '../lib/docs/gitDate';

const result = ensureFullHistory();
if (result === 'unshallowed') console.log('Fetched the full git history for page dates.');
if (result === 'shallow') console.log('Git history is shallow: page dates are left out of the sitemap and article metadata.');
