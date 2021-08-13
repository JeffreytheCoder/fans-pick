import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AvatarEditor from 'react-avatar-editor';
import ImageUploader from 'react-images-upload';
import { Icon } from '@iconify/react';
import axios from 'axios';

import instagramIcon from '../../images/instagram.svg';
import tiktokIcon from '../../images/tik-tok.svg';
import anonymousPic from '../../images/anonymous.jpg';
import { setAlert } from '../../actions/alert';

const CreatePage = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    avatar: anonymousPic,
    fansName: '',
    sections: [],
    socialLinks: {
      facebook: '',
      twitter: '',
      instagram: '',
      youtube: '',
      tiktok: '',
      pinterest: '',
      linkedin: '',
      medium: '',
      website: '',
    },
  });
  const [avatarScale, setAvatarScale] = useState(1);

  useEffect(() => {
    console.log(formData);
  }, formData);

  const SECTION_CHOICES = ['ideas', 'Q&A', 'improvements'];

  const onSubmit = async () => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const body = JSON.stringify(formData);

    try {
      const res = await axios.post('/api/pages/create', body, config);
      console.log(res.data);
      setTimeout(() => {
        setAlert('Page created!', 'success');
      }, 3000);
      window.location.href = `/page/${res.data.page._id}`;
    } catch (err) {
      console.error(err);
    }
  };

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
          <div class="text-2xl font-bold mb-2">Register your Creator Page</div>
          <div class="text-lg italic mb-4">
            Fill out the following info about your channel. Takes ~2 mins
          </div>

          <label className="block text-gray-700 font-bold mb-1">
            Page Avatar
          </label>
          <div class="flex flex-row justify-center mb-2">
            <AvatarEditor
              image={formData.avatar}
              width={200}
              height={200}
              borderRadius={100}
              color={[255, 255, 255, 0.6]} // RGBA
              scale={avatarScale.toString()}
              rotate={0}
            />
          </div>

          <div class="flex flex-row justify-center">
            <label className="block text-gray-700 font-bold mr-2">Zoom</label>
            <input
              type="range"
              min="1"
              max="2"
              step="0.01"
              value={avatarScale}
              onChange={(e) => setAvatarScale(e.target.value)}
            />
          </div>
          {/* <div class="flex flex-row justify-center">
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
          </div> */}
          <ImageUploader
            className="mb-4"
            withIcon={true}
            singleImage={true}
            buttonText="Choose images"
            onChange={(photo) => {
              setFormData({ ...formData, avatar: photo[0] });
            }}
            imgExtension={['.jpg', '.png', '.gif']}
            maxFileSize={5242880}
          />

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

          <label className="block text-gray-700 font-bold mb-4">
            Connect to your channel
          </label>
          <div class="flex flex-col mb-6">
            <div class="flex flex-row mb-4 items-center">
              <Icon icon="logos:facebook" width="40" />
              <input
                class="appearance-none border rounded w-full py-2 px-3 text-gray-700 input-outline hover-transition ml-6"
                placeholder="Facebook link..."
              />
            </div>
            <div class="flex flex-row mb-4 items-center">
              <Icon icon="logos:twitter" width="40" />
              <input
                class="appearance-none border rounded w-full py-2 px-3 text-gray-700 input-outline hover-transition ml-6"
                placeholder="Twitter link..."
              />
            </div>
            <div class="flex flex-row mb-4 items-center">
              <img class="w-9" src={instagramIcon} />
              <input
                class="appearance-none border rounded w-full py-2 px-3 text-gray-700 input-outline hover-transition ml-6"
                placeholder="Instagram link..."
              />
            </div>
            <div class="flex flex-row mb-4 items-center">
              <Icon icon="logos:youtube-icon" width="40" />
              <input
                class="appearance-none border rounded w-full py-2 px-3 text-gray-700 input-outline hover-transition ml-6"
                placeholder="YouTube link..."
              />
            </div>
            <div class="flex flex-row mb-4 items-center">
              <img class="w-9" src={tiktokIcon} />
              <input
                class="appearance-none border rounded w-full py-2 px-3 text-gray-700 input-outline hover-transition ml-6"
                placeholder="TikTok link..."
              />
            </div>
            <div class="flex flex-row mb-4 items-center">
              <Icon icon="logos:pinterest" width="40" />
              <input
                class="appearance-none border rounded w-full py-2 px-3 text-gray-700 input-outline hover-transition ml-6"
                placeholder="Pinterest link..."
              />
            </div>
            <div class="flex flex-row mb-4 items-center">
              <Icon icon="logos:linkedin-icon" width="40" />
              <input
                class="appearance-none border rounded w-full py-2 px-3 text-gray-700 input-outline hover-transition ml-6"
                placeholder="LinkedIn link..."
              />
            </div>
            <div class="flex flex-row mb-4 items-center">
              <Icon icon="akar-icons:medium-fill" width="40" />
              <input
                class="appearance-none border rounded w-full py-2 px-3 text-gray-700 input-outline hover-transition ml-6"
                placeholder="Medium link..."
              />
            </div>
            <div class="flex flex-row mb-4 items-center">
              <Icon icon="entypo:link" width="40" />
              <input
                class="appearance-none border rounded w-full py-2 px-3 text-gray-700 input-outline hover-transition ml-6"
                placeholder="Personal website link..."
              />
            </div>
          </div>
          <div class="flex flex-row justify-center mb-10">
            <button class="btn hover-transition">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

CreatePage.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(CreatePage);
