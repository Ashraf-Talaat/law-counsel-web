"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
export function ProfileSubNav() {
  const handleLogout = () => {
    localStorage.removeItem("uid");
    Cookies.remove("userType")
    toast.success("تم تسجيل الخروج");
    window.location.href = "/login";
  };

  const handleDeleteAccount = async () => {
    const confirm = await Swal.fire({
      title: "هل أنت متأكد؟",
      text: "سيتم حذف الحساب نهائيًا!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم، احذف",
      cancelButtonText: "إلغاء",
    });
    if (!confirm.isConfirmed) return;

    try {
      await deleteDoc(doc(db, "clients", userId)); 
      localStorage.removeItem("uid");
      localStorage.removeItem("userType");
      toast.success("تم حذف الحساب");
      window.location.href = "/login";
    } catch (err) {
      toast.error("حدث خطأ أثناء حذف الحساب");
    }
  };
  const pathname = usePathname();

  const links = [
    { label: "بياناتي الشخصية", href: "myInfo" },
    { label: "مقالاتي", href: "articles" },
  ];

  return (
    <ul className="space-y-6 text-center text-2xl font-medium">
      {links.map(({ label, href }) => (
        <li key={href}>
          <Link
            href={href}
            className={`block py-2 rounded-md cursor-pointer transition-colors ${
              pathname === href
                ? "bg-[#C9B38C] text-white"
                : "hover:bg-[#e0d4b7] text-[#1C202E]"
            }`}
          >
            {label}
          </Link>
        </li>
      ))}

      <hr className="my-6 border-t" />

      <li key="">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#262b3e] to-[#6a7899] hover:from-[#687693] hover:to-[#1c202e] text-white px-6 py-3 rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <ArrowLeftEndOnRectangleIcon className="h-5 w-5" />
          تسجيل الخروج
        </button>
      </li>
      <li key="">
        <button
          onClick={handleDeleteAccount}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <TrashIcon className="h-5 w-5" />
          حذف الحساب
        </button>
      </li>
    </ul>
  );
}
