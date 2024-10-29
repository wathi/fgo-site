import { getServantById } from '@/app/lib/data';

export default async function Servent({ params }) {
  const id = (await params).id;
  const servantByIdData = await getServantById(id);

  console.log(id);
  return (
    <>
      <div>Servent page</div>
      <div>{servantByIdData.id}</div>
      <div>{servantByIdData.name}</div>
    </>
  );
}
