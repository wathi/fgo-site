import { getServantById, getFaceImgPos } from '@/app/lib/data';
import MainStory from './main-story';
import ShowImageNovel from './show-image-novel';
import GetServantNovel from './get-servant-novel';

export default async function Novel() {
  let currentChara;
  return (
    <div>
      <GetServantNovel />
      <MainStory />
    </div>
  );
}
