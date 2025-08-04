export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/uploadimg", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
    //   console.log("رابط الصورة:", data.url);
    //   alert("تم رفع الصورة بنجاح ");
      return data.url;
    } else {
      console.error(" رفع الصورة فشل:", data.error);
    //   alert("فشل في رفع الصورة : " + data.error);
      return null;
    }
  } catch (error) {
    console.error(" خطأ غير متوقع أثناء رفع الصورة:", error);
    // alert("حدث خطأ أثناء رفع الصورة ");
    return null;
  }
};