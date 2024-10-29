import Link from 'next/link';
import { getServantByClass } from '@/app/lib/data';

export default async function ServentClass({ params }) {
  const classname = (await params).classname;
  const servantByClassData = await getServantByClass(classname);
  return (
    <>
      <div>Servent Class page</div>;
      {servantByClassData.map((item) => (
        <div key={item.id}>
          <Link href={`/servant/${item.id}`}>{item.name}</Link>
        </div>
      ))}
    </>
  );
}
