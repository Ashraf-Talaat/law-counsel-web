import axios from "axios";
import FormData from "form-data";

export async function uploadToImageKit({ fileBuffer, fileName }) {
  try {
    const form = new FormData();
    form.append("file", fileBuffer);
    form.append("fileName", fileName);
    form.append("publicKey", process.env.IMAGEKIT_PUBLIC_KEY);

    const response = await axios.post(
      "https://upload.imagekit.io/api/v1/files/upload",
      form,
      {
        headers: {
          ...form.getHeaders(),
          
        },
        auth: {
          username: process.env.IMAGEKIT_PRIVATE_KEY,
        },
      }
    );

    return { success: true, url: response.data.url };
  } catch (error) {
    console.error("ImageKit upload failed:", error.response?.data || error.message);
    return { success: false, error: error.message };
  }
}