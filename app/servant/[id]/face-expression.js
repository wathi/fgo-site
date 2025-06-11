export default function FaceExpression({ showCharaFace, selectExprInput }) {
  // console.log(showCharaFace);
  return <div>{showCharaFace[selectExprInput]}</div>;
}
