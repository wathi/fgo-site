import Link from 'next/link';
import { getClassList } from '@/app/lib/data';

export default async function Home() {
  const classList = getClassList();
  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 lg:gap-6 place-content-stretch  place-items-stretch">
        {classList.map((item) => (
          <Link
            className="place-self-stretch box-border m-1 p-10 border-2 "
            href={`/class/${item.name}`}
          >
            <div className="text-center" key={item.name}>
              {item.text}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
