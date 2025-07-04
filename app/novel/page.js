'use client';
import { useState, useEffect } from 'react';
import { getServantById, getFaceImgPos } from '../lib/data';
import ShowImageNovel from './show-image-novel';
import MainStory from './main-story';

export default function Novel() {
  const [servantByIdData, setServantByIdData] = useState(null);
  const [faceData, setFaceData] = useState(null);
  const [currentTags, setCurrentTags] = useState([]);
  const [currentChara, setCurrentChara] = useState({});

  const updateCurrentTags = (data) => {
    setCurrentTags(data);
  };

  useEffect(() => {
    if (Object.keys(currentChara).length > 0) {
      async function fetchData(id) {
        const getServant = await getServantById(id);
        const getFace = await getFaceImgPos(id);
        setServantByIdData(getServant);
        setFaceData(getFace);
      }
      fetchData(currentChara.servant);
    }
  }, [currentChara]);

  useEffect(() => {
    let obj = {};
    currentTags.forEach((tag) => {
      const [key, value] = tag.toString().split(':');
      obj[key] = parseInt(value);
    });
    setCurrentChara(obj);
  }, [currentTags]);

  if (!servantByIdData || !faceData) {
    return <MainStory setCurrentTags={updateCurrentTags} />;
  }
  return (
    <div className="my-10 p-10 border">
      <div className="flex">
        <ShowImageNovel
          key="charaA"
          customClassName="bg-blue-50"
          id={servantByIdData.id}
          faces={servantByIdData.extraAssets.charaFigure.ascension}
          name={servantByIdData.name}
          imgtop={faceData[0].img_pos_top}
          imgleft={faceData[0].img_pos_left}
          currentChara={currentChara}
        />
      </div>

      <MainStory setCurrentTags={updateCurrentTags} />
    </div>
  );
}
