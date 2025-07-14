import React from 'react'

export default function page() {
  return (
    < >
      {/* start button to add post */}
      <div className="fixed bottom-25 left-25 z-50">
        <div className="tooltip tooltip-right" data-tip=" طلب استشارة">
          <label
            className="flex items-center justify-center text-black bgBtn rounded-lg w-14 h-14 hover:bgBtnHover focus:ring-4 focus:outline-none focus:bgBtnHover"
            htmlFor="create-post-modal"
          >
            test
          </label>

          <input
            type="checkbox"
            id="create-post-modal"
            className="modal-toggle"
          />
          <div className="modal">
            <div className="modal-box w-11/12 max-w-2xl">
              <h3 className="font-bold text-lg"> طلب الاستشارة</h3>
              <div className="py-4">
                <input
                  type="text"
                  placeholder="عنوان الاستشارة"
                  className="input input-bordered w-full mb-3 "
                />
                <textarea
                  className="textarea textarea-bordered w-full mb-3 outline-none"
                  placeholder="محتوى الاستشارة"
                ></textarea>
                
              </div>

              <div className="modal-action gap-8">
                <button className="btn bgBtn text-white px-6">ارسال</button>
                <label htmlFor="create-post-modal" className="btn">
                  إغلاق
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end button to add post */}
    </>
  )
}
