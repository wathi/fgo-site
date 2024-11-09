'use client';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

export default function TestShowImage() {
  let faces = {
    1: 'https://static.atlasacademy.io/JP/CharaFigure/11009000/11009000_merged.png',
    2: 'https://static.atlasacademy.io/JP/CharaFigure/11009001/11009001_merged.png',
    3: 'https://static.atlasacademy.io/JP/CharaFigure/11009002/11009002_merged.png',
    4: 'https://static.atlasacademy.io/JP/CharaFigure/1001000/1001000_merged.png',
  };

  let name = 'testtesttest';

  const faceKey = Object.keys(faces).map((key) => key);
  const [currentFaceKey, setCurrentFaceKey] = useState(faceKey[0]);
  const [naturalImgSize, setNaturalImgSize] = useState({ width: 0, height: 0 });
  const charaFigure = { width: 1024, height: 768 };
  const charaFace = { width: 256, height: 256 };
  const [charaFaceRow, setCharaFaceRow] = useState(0);
  const charaFaceCol = 4;
  const [count, setCount] = useState(1);

  useEffect(() => {
    setCharaFaceRow(
      (naturalImgSize.height - charaFigure.height) / charaFace.height
    );

    //   const interval = setInterval(() => {
    //     setCount((prevCount) => (prevCount + 1) % (charaFaceCol * charaFaceRow));
    //   }, 500);
    //   return () => clearInterval(interval);
  }, [naturalImgSize]);

  const showCharaFace = () => {
    const faceList = [];
    for (let i = 1; i <= charaFaceRow; i++) {
      for (let j = 1; j <= charaFaceCol; j++) {
        let top = charaFigure.height + charaFace.height * (i - 1);
        let right = charaFace.width * (charaFaceCol - j);
        let bottom = charaFace.height * (charaFaceRow - i);
        let left = charaFace.width * (j - 1);
        console.log(faceList, i, j);
        console.log(top, right, bottom, left);
        faceList.push(
          <>
            <Image
              key={`${i}` + '-' + `${j}`}
              className="bg-blue-100"
              src={faces[currentFaceKey]}
              alt={`${i}` + '-' + `${j}`}
              // width={1024}
              // height={1024}
              width={naturalImgSize.width}
              height={naturalImgSize.height}
              style={{
                objectFit: 'none',
                objectPosition: 'top',
                // clipPath: 'inset(768px 0px 100px 256px)',
                // transform: 'translateX(-256px) translateY(-768px)',
                clipPath: `inset(${top}px ${right}px ${bottom}px ${left}px)`,
                transform: `translateX(-${left}px) translateY(-${top}px)`,
              }}
              unoptimized={true}
              loading="eager"
            />
          </>
        );
      }
    }

    // console.log(faceList[0]);
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
      <div className="bg-red-100 " style={{ width: 512, height: 512 }}>
        <div className="bg-blue-100 " style={{ width: 256, height: 256 }}></div>
      </div>
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
      <div className="relative" style={{ width: 1024 }}>
        <div
          className="absolute bg-red-100 overflow-hidden"
          style={{
            top: imagePostition.top,
            left: imagePostition.left,
            width: 512,
            height: 512,
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

        <div className="overflow-hidden" style={{ width: 1024, height: 768 }}>
          <Image
            src={faces[currentFaceKey]}
            alt={name}
            width={1024}
            height={768}
            // width={naturalImgSize.width}
            // height={naturalImgSize.height}
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
