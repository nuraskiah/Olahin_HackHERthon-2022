// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { KontenbaseClient } from '@kontenbase/sdk';

const apiKey = process.env.NEXT_PUBLIC_KONTENBASE_API_KEY;

const kontenbase = new KontenbaseClient({
  apiKey,
});

export default async function handler(req, res) {
  await kontenbase.auth.login({
    email: 'admin@mail.com',
    password: 'admin123',
  });

  const { data } = await kontenbase
    .service('Users')
    .find({
      sort: { point: -1 },
      select: ['firstName', 'lastName', 'avatar', 'point'],
    });

  res.status(200).json(data);
}
