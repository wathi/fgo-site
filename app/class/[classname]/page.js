import Link from 'next/link';
import Image from 'next/image';
import { getServantByClass } from '@/app/lib/data';

export default async function ServentClass({ params }) {
  const classname = (await params).classname;
  const servantByClassData = await getServantByClass(classname);
  return (
    <>
      <div>Servent Class page</div>
      {servantByClassData.map((item) => (
        <div key={item.id}>
          <Link href={`/servant/${item.id}`}>
            <Image
              src={item.face}
              width={50}
              height={50}
              alt="Picture of the author"
            />
            {item.name}
          </Link>
        </div>
      ))}
      <Link href={`/`}>Home</Link>
    </>
  );
}
