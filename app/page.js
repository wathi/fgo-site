import ServentClass from '@/app/class/page';

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
      {/* <ServentClass /> */}

      {classList.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </>
  );
}
