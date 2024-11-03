'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function ShowImage({ faces, name }) {
  const faceKey = Object.keys(faces).map((key) => key);
  const [currentFaceKey, setCurrentFaceKey] = useState(faceKey[0]);
  const [mouseDown, setMouseDown] = useState(false);
  const [mousePosition, setMousePosition] = useState({
    offsetX: 0,
    offsetY: 0,
  });
  const [imagePostition, setImagePosition] = useState({ top: 0, left: 0 });

  const handleMouseDown = (event) => {
    setMouseDown(true);
    setMousePosition({
      offsetX: event.nativeEvent.offsetX - event.clientX,
      offsetY: event.nativeEvent.offsetY - event.clientY,
    });
    console.log(
      event.clientX,
      event.clientY,
      event.nativeEvent.offsetX,
      event.nativeEvent.offsetY
    );
  };

  const handleMouseUp = (event) => {
    setMouseDown(false);
  };

  const handleMouseMove = (event) => {
    if (mouseDown) {
      setImagePosition({
        top: event.clientY + mousePosition.offsetY - 500,
        left: event.clientX + mousePosition.offsetX,
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
          onMouseDown={(e) => {
            e.preventDefault();
            handleMouseDown(e);
          }}
          onMouseUp={(e) => handleMouseUp(e)}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <img
            className="clip-face absolute"
            // style={{ top: imagePostition.top, left: imagePostition.left }}
            src={faces[currentFaceKey]}
            alt={name}
            loading="eager"
          ></img>
        </div>

        <Image
          className="mb-10"
          src={faces[currentFaceKey]}
          width={650}
          height={480}
          style={{
            width: '650px',
            height: '480px',
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
