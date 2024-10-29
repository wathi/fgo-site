import Link from 'next/link';

export default async function Home() {
  const classList = [
    'saber',
    'archer',
    'lancer',
    'rider',
    'caster',
    'assassin',
    'berserker',
    'shielder',
  ];

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
