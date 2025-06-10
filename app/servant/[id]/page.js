import Link from 'next/link';
import Image from 'next/image';
import { getServantById, getFace } from '@/app/lib/data';
import ShowImage from './show-image';
import Novel from './novel';

export default async function Servent({ params }) {
  const id = (await params).id;

  const servantByIdData = await getServantById(id);
  console.log(servantByIdData);

  const faceData = await getFace(id);
  console.log(faceData);

  return (
    <div className="overflow-hidden">
      <div className="my-5 ">
        <Link
          className="px-10 py-1 border-2"
          href={`/class/${servantByIdData.className}`}
        >
          Back
        </Link>
      </div>
      <div className="my-1">{servantByIdData.id}</div>
      <Image
        className="m-1"
        src={servantByIdData.extraAssets.faces.ascension[1]}
        width={50}
        height={50}
        alt={servantByIdData.name}
      />
      <div className="my-1">{servantByIdData.name}</div>
      <table className="text-sm mb-2 w-full table-fixed border">
        <thead>
          <tr>
            <th className="text-center border">筋肉</th>
            <th className="text-center border">耐久</th>
            <th className="text-center border">敏捷</th>
            <th className="text-center border">魔力</th>
            <th className="text-center border">幸運</th>
            <th className="text-center border">宝具</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center border">
              {servantByIdData.limits[0].strength}
            </td>
            <td className="text-center">
              {servantByIdData.limits[0].endurance}
            </td>
            <td className="text-center border">
              {servantByIdData.limits[0].agility}
            </td>
            <td className="text-center border">
              {servantByIdData.limits[0].magic}
            </td>
            <td className="text-center border">
              {servantByIdData.limits[0].luck}
            </td>
            <td className="text-center border">
              {servantByIdData.limits[0].np}
            </td>
          </tr>
        </tbody>
      </table>
      <table className="text-sm mb-2 w-full table-fixed border">
        <tbody>
          <tr>
            <td className="w-20 text-center border">HP</td>
            <td className="px-1 border">{servantByIdData.hpMax}</td>
          </tr>
          <tr>
            <td className="text-center border ">ATK</td>
            <td className="px-1 border">{servantByIdData.atkMax}</td>
          </tr>
          <tr>
            <td className="w-20 text-center border">宝具</td>
            <td className="px-1 border">
              {servantByIdData.noblePhantasms[0].name}
            </td>
          </tr>
        </tbody>
      </table>

      <ShowImage
        id={servantByIdData.id}
        faces={servantByIdData.extraAssets.charaFigure.ascension}
        name={servantByIdData.name}
        imgtop={faceData[0].img_pos_top}
        imgleft={faceData[0].img_pos_left}
        exprBlank={faceData[0].expr_blank}
        exprSelect={faceData[0].expr_select}
      />

      <Novel />
    </div>
  );
}
