import { write } from "bun";

// 1. UPDATED URL (Fixed from .edgexhq.tech to .vercel.app)
const apiUrl = "https://opbento.vercel.app/api/bento?n=RSD&g=Dharaneesh20&x=Dharaneesh13581&l=dharaneeshrs-clouddev&i=https%3A%2F%2Fi.ibb.co%2FMx8LQjj6%2Fwp8963710-watch-dogs-2-4k-pc-wallpapers.jpg&p=https%3A%2F%2Fportfoliorsd.vercel.app%2F&z=5a2a8";

interface BentoResponse {
  url: string;
}

const main = async () => {
  try {
    console.log("Fetching Bento data...");
    
    // Fetch the JSON to find the image URL
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    const data = await response.json() as BentoResponse;
    const imageUrl = data.url;
    console.log(`Image URL found: ${imageUrl}`);

    // Fetch the actual image data
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) throw new Error(`Image Download Error: ${imageResponse.status}`);

    // Save the image to the repository folder
    console.log("Saving image to 'bento.png'...");
    await Bun.write("bento.png", imageResponse);
    console.log("Success! Image saved.");

  } catch (error) {
    console.error("Failed:", error);
    process.exit(1);
  }
};

main();