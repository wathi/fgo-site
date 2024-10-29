import Link from 'next/link';
import { getClassList } from '@/app/lib/data';

export default async function Home() {
  const classList = getClassList();
  return (
    <>
      <h1 className="text-blue-500">FGO Site</h1>

      {classList.map((item) => (
        <div key={item}>
          <Link href={`/class/${item}`}>{item}</Link>
        </div>
      ))}
    </>
  );
}
