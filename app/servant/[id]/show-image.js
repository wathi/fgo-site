'use client';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

export default function ShowImage({ faces, name }) {
  const faceKey = Object.keys(faces).map((key) => key);
  const [currentFaceKey, setCurrentFaceKey] = useState(faceKey[0]);
  const [naturalImgSize, setNaturalImgSize] = useState({ width: 0, height: 0 });
  const charaFigure = { width: 1024, height: 768 };
  const charaFace = { width: 256, height: 256 };
  const [charaFaceRow, setCharaFaceRow] = useState(0);
  const charaFaceCol = 4;
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCharaFaceRow(
      (naturalImgSize.height - charaFigure.height) / charaFace.height
    );

    const interval = setInterval(() => {
      setCount((prevCount) => (prevCount + 1) % (charaFaceCol * charaFaceRow));
    }, 500);
    return () => clearInterval(interval);
  }, [charaFaceRow, count]);

  const showCharaFace = () => {
    const faceList = [];
    for (let i = 1; i <= charaFaceRow; i++) {
      for (let j = 1; j <= charaFaceCol; j++) {
        let top = charaFigure.height + charaFace.height * (i - 1);
        let right = charaFace.width * (charaFaceCol - j);
        let bottom = charaFace.height * (charaFaceRow - i);
        let left = charaFace.width * (j - 1);

        faceList.push(
          <Image
            key={`${i}` + '-' + `${j}`}
            className="absolute"
            src={faces[currentFaceKey]}
            alt={`${i}` + '-' + `${j}`}
            width={naturalImgSize.width}
            height={naturalImgSize.height}
            style={{
              objectFit: 'none',
              objectPosition: 'top',
              clipPath: `inset(${top}px ${right}px ${bottom}px ${left}px)`,
              transform: `translateX(-${left}px) translateY(-${top}px)`,
            }}
            unoptimized={true}
            loading="eager"
          />
        );
      }
    }

    return faceList[count];
  };

  let updateDisToContainer = useRef(false);
  const [pointerDown, setPointerDown] = useState(false);
  const [edgeToContainer, setEdgeToContainer] = useState({ top: 0, left: 0 });
  const [imagePostition, setImagePosition] = useState({ top: 0, left: 0 });

  const handlePointerDown = (event) => {
    setPointerDown(true);
    if (!updateDisToContainer.current) {
      setEdgeToContainer({
        top: event.clientY - imagePostition.top,
        left: event.clientX - imagePostition.left,
      });
      updateDisToContainer.current = true;
    }
  };

  const handlePointerUp = (event) => {
    setPointerDown(false);
  };

  const handlePointerMove = (event) => {
    if (pointerDown) {
      setImagePosition({
        top: event.clientY - edgeToContainer.top,

        left: event.clientX - edgeToContainer.left,
      });
    }
  };

  return (
    <div className="mt-10 ">
      <div className="mb-2">再臨セイントグラフ</div>
      <div className="flex">
        {faceKey.map((item) => (
          <div
            key={item}
            className={
              currentFaceKey === item
                ? 'px-2 py-1 mr-2 border border-sky-600 rounded-md cursor-pointer bg-sky-50'
                : 'px-2 py-1 mr-2 border border-sky-600 rounded-md cursor-pointer '
            }
            onClick={() => setCurrentFaceKey(item)}
          >
            第{item}再臨
          </div>
        ))}
      </div>
      <div>
        <div
          className="relative bg-red-100"
          style={{
            top: imagePostition.top,
            left: imagePostition.left,
          }}
          onPointerDown={(e) => {
            e.preventDefault();
            handlePointerDown(e);
          }}
          onPointerUp={(e) => {
            e.preventDefault();
            handlePointerUp(e);
          }}
          onPointerMove={(e) => {
            e.preventDefault();
            handlePointerMove(e);
          }}
        >
          {showCharaFace()}
        </div>

        <div className="overflow-hidden" style={{ height: charaFigure.height }}>
          <Image
            src={faces[currentFaceKey]}
            alt={name}
            width={naturalImgSize.width}
            height={naturalImgSize.height}
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
        </div>
      </div>
    </div>
  );
}
