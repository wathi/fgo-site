'use client';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

export default function ShowImage({ faces, name }) {
  const faceKey = Object.keys(faces).map((key) => key);
  const [currentFaceKey, setCurrentFaceKey] = useState(faceKey[0]);
  const [naturalImgSize, setNaturalImgSize] = useState({
    width: 0,
    height: 0,
  });
  const charaFigure = { width: 1024, height: 768 };
  const charaFace = { width: 256, height: 256 };
  const [imgURL, setImgURL] = useState(faces);
  const [count, setCount] = useState(0);

  const getFaces = () => {
    const nCol = 4;
    const nRow =
      (naturalImgSize.height - charaFigure.height) / charaFace.height;

    const faceList = [];
    for (let i = 1; i <= nRow; i++) {
      for (let j = 1; j <= nCol; j++) {
        let top = charaFigure.height + charaFace.height * (i - 1);
        let right = charaFace.width * (nCol - j);
        let bottom = charaFace.height * (nRow - i);
        let left = charaFace.width * (j - 1);

        faceList.push(
          <Image
            key={`${i}` + '-' + `${j}`}
            className="bg-sky-100 absolute"
            src={imgURL[currentFaceKey]}
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

    useEffect(() => {
      const interval = setInterval(() => {
        setCount((prevCount) => (prevCount + 1) % faceList.length);
      }, 500);
      return () => clearInterval(interval);
    }, [faceList.length]);

    return faceList[count];
  };

  let updateDisToContainer = useRef(false);
  const [pointerDown, setPointerDown] = useState(false);
  const [disToContainer, setDisToContainer] = useState({ top: 0, left: 0 });
  const [pointerOffSet, setpointerOffSet] = useState({ top: 0, left: 0 });
  const [imagePostition, setImagePosition] = useState({ top: 0, left: 0 });

  const handlePointerDown = (event) => {
    setPointerDown(true);
    if (!updateDisToContainer.current) {
      setDisToContainer({
        top:
          event.clientY -
          event.nativeEvent.offsetY -
          event.target.offsetTop -
          imagePostition.top,
        left:
          event.clientX -
          event.nativeEvent.offsetX -
          event.target.offsetLeft -
          imagePostition.left,
      });
      updateDisToContainer.current = true;
    }

    setpointerOffSet({
      top: event.nativeEvent.offsetY + event.target.offsetTop,
      left: event.nativeEvent.offsetX + event.target.offsetLeft,
    });
  };

  const handlePointerUp = (event) => {
    setPointerDown(false);
  };

  const handlePointerMove = (event) => {
    if (pointerDown) {
      setImagePosition({
        top: event.clientY - disToContainer.top - pointerOffSet.top,

        left: event.clientX - disToContainer.left - pointerOffSet.left,
      });
      console.log(
        'imagePostition ' + imagePostition.left,
        imagePostition.top,
        'dis ' + disToContainer.left,
        disToContainer.top
      );
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

      <div className="relative mt-5">
        <div
          className="relative"
          style={{
            height: 256,
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
          {getFaces()}
        </div>
        <div
          className="relative overflow-hidden"
          style={{ height: charaFigure.height }}
        >
          <Image
            className="bg-red-100"
            src={imgURL[currentFaceKey]}
            alt={name}
            width={naturalImgSize.width}
            height={naturalImgSize.height}
            style={{
              objectFit: 'none',
              objectPosition: 'top',
              clipPath: `inset(0px 0px 512px 0px)`,
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
