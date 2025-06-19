import axios from "axios";
import React, { useEffect, useRef, useState, useContext } from "react";
import config from "../config";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";
import { ThemeContext } from "../App";

const Create = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  let { theme } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const previewH1 = useRef(null);
  const previewp = useRef(null);
  const previewImage = useRef(null);
  const writingArea = useRef(null);
  const previewArea = useRef(null);
  const textHeading = useRef(null);
  const textPara = useRef(null);
  const inputImage = useRef(null);
  const imageTitle = useRef(null);
  function autoGrowHeading(e) {
    previewH1.current.innerHTML = e.target.value;
    // Reset the height to auto to correctly calculate the new height
    textHeading.current.style.height = "50px";
    // Set the height based on the scroll height
    textHeading.current.style.height = textHeading.current.scrollHeight + "px";
  }
  function autoGrowDesc(e) {
    console.log();

    previewp.current.innerHTML = e.target.value
      .split("\n")
      .map((e) => {
        if (e.startsWith("##")) {
          let tl = e.split("");
          tl.splice(0, 2);
          let yy = tl.join("");
          return `<span class="font-medium text-xl">${yy}</span>`;
        } else {
          return e;
        }
      })
      .join("<br/>");
    // Reset the height to auto to correctly calculate the new height
    textPara.current.style.height = "50px";
    // Set the height based on the scroll height
    textPara.current.style.height = textPara.current.scrollHeight + "px";
  }

  function handleSubmit() {
    setIsUpdating(true);
    let heading = textHeading.current.value;
    let desc = textPara.current.value;
    let file = inputImage.current.files[0];
    console.log(file);
    axios
      .put(
        `${config.apiUrl}/api/posts/${id}`,
        {
          headline: heading,
          desc: desc,
          image: file,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        if (response.data.status == "success") {
          navigate("/admin");
        } else {
          alert(response.data.message);
          setIsUpdating(false);
        }
      })
      .catch((err) => {
        alert(err.message);
        setIsUpdating(false);
      });
  }
  function handleDelete() {
    setIsUpdating(true);
    axios
      .delete(`${config.apiUrl}/api/posts/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.status == "success") {
          navigate("/admin");
        } else {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  function handleImage(e) {
    // console.log(e.target.files[0]);
    // previewImage.current.objectSrc = e.target.value;
    const file = e.target.files[0];
    if (file) {
      previewImage.current.src = URL.createObjectURL(file);
      previewImage.current.classList.remove("h-72");
      imageTitle.current.innerHTML = file.name;

      // Release the object URL after the image is loaded to free memory
      previewImage.current.onload = () =>
        URL.revokeObjectURL(previewImage.current.src);
    }
  }

  useEffect(() => {
    axios
      .get(`${config.apiUrl}/api/posts/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setIsLoading(false);
        textHeading.current.value = response.data.headline;
        textPara.current.value = response.data.desc;
        previewImage.current.src = response.data.image;
        imageTitle.current.innerHTML =
          response.data.image_public_id.split("/")[1];
        textHeading.current.style.height =
          textHeading.current.scrollHeight + "px";
        textPara.current.style.height = textPara.current.scrollHeight + "px";
        previewp.current.innerHTML = response.data.desc
          .split("\n")
          .map((e) => {
            if (e.startsWith("##")) {
              let tl = e.split("");
              tl.splice(0, 2);
              let yy = tl.join("");
              return `<span class="font-medium text-xl">${yy}</span>`;
            } else {
              return e;
            }
          })
          .join("<br/>");
        previewH1.current.innerHTML = response.data.headline;
      })
      .catch((err) => {
        alert(err.message);
      });
  });
  return (
    <div className="lg:px-20 min-h-screen flex flex-col md:px-10 px-4 text-[--text-color] duration-300 overflow-x-hidden">
      <div className="p-3 flex justify-between items-center">
        <h1 className="text-xl font-medium">Write New Blog</h1>
        <h1 className="text-xl font-medium">Live Preview</h1>
      </div>
      <div className="w-full  flex md:flex-row flex-col mt-2 relative">
        {isLoading ? (
          <div className="h-full w-full bg-[--primary-color] flex items-center justify-center absolute">
            <MutatingDots
              visible={true}
              height="100"
              width="100"
              color={theme ? "#e5e5e5" : "#111"}
              secondaryColor={theme ? "#e5e5e5" : "#111"}
              radius="12.5"
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
          ""
        )}
        <div className="write w-full md:w-1/2 h-[90vh]  flex flex-col">
          <div className="  overflow-scroll flex-1 px-2">
            <form
              onSubmit={(e) => e.preventDefault()}
              ref={writingArea}
              className="writing-area "
            >
              <div className="flex items-center justify-between px-2 mb-2 relative">
                {isUpdating ? (
                  <span className="absolute scale-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <MutatingDots
                      visible={true}
                      height="100"
                      width="100"
                      color={theme ? "#e5e5e5" : "#111"}
                      secondaryColor={theme ? "#e5e5e5" : "#111"}
                      radius="12.5"
                      ariaLabel="mutating-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </span>
                ) : (
                  ""
                )}
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-purple-500 rounded-lg cursor-pointer"
                >
                  Save Changes
                </button>

                <button
                  onClick={handleDelete}
                  className="px-6 py-2 bg-red-500 rounded-lg cursor-pointer"
                >
                  Delete
                </button>
              </div>
              <div className="flex items-end justify-between px-0 mb-2 gap-2">
                <div className="relative w-full rounded-xl overflow-hidden">
                  <input
                    onChange={handleImage}
                    ref={inputImage}
                    type="file"
                    name="image"
                    className="border border-gray-500 rounded-2xl py-10 opacity-0 w-full cursor-pointer"
                  />
                  <div className="overlay bg-gray-600/40 absolute pointer-events-none h-full w-full top-0 flex flex-col gap-1 items-center justify-center">
                    <div className="circle rounded-full bg-blue-500 h-16 w-16 flex items-center justify-center relative duration-300">
                      <div className="vert h-[50%] w-[3px] bg-white"></div>
                      <div className="vert h-[50%] absolute rotate-90 w-[3px] bg-white"></div>
                    </div>
                    <p
                      ref={imageTitle}
                      className="line-clamp-1 text-center opacity-80 w-full px-4"
                    ></p>
                  </div>
                </div>
              </div>
              <textarea
                onInput={autoGrowHeading}
                ref={textHeading}
                type="text"
                placeholder="Heading"
                name="heading"
                className="w-full p-3 bg-gray-600/40 text-xl overflow-hidden resize-none focus:outline-none h-[50px] rounded-xl"
              ></textarea>
              <textarea
                onInput={autoGrowDesc}
                ref={textPara}
                type="text"
                placeholder="Description"
                name="desc"
                className="w-full px-2 py-2 bg-gray-600/40 text-base overflow-hidden resize-none focus:outline-none h-[50px] rounded-xl"
              ></textarea>
            </form>
          </div>
        </div>
        <div
          ref={previewArea}
          className="preview md:w-1/2 w-full md:h-[90vh] h-fit overflow-scroll "
        >
          <div className="preview-area bg-gray-500/50 rounded-3xl w-full  flex flex-col  items-center px-2 pt-10 ">
            <img
              ref={previewImage}
              src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3AtNDY2LXBhLTA2NjEuanBn.jpg"
              className="w-[90%] h-72 bg-red-400 rounded-2xl object-cover"
            />
            <h1
              className="text-center text-2xl font-semibold mt-4 w-[90%]"
              ref={previewH1}
            >
              Preview Title Goes Here!!
            </h1>
            <p ref={previewp} className="py-4 w-[90%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
              ipsam eius perspiciatis cumque. Sequi placeat quo maxime quos
              eligendi. Rem, optio. Iusto eius totam ab placeat distinctio, unde
              molestias provident fugit quod! Molestiae commodi voluptatibus
              iusto officiis ratione aut animi?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
