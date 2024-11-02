'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function ShowImage({ faces, name }) {
  console.log(faces);
  const faceKey = Object.keys(faces).map((key) => key);
  const [currentFaceKey, setCurrentFaceKey] = useState(faceKey[0]);
  return (
    <div className="mt-10">
      <div className="mb-2">再臨セイントグラフ</div>
      <div className="flex">
        <div
          className="px-1 mr-2 border border-sky-500 rounded-md cursor-pointer"
          onClick={() => setCurrentFaceKey(1)}
        >
          第１再臨
        </div>
        <div
          className="px-1 mr-2 border border-sky-500 rounded-md cursor-pointer"
          onClick={() => setCurrentFaceKey(2)}
        >
          第２再臨
        </div>
        <div
          className="px-1 mr-2 border border-sky-500 rounded-md cursor-pointer"
          onClick={() => setCurrentFaceKey(3)}
        >
          第３再臨
        </div>
      </div>

      <Image src={faces[currentFaceKey]} width={500} height={500} alt={name} />
    </div>
  );
}
