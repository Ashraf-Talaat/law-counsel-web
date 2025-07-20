"use client";
import Image from "next/image";
import { useState } from "react";

import { auth, db } from "@/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import * as Yup from "yup";
export default function LawyerRegisterForm() {
  const [lawyerInputs, setLawyerInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    dateOfBirth: "",
    city: "",
    specialization: "",
    lawyerCard: "",
    nationalId: "",
  });

  const [specializations, setSpecializations] = useState([]);
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("الاسم مطلوب").min(3,"يجب ان يحتوى على 3 حروف"),
    email: Yup.string()
      .email("بريد إلكتروني غير صالح")
      .required("الإيميل مطلوب"),
    password: Yup.string()
      .required("كلمة المرور مطلوبة")
      .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
    confirmPassword: Yup.string()
      .required("تأكيد كلمة المرور مطلوب")
      .oneOf([Yup.ref("password"), null], "كلمتا المرور غير متطابقتين"),
    phoneNumber: Yup.string().required("رقم الهاتف مطلوب"),
    dateOfBirth: Yup.string().required("تاريخ الميلاد مطلوب"),
    city: Yup.string().required("المدينة مطلوبة"),
    specialization: Yup.string(),
  });

  const validateField = async (fieldName, value) => {
    try {
      await Yup.reach(validationSchema, fieldName).validate(value);
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: error.message,
      }));
    }
  };
  const handleAddSpecialization = () => {
    if (
      lawyerInputs.specialization &&
      !specializations.includes(lawyerInputs.specialization)
    ) {
      setSpecializations([...specializations, lawyerInputs.specialization]);
      setLawyerInputs({ ...lawyerInputs, specialization: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(lawyerInputs, { abortEarly: false });
      setErrors({});

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        lawyerInputs.email,
        lawyerInputs.password
      );

      const user = userCredential.user;

      await addDoc(collection(db, "lawyers"), {
        uid: user.uid,
        name: lawyerInputs.name,
        email: lawyerInputs.email,
        phoneNumber: lawyerInputs.phoneNumber,
        dateOfBirth: lawyerInputs.dateOfBirth,
        city: lawyerInputs.city,
        specialization: specializations,
        lawyerCard: lawyerInputs.lawyerCard?.name,
        nationalId: lawyerInputs.nationalId?.name,
      });

      alert("تم إنشاء الحساب بنجاح!");
    } catch (err) {
      if (err.inner) {
        const formErrors = {};
        err.inner.forEach((error) => {
          formErrors[error.path] = error.message;
        });
        setErrors(formErrors);
      } else {
        alert("حدث خطأ: " + err.message);
      }
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 mb-20">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        <form onSubmit={handleSubmit} className="space-y-4 text-right w-full">

          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            إنشاء حساب جديد
          </h2>
          <p className="text-2xl text-[#1C202E] mb-6 font-bold ">
            استمتع بتجربة قانونية ذكية وآمنة – ابدأ الآن.
          </p>
          <input
            type="text"
            value={lawyerInputs.name}
            onChange={(event) => {
              setLawyerInputs({ ...lawyerInputs, name: event.target.value });
              if (errors.name) {
                setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
              }
            }}
            onBlur={() => validateField("name", lawyerInputs.name)}
            placeholder="الاسم الكامل"
            value={lawyerInputs.fullName}
            name="fullName"
            onChange={(e) => handleInputChange(e)}
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#b19667]"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
          <input
            type="text"
            value={lawyerInputs.email}
            onChange={(event) => {
              setLawyerInputs({ ...lawyerInputs, email: event.target.value });
            }}
            onBlur={() => validateField("email", lawyerInputs.email)}
            placeholder="البريد الإلكتروني"
            name="email"
            value={lawyerInputs.email}
            onChange={(e) => handleInputChange(e)}
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#b19667]"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
          <input
            type="password"
            value={lawyerInputs.password}
            onChange={(event) => {
              setLawyerInputs({
                ...lawyerInputs,
                password: event.target.value,
              });
            }}
            onBlur={() => validateField("password", lawyerInputs.password)}
            placeholder="كلمة المرور"
            name="password"
            value={lawyerInputs.password}
            onChange={(e) => handleInputChange(e)}
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#b19667]"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
          <input
            type="password"
            value={lawyerInputs.confirmPassword}
            onChange={(event) => {
              setLawyerInputs({
                ...lawyerInputs,
                confirmPassword: event.target.value,
              });
            }}
            onBlur={() =>
              validateField("confirmPassword", lawyerInputs.confirmPassword)
            }
            placeholder="تأكيد كلمة المرور"
            name="confirmPassword"
            value={lawyerInputs.confirmPassword}
            onChange={(e) => handleInputChange(e)}
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#b19667]"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
          <input
            type="text"
            value={lawyerInputs.phoneNumber}
            onChange={(event) => {
              setLawyerInputs({
                ...lawyerInputs,
                phoneNumber: event.target.value,
              });
            }}
            placeholder="رقم الهاتف"
            name="phone"
            value={userData.phone}
            onChange={(e) => handleInputChange(e)}
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#b19667]"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
          )}
          <input
            type="date"

            value={lawyerInputs.dateOfBirth}
            onChange={(event) => {
              setLawyerInputs({
                ...lawyerInputs,
                dateOfBirth: event.target.value,
              });
            }}

            name="birthdate"
            
            placeholder="تاريخ الميلاد"

            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#b19667]"
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
          )}
          <input
            type="text"
            value={lawyerInputs.city}
            onChange={(event) => {
              setLawyerInputs({ ...lawyerInputs, city: event.target.value });
            }}
            placeholder="المدينة"
            name="city"
            value={userData.city}
            onChange={(e) => handleInputChange(e)}
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#b19667]"
          />

          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
          <div className="flex items-center gap-3 rtl flex-wrap">
            <label className="text-sm text-gray-700 min-w-[100px]">
              مجال التخصص:
            </label>
            <select
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C9B38C] text-sm bg-white"
              value={lawyerInputs.specialization}
              onChange={(event) => {
                setLawyerInputs({
                  ...lawyerInputs,
                  specialization: event.target.value,
                });
              }}
            >
              <option value="">اختر مجال التخصص :-</option>
              <option value="القانون الجنائى">القانون الجنائى</option>
              <option value="القانون المدنى">القانون المدنى</option>
              <option value="القانون الإدارى">القانون الإدارى</option>
              <option value="القانون التجارى">القانون التجارى</option>
              <option value="قانون العمل">قانون العمل</option>
              <option value="قانون الأحوال الشخصية">
                قانون الأحوال الشخصية
              </option>

            </select>

            <button
              type="button"
              onClick={handleAddSpecialization}
              className="bg-[#C9B38C] hover:bg-[#b69d75] text-white text-sm px-4 py-2 rounded transition duration-200 cursor-pointer"
            >
              إضافة
            </button>
          </div>
          <div className="flex gap-2 flex-wrap mt-2">
            {specializations.map((spec, index) => (
              <span
                key={index}
                className="bg-[#C9B38C] text-white text-sm px-4 py-1 rounded-full"
              >
                {spec}
              </span>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-start gap-6 mt-6">
            <div className="w-full md:w-1/2">
              <label className="block text-sm text-right mb-2">
                ارفع بطاقة عضوية نقابة المحامين:
              </label>
              <input
                type="file"

                name="lawyerCard"
                accept="image/*"
                onChange={(event) =>
                  setLawyerInputs({
                    ...lawyerInputs,
                    lawyerCard: event.target.files[0],
                  })

                }
                className=" w-3xs px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700 bg-gray-100 cursor-pointer"
              />
            </div>

            <div className="w-full md:w-1/2">
              <label className="block text-sm text-right mb-2">
                ارفع صورة البطاقة الشخصية:
              </label>
              <input
                type="file"

                name="nationalId"
                accept="image/*"
                onChange={(event) =>
                  setLawyerInputs({
                    ...lawyerInputs,
                    nationalId: event.target.files[0],
                  })
                }

                className="block w-3xs px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700 bg-gray-100 cursor-pointer"
              />
            </div>
          </div>
          <div className="flex justify-center ">
            <button
              type="submit"
              className="w-md bg-[#C9B38C] hover:bg-[#b69d75] text-white py-2 rounded-md transition cursor-pointer "
            >
              إنشاء حساب
            </button>
          </div>
          <div className="flex justify-center ">
            <p className="mt-4 text-2xl text-gray-700">
              لديك حساب بالفعل ؟
              <a href="#" className="text-[#1C202E] hover:underline font-bold ">
                سجل دخول
              </a>
            </p>
          </div>
        </form>
        <div className="hidden md:flex justify-center items-center ">
          <Image
            src="/images/client-register.png"
            alt="Law Counsel Logo"
            width={500}
            height={500}
            className="mx-auto mb-4"
          />
        </div>
      </div>
    </div>
  );
}
