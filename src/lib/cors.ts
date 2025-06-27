import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

// CORS options
const cors = Cors({
  methods: ['GET', 'HEAD'],
  origin: '*',
  credentials: true,
});

export function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handleCors(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);
}