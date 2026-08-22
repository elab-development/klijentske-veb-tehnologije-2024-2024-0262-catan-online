export interface RandomPlayerInfo {
  name: string;
  avatar: string;
}

export const fetchRandomPlayers = async (count: number): Promise<RandomPlayerInfo[]> => {
  const response = await fetch(`https://randomuser.me/api/?results=${count}&nat=us,gb,de,fr`);

  if (!response.ok) {
    throw new Error('RandomUser.me API nije dostupan.');
  }

  const data = await response.json();

  return data.results.map((result: any) => ({
    name: `${result.name.first} ${result.name.last}`,
    avatar: result.picture.thumbnail,
  }));
};