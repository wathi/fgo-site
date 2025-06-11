'use client';
import Image from 'next/image';
export default function ShowCharaImage({
  faces,
  currentFaceKey,
  charaFigure,
  setNaturalImgSize,
  name,
}) {
  return (
    <>
      <Image
        src={faces[currentFaceKey]}
        alt={name}
        width={charaFigure.width}
        height={charaFigure.height}
        style={{
          objectFit: 'none',
          objectPosition: 'top',
        }}
        unoptimized={true}
        onLoad={(e) =>
          setNaturalImgSize({
            width: e.target.naturalWidth,
            height: e.target.naturalHeight,
          })
        }
        loading="eager"
      />
    </>
  );
}
