'use client';
import FaceExpression from '../servant/[id]/face-expression';
import ShowCharaImage from '../servant/[id]/show-chara-image';
import { charaFaceExpression } from '../lib/data';
import { useState, useEffect } from 'react';

export default function ShowImageNovel({
  id,
  faces,
  name,
  imgtop,
  imgleft,
  currentChara,
}) {
  const imagePostition = {
    top: imgtop,
    left: imgleft,
  };
  const [faceExpr, setFaceExpr] = useState([]);
  const selectExprInput = 0;
  const currentFaceKey = 1;
  const [naturalImgSize, setNaturalImgSize] = useState({ width: 0, height: 0 });
  const charaFigure = { width: 1024, height: 768 };
  const charaFace = { width: 256, height: 256 };
  const [charaFaceRow, setCharaFaceRow] = useState(1);
  const charaFaceCol = 4;

  useEffect(() => {
    setCharaFaceRow(
      (naturalImgSize.height - charaFigure.height) / charaFace.height
    );
  }, [naturalImgSize]);

  useEffect(() => {
    if (charaFaceRow) {
      setFaceExpr(
        charaFaceExpression(
          id,
          faces,
          currentFaceKey,
          naturalImgSize,
          charaFaceRow,
          charaFaceCol,
          charaFace.height,
          charaFace.width,
          charaFigure.height
        )
      );
    }
  }, [charaFaceRow, id]);

  return (
    <div style={{ width: charaFigure.width }}>
      <div
        className="relative"
        style={{
          top: imagePostition.top,
          left: imagePostition.left,
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
  );
}
