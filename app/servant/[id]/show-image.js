'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useRef } from 'react';

export default function ShowImage({ faces, name }) {
  const faceKey = Object.keys(faces).map((key) => key);
  const [currentFaceKey, setCurrentFaceKey] = useState(faceKey[0]);

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

      <div
        className="relative mt-5"
        style={{ width: '650px', height: '500px' }}
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
          className="ml-20 mb-10"
          src={faces[currentFaceKey]}
          width={550}
          height={490}
          style={{
            width: '550px',
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
