import React, { useState, Fragment, useRef, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import { setAlert } from '../../actions/alert';

const CreatePost = ({ pageId, sections, auth, setAlert }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    section: '',
  });
  const cancelButtonRef = useRef(null);
  const [filterClicked, setFilterClicked] = useState(false);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formData.section) {
      setAlert('Please select a section', 'danger');
    } else {
      console.log(formData);

      const config = {
        headers: { 'Content-Type': 'application/json' },
      };
      const body = JSON.stringify({ ...formData, page_id: pageId });
      console.log(body);

      try {
        const res = await axios.post('/api/posts/create', body, config);
        console.log(res.data);
        setTimeout(() => {
          setAlert('Post created!', 'success');
        }, 3000);
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Fragment>
      <button
        onClick={() => setOpen(true)}
        class="inline-block text-xl font-semibold px-4 py-3 leading-none rounded-md border-2 border-white text-white bg-green-500 hover:bg-white hover:border-2 hover:text-green-500 hover:border-green-500 hover-transition"
      >
        New Post
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto font-main"
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div>
                    {/* <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div> */}
                    <div class="absolute top-5 right-5 ">
                      <button onClick={() => setOpen(false)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 text-gray-600 hover:text-gray-800 hover-transition"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    <form onSubmit={onSubmit}>
                      <Dialog.Title
                        as="h3"
                        className="text-xl leading-6 font-medium text-gray-900 mb-6"
                      >
                        Create a Post
                      </Dialog.Title>
                      <div class="flex flex-row items-center mb-4">
                        <div class="relative inline-block text-left mr-4">
                          <div>
                            <button
                              type="button"
                              class="capitalize inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-green-400 hover-transition"
                              id="menu-button"
                              aria-expanded="true"
                              aria-haspopup="true"
                              onClick={() => setFilterClicked(!filterClicked)}
                            >
                              <svg
                                class="-ml-1 mr-1 mt-0.5 h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clip-rule="evenodd"
                                  strokeWidth={1}
                                />
                              </svg>
                              {formData.section ? formData.section : 'Select'}
                            </button>
                          </div>

                          <Transition
                            show={filterClicked}
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <div
                              class={`z-20 origin-top-left absolute left-0 mt-2 w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby="menu-button"
                              tabindex="-1"
                            >
                              {sections.map((sec) => {
                                if (sec.name !== 'subposts') {
                                  return (
                                    <div class="py-1" role="none">
                                      <button
                                        class={`text-gray-700 block px-8 py-2 text-lg w-full capitalize ${
                                          formData.section === sec.name
                                            ? 'bg-gray-300'
                                            : 'hover:bg-gray-300 hover-transition'
                                        }`}
                                        role="menuitem"
                                        tabindex="-1"
                                        id="menu-item-0"
                                        onClick={() => {
                                          setFormData({
                                            ...formData,
                                            section: sec.name,
                                          });
                                          setFilterClicked(false);
                                        }}
                                      >
                                        {sec.name}
                                      </button>
                                    </div>
                                  );
                                }
                              })}
                            </div>
                          </Transition>
                        </div>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight input-outline hover-transition"
                          id="title"
                          name="title"
                          type="text"
                          placeholder="Title"
                          onChange={onChange}
                          required
                        />
                      </div>
                      <textarea
                        className="leading-loose appearance-none border rounded h-32 w-full py-2 px-3 text-gray-700 leading-tight input-outline hover-transition"
                        id="description"
                        name="description"
                        type="text"
                        placeholder="Description"
                        onChange={onChange}
                        required
                      />
                    </form>
                  </div>
                </div>
                <div className="px-4 pb-4 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="inline-block font-semibold px-4 py-3 leading-none rounded-md border-2 border-white text-white bg-green-500 hover:bg-white hover:border-2 hover:text-green-500 hover:border-green-500 hover-transition"
                    onClick={onSubmit}
                  >
                    Post
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </Fragment>
  );
};

CreatePost.propTypes = {
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert })(CreatePost);
