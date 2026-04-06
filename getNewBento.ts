import { write } from "bun";

const apiUrl = "https://opbento.vercel.app/api/bento/image?g=Dharaneesh20&z=71b8f";

interface BentoResponse {
  url: string;
}

const main = async () => {
  try {
    console.log("Fetching Bento data...");

    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";

    if (contentType.includes("application/json")) {
      const data = await response.json() as BentoResponse;
      const imageUrl = data.url;
      console.log(`Image URL found: ${imageUrl}`);

      const imageResponse = await fetch(imageUrl);
      if (!imageResponse.ok) throw new Error(`Image Download Error: ${imageResponse.status}`);

      console.log("Saving image to 'bento.png'...");
      await Bun.write("bento.png", imageResponse);
    } else {
      console.log("Direct image response detected. Saving to 'bento.png'...");
      await Bun.write("bento.png", response);
    }

    console.log("Success! Image saved.");

  } catch (error) {
    console.error("Failed:", error);
    process.exit(1);
  }
};

main();
