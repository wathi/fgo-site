const baseURL = 'https://api.atlasacademy.io';
const region = 'JP';

export async function getServantByClass(className) {
  try {
    const response = await fetch(
      `${baseURL}/basic/${region}/servant/search?className=${className}`
    );

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function getServantById(id) {
  try {
    const response = await fetch(`${baseURL}/basic/${region}/servant/${id}`);

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
