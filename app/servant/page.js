import { getServantById } from '@/app/lib/data';

export default async function Servent() {
  const servantByIdData = await getServantById(1);
  return <div>Servent page</div>;
}
