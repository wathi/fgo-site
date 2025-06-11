import { getServantById, getFaceImgPos } from '../lib/data';
import ShowImageNovel from './show-image-novel';

export default async function GetServantNovel({ params }) {
  const id = 100200;
  // (await params).id;
  const servantByIdData = await getServantById(id);
  const faceData = await getFaceImgPos(id);

  return (
    <>
      <ShowImageNovel
        id={servantByIdData.id}
        faces={servantByIdData.extraAssets.charaFigure.ascension}
        name={servantByIdData.name}
        imgtop={faceData[0].img_pos_top}
        imgleft={faceData[0].img_pos_left}
      />
    </>
  );
}
