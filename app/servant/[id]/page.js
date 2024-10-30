import Link from 'next/link';
import Image from 'next/image';
import { getServantById } from '@/app/lib/data';

export default async function Servent({ params }) {
  const id = (await params).id;
  const servantByIdData = await getServantById(id);

  console.log(id);
  return (
    <>
      <div className="my-1">{servantByIdData.id}</div>
      <Image
        className="m-1"
        src={servantByIdData.face}
        width={50}
        height={50}
        alt="Picture of the author"
      />
      <div className="my-1">{servantByIdData.name}</div>
      <div className="mt-10">
        <Link
          className="px-10 py-1 border-2"
          href={`/class/${servantByIdData.className}`}
        >
          Back
        </Link>
      </div>
    </>
  );
}
