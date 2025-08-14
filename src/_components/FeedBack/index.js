import Image from "next/image";
import React from "react";

export default function FeedBack({ rating, name, description }) {
  const r = rating; 
  return (
    <>
     

        {/* feedback section content iterable content */}
        <div className="p-6 bg-gray-50 border-gray-200/50 rounded-xl">
          <div className="flex items-center gap-3 mb-4">      

            <div className="flex flex-col">
              {/* user name  */}
              <h6 className="text-sm mb-2 font-semibold text-gray-700"> {name}</h6>

              {/* user rating stars */}
              <div className="flex">
               
                {
                
                Array.from({ length: rating }, (_, i) => i + 1).map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${
                      star <= r ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.12 3.436a1 1 0 00.95.69h3.614c.969 0 1.371 1.24.588 1.81l-2.923 2.12a1 1 0 00-.364 1.118l1.12 3.436c.3.921-.755 1.688-1.54 1.118l-2.923-2.12a1 1 0 00-1.176 0l-2.923 2.12c-.784.57-1.838-.197-1.539-1.118l1.12-3.436a1 1 0 00-.364-1.118L2.777 8.863c-.783-.57-.38-1.81.588-1.81h3.614a1 1 0 00.95-.69l1.12-3.436z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* comment section */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </div>
        </div>
      
    </>
  );
}
