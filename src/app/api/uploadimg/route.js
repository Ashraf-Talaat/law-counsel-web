import { NextResponse } from "next/server";
import { uploadToImageKit } from "@/utils/UploadImage";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("image");

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const result = await uploadToImageKit({
    fileBuffer: buffer,
    fileName: file.name,
  });

  if (result.success) {
    return NextResponse.json({ url: result.url }, { status: 200 });
  } else {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
}
