const baseURL = 'https://api.atlasacademy.io';
const region = 'JP';

export async function getServantByClass(className) {
  try {
    const response = await fetch(
      `${baseURL}/basic/${region}/servant/search?className=${className}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function getServantById(id) {
  try {
    const response = await fetch(`${baseURL}/nice/${region}/servant/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function getServantDetailsById(id) {
  try {
    const response = await fetch(`${baseURL}/nice/${region}/servant/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

export function getClassList() {
  const classList = [
    { name: 'saber', text: 'セーバー' },
    { name: 'archer', text: 'アーチャー' },
    { name: 'lancer', text: 'ランサー' },
    { name: 'rider', text: 'ライダー' },
    { name: 'caster', text: 'キャスター' },
    { name: 'assassin', text: 'アサシン' },
    { name: 'berserker', text: 'バーサーカー' },
    { name: 'shielder', text: 'シールダー' },
    { name: 'ruler', text: 'ルーラー' },
    { name: 'alterEgo', text: 'アルターエゴ' },
    { name: 'avenger', text: 'アヴェンジャー' },
    { name: 'moonCancer', text: 'ムーンキャンサー' },
    { name: 'foreigner', text: 'フォーリナー' },
    { name: 'pretender', text: 'プリテンダー' },
    { name: 'beast', text: 'ビースト' },
  ];

  return classList;
}

import supabase from '../utils/supabase';

export async function getFace(id) {
  try {
    const { data } = await supabase
      .from('faces')
      .select()
      .eq('servent_id', `${id}`);

    if (data.length <= 0) {
      return [
        { img_pos_top: 0, img_pos_left: 0, expr_blank: 0, expr_select: 0 },
      ];
    } else return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function saveFace(id, imgtop, imgleft, exprBlank, exprSelect) {
  try {
    const { data } = await supabase
      .from('faces')
      .select()
      .eq('servent_id', `${id}`);

    if (data.length >= 1) {
      const { error } = await supabase
        .from('faces')
        .update({
          img_pos_top: imgtop,
          img_pos_left: imgleft,
          expr_blank: exprBlank,
          expr_select: exprSelect,
        })
        .eq('servent_id', id);
    } else {
      const { error } = await supabase.from('faces').insert({
        servent_id: id,
        img_pos_top: imgtop,
        img_pos_left: imgleft,
        expr_blank: exprBlank,
        expr_select: exprSelect,
      });
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
