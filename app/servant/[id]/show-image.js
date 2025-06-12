'use client';
import { useEffect, useState, useRef } from 'react';
import SetImage from './set-image';
import FaceExpression from './face-expression';
import ShowCharaImage from './show-chara-image';
import { charaFaceExpression } from '@/app/lib/data';

export default function ShowImage({
  id,
  faces,
  name,
  imgtop,
  imgleft,
  exprBlank,
  exprSelect,
}) {
  const faceKey = Object.keys(faces).map((key) => key);
  const [currentFaceKey, setCurrentFaceKey] = useState(faceKey[0]);
  const [naturalImgSize, setNaturalImgSize] = useState({ width: 0, height: 0 });
  const charaFigure = { width: 1024, height: 768 };
  const charaFace = { width: 256, height: 256 };
  const [charaFaceRow, setCharaFaceRow] = useState(1);
  const [blankExprInput, setBlankExprInput] = useState(exprBlank);
  const [selectExprInput, setSelectExprInput] = useState(exprSelect);
  const [message, setMessage] = useState('');
  const [faceExpr, setFaceExpr] = useState([]);

  useEffect(() => {
    setCharaFaceRow(
      (naturalImgSize.height - charaFigure.height) / charaFace.height
    );
  });

  useEffect(() => {
    if (charaFaceRow) {
      setFaceExpr(
        charaFaceExpression(
          id,
          faces,
          currentFaceKey,
          naturalImgSize,
          charaFaceRow,

          charaFace.height,
          charaFace.width,
          charaFigure.height
        )
      );
    }
  }, [charaFaceRow, currentFaceKey]);

  let updateDisToContainer = useRef(false);
  const [pointerDown, setPointerDown] = useState(false);
  const [edgeToContainer, setEdgeToContainer] = useState({ top: 0, left: 0 });
  const [imagePostition, setImagePosition] = useState({
    top: imgtop,
    left: imgleft,
  });

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

  const handlePointerUp = () => {
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
      <SetImage
        id={id}
        length={faceExpr.length}
        faceKey={faceKey}
        setCurrentFaceKey={setCurrentFaceKey}
        selectExprInput={selectExprInput}
        setSelectExprInput={setSelectExprInput}
        blankExprInput={blankExprInput}
        setBlankExprInput={setBlankExprInput}
        message={message}
        setMessage={setMessage}
        exprBlank={exprBlank}
        exprSelect={exprSelect}
        currentFaceKey={currentFaceKey}
        imagePostition={imagePostition}
        setImagePosition={setImagePosition}
      />
      <div style={{ width: charaFigure.width }}>
        <div
          className="relative"
          style={{
            top: imagePostition.top,
            left: imagePostition.left,
          }}
          onPointerDown={(e) => {
            e.preventDefault();
            handlePointerDown(e);
            setMessage('');
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
          <FaceExpression
            showCharaFace={faceExpr}
            selectExprInput={selectExprInput}
          />
        </div>

        <div
          className="overflow-hidden"
          style={{ width: charaFigure.width, height: charaFigure.height }}
        >
          <ShowCharaImage
            faces={faces}
            currentFaceKey={currentFaceKey}
            charaFigure={charaFigure}
            setNaturalImgSize={setNaturalImgSize}
            name={name}
          />
        </div>
      </div>
    </div>
  );
}
