'use client';
import { saveFaceImgPos } from '@/app/lib/data';

export default function SetImage({
  id,
  length,
  faceKey,
  setCurrentFaceKey,
  selectExprInput,
  setSelectExprInput,
  blankExprInput,
  setBlankExprInput,
  message,
  setMessage,
  exprBlank,
  exprSelect,
  currentFaceKey,
  imagePostition,
  setImagePosition,
}) {
  return (
    <>
      <div className="flex">
        <div className="py-1 mr-1 w-20">空白</div>
        <input
          name="blankExprInput"
          className="px-2 py-1 mr-2 border w-20"
          value={blankExprInput}
          type="number"
          max="3"
          min="0"
          onChange={(e) => {
            setBlankExprInput(e.target.value);
            setMessage('');
          }}
        ></input>
        <div className="py-1 mr-1 w-20">表情番号</div>
        <input
          name="selectExprInput"
          className="px-2 py-1 mr-2 border w-20"
          value={selectExprInput}
          type="number"
          max={length - exprBlank - 1}
          min="0"
          onChange={(e) => {
            setSelectExprInput(e.target.value);
            setMessage('');
          }}
        ></input>
        <div
          className="px-2 py-1 mr-2 border border-sky-600 rounded-md cursor-pointer bg-sky-50"
          onClick={() => {
            saveFaceImgPos(
              id,
              imagePostition.top,
              imagePostition.left,
              blankExprInput,
              selectExprInput
            );
            setMessage('Saved!');
          }}
        >
          Save
        </div>
        <div
          className="px-2 py-1 mr-2 border border-red-600 rounded-md cursor-pointer bg-red-50"
          onClick={() => {
            saveFaceImgPos(id, 0, 0, 0, 0);
            setImagePosition({ top: 0, left: 0 });
            setBlankExprInput(0);
            setSelectExprInput(0);
            setMessage('Reset!');
          }}
        >
          Reset
        </div>
        <div>{message}</div>
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
    </>
  );
}
