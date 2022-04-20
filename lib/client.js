import { KontenbaseClient } from '@kontenbase/sdk';

const apiKey = process.env.NEXT_PUBLIC_KONTENBASE_API_KEY;

export const kontenbase = new KontenbaseClient({
  apiKey,
});
