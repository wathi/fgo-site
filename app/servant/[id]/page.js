import Link from 'next/link';
import Image from 'next/image';
import { getServantById } from '@/app/lib/data';

export default async function Servent({ params }) {
  const id = (await params).id;
  const servantByIdData = await getServantById(id);

  console.log(id);
  return (
    <>
      <div>Servent page</div>
      <Image
        src={servantByIdData.face}
        width={50}
        height={50}
        alt="Picture of the author"
      />
      <div>{servantByIdData.id}</div>
      <div>{servantByIdData.name}</div>
      <Link href={`/class/${servantByIdData.className}`}>
        {servantByIdData.className}
      </Link>
      <Link href={`/`}>Home</Link>
    </>
  );
}
