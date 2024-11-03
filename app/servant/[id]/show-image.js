'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function ShowImage({ faces, name }) {
  const faceKey = Object.keys(faces).map((key) => key);
  const [currentFaceKey, setCurrentFaceKey] = useState(faceKey[0]);
  const [pointerDown, setPointerDown] = useState(false);
  const [pointerPosition, setPointerPosition] = useState({
    leftToPointer: 0,
    topToPointer: 0,
    offsetTop: 0,
    offsetLeft: 0,
  });
  const [imagePostition, setImagePosition] = useState({ top: 0, left: 0 });

  const handlePointerDown = (event) => {
    setPointerDown(true);
    setPointerPosition({
      leftToPointer: event.nativeEvent.offsetX + event.target.offsetLeft,
      topToPointer: event.nativeEvent.offsetY + event.target.offsetTop,
      offsetLeft:
        event.nativeEvent.offsetX + event.target.offsetLeft - event.clientX,
      offsetTop:
        event.nativeEvent.offsetY + event.target.offsetTop - event.clientY,
    });
  };

  const handlePointerUp = (event) => {
    setPointerDown(false);
    setImagePosition({
      top:
        event.clientY -
        pointerPosition.topToPointer +
        pointerPosition.offsetTop,
      left:
        event.clientX -
        pointerPosition.leftToPointer +
        pointerPosition.offsetLeft,
    });
  };

  const handlePointerMove = (event) => {
    if (pointerDown) {
      setImagePosition({
        top:
          event.clientY -
          pointerPosition.topToPointer +
          pointerPosition.offsetTop,
        left:
          event.clientX -
          pointerPosition.leftToPointer +
          pointerPosition.offsetLeft,
      });
    }
  };

  return (
    <div className="mt-10">
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

      <div
        className="relative mt-5"
        style={{ width: '650px', height: '550px' }}
      >
        <div
          className="relative"
          style={{ top: imagePostition.top, left: imagePostition.left }}
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
          <img
            className="clip-face absolute"
            src={faces[currentFaceKey]}
            alt={name}
            loading="eager"
          ></img>
        </div>

        <Image
          className="mb-10"
          src={faces[currentFaceKey]}
          width={550}
          height={490}
          style={{
            width: '550px',
            height: '490px',
            objectFit: 'none',
            objectPosition: '0 0',
          }}
          alt={name}
          loading="eager"
        />
      </div>
    </div>
  );
}
