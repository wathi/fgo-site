import { getServantByClass } from '@/app/lib/data';

export default async function ServentClass() {
  const servantByClassData = await getServantByClass('saber');
  return (
    <>
      <div>Servent Class page</div>;
      {servantByClassData.map((d) => (
        <li key={d.id}>{d.name}</li>
      ))}
    </>
  );
}
