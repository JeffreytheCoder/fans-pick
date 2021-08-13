import React, { useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import anonymousPic from '../../images/anonymous.jpg';

function CreatePage() {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    avatar: anonymousPic,
    fansName: '',
    sections: ['test'],
    socialLinks: [],
  });
  const [pageNum, setPageNum] = useState(1);

  const SECTION_CHOICES = ['ideas', 'Q&A', 'improvements'];

  return (
    <div class="flex font-main mt-6">
      <div class="flex flex-col items-center w-full">
        {/* <div class="flex flex-row">
          <div class="flex flex-col flex-grow">
            <span>STEP: 1 OF 3</span>
            <span>Page Info</span>
          </div>
          <div class="flex flex-row items-center">
            <div class="w-40 overflow-hidden h-2 text-xs flex rounded bg-green-200 mr-2">
              <div class="w-1/3 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
            </div>
            <span>33%</span>
          </div>
        </div> */}
        <form class="w-4/5 md:w-3/4 lg:w-1/2">
          <AvatarEditor
            image={formData.avatar}
            width={200}
            height={200}
            border={50}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={1}
            rotate={0}
          />

          <div class="mb-6 cursor-pointer overflow-hidden relative inline-block hover-transition text-lg border-2 rounded font-bold pt-2 px-4 text-green-500 border-green-500 hover:text-white hover:bg-green-500">
            <div class="text-base inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              <span class="ml-2">Upload</span>
            </div>
            <input
              class="cursor-pointer absolute top-0 left-0 inline-block opacity-0 pin-r pin-t"
              type="file"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  avatar: e.target.value,
                })
              }
            />
          </div>

          <label className="block text-gray-700 font-bold mb-1">
            Page name
          </label>
          <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 input-outline hover-transition mb-6"
            placeholder="Name of your channel..."
            required
          />

          <label className="block text-gray-700 font-bold mb-1">Page bio</label>
          <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 input-outline hover-transition mb-6"
            placeholder="Describe your channel..."
            required
          />

          <label className="block text-gray-700 font-bold mb-1">
            Fans name
          </label>
          <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 input-outline hover-transition mb-6"
            placeholder="Name your followers..."
          />

          <label className="block text-gray-700 font-bold mb-1">
            Page sections
          </label>
          <div class="w-full flex flex-col items-center h-64 mx-auto">
            <div class="w-full">
              <div class="flex flex-col items-center relative">
                <div class="w-full  svelte-1l8159u">
                  <div class="my-2 p-1 flex border border-gray-200 bg-white rounded svelte-1l8159u">
                    <div class="flex flex-auto flex-wrap">
                      {formData.sections.map((sec) => {
                        return (
                          <div class="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-green-700 bg-green-100 border border-green-300 ">
                            <div class="font-normal leading-none max-w-full flex-initial">
                              {sec}
                            </div>
                            <div class="flex flex-auto flex-row-reverse">
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  setFormData({
                                    ...formData,
                                    sections: formData.sections.filter(
                                      (section) => {
                                        return sec !== section;
                                      }
                                    ),
                                  });
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="100%"
                                  height="100%"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  class="feather feather-x cursor-pointer hover:text-green-400 rounded-full w-4 h-4 ml-2"
                                >
                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                      <div class="flex-1">
                        <input
                          placeholder="Select the sections you wanna have on your page"
                          class="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="shadow bg-white z-40 w-full rounded max-h-select overflow-y-auto svelte-5uyqqj">
                  <div class="flex flex-col w-full">
                    {SECTION_CHOICES.map((choice) => {
                      return (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            formData.sections.includes(choice)
                              ? setFormData({
                                  ...formData,
                                  sections: formData.sections.filter((sec) => {
                                    return sec !== choice;
                                  }),
                                })
                              : setFormData({
                                  ...formData,
                                  sections: [...formData.sections, choice],
                                });
                          }}
                        >
                          <div class="w-full border-gray-100 rounded-t border-b hover:bg-green-100">
                            <div
                              class={`"flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-green-100" ${
                                formData.sections.includes(choice)
                                  ? 'border-green-600'
                                  : 'hover:border-green-100'
                              }`}
                            >
                              <div class="w-full items-center flex">
                                <div class="mx-2 leading-6  ">{choice} </div>
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePage;
