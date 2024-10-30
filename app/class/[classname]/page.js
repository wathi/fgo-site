import Link from 'next/link';
import Image from 'next/image';
import { getServantByClass } from '@/app/lib/data';
import { getClassList } from '@/app/lib/data';

export default async function ServentClass({ params }) {
  const classname = (await params).classname;
  const servantByClassData = await getServantByClass(classname);

  const classList = getClassList();
  let classobj = classList.find((obj) => obj.name === classname);

  return (
    <>
      <div className="my-10">{classobj.text}</div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {servantByClassData.map((item) => (
          <div key={item.id}>
            <Link href={`/servant/${item.id}`}>
              <div className="flex m-1 border-2">
                <Image
                  className="p-1"
                  src={item.face}
                  width={50}
                  height={50}
                  alt="icon"
                />
                <div className="px-2 content-center">{item.name}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
