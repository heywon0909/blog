import { getPosts } from '../../../service/posts';

export async function GET() {
  const data = await getPosts();
  return Response.json({ data });
}
