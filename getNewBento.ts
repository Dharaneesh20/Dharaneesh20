const apiUrl = "https://opbento.edgexhq.tech/api/bento?n=RSD&g=Dharaneesh20&x=Dharaneesh13581&l=dharaneeshrs-clouddev&i=https%3A%2F%2Fi.ibb.co%2FMx8LQjj6%2Fwp8963710-watch-dogs-2-4k-pc-wallpapers.jpg&p=https%3A%2F%2Fportfoliorsd.vercel.app%2F&z=5a2a8";
interface BentoResponse {
  url: string;
}

const fetchBentoUrl = async (apiUrl: string): Promise<string> => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: BentoResponse = (await response.json()) as BentoResponse;
    return data.url;
  } catch (error) {
    console.error("Error fetching Bento URL:", error);
    throw error;
  }
};

// @ts-ignore
fetchBentoUrl(apiUrl);
