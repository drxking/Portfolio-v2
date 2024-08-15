import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../App";

function btnDarkMode(mode, btn, cloud, star) {
  let widthOfParent = mode.current.getBoundingClientRect().width;
  btn.current.style.left = `${widthOfParent / 2}px`;
  btn.current.style.marginLeft = `0px`;
  btn.current.style.marginRight = `4px`;
  mode.current.style.backgroundColor = `#666`;
  btn.current.style.backgroundColor = `#e5e5e5`;
  cloud.current.style.bottom = `0%`;
  star.current.style.bottom = `100%`;
  btn.current.style.color = `#777`;
  btn.current.innerHTML = `<i class="ri-sun-fill text-xs"></i>`;
}

function btnLightMode(mode, btn, cloud, star) {
  btn.current.style.left = `0px`;
  btn.current.style.marginRight = `0px`;
  btn.current.style.marginLeft = `4px`;
  mode.current.style.backgroundColor = `#fff`;
  btn.current.style.backgroundColor = `#374151`;
  cloud.current.style.bottom = `-100%`;
  star.current.style.bottom = `0%`;
  btn.current.style.color = `#e5e5e5`;
  btn.current.innerHTML = `<i class="ri-moon-clear-fill text-xs"></i>`;
}

const Toggle = () => {
  let { theme, changedTheme } = useContext(ThemeContext);
  const [first, setFirst] = useState(false);
  const mode = useRef(null);
  const btn = useRef(null);
  const cloud = useRef(null);
  const star = useRef(null);

  useEffect(() => {
    if (theme) {
      btnDarkMode(mode, btn, cloud, star);
    } else {
      btnLightMode(mode, btn, cloud, star);
    }
    if (!first) {
      setFirst(true);
    }
  }, [theme]);

  const HandleOnClick = () => {
    if (theme) {
      changedTheme(false);
    } else {
      changedTheme(true);
    }
  };

  return (
    <div
      ref={mode}
      onClick={HandleOnClick}
      style={{ boxShadow: "inset -1px -1px 2px #888, inset 1px 1px 2px #888" }}
      className={`mode flex justify-start bg-white w-10 h-6 rounded-full overflow-hidden ${
        first ? "duration-500" : ""
      } relative cursor-pointer`}
    >
      <div
        ref={btn}
        className={`h-4 w-4 text-[#e5e5e5] bg-gray-700 rounded-full ${
          first ? " duration-300" : ""
        } top-1/2 -translate-y-1/2 absolute ml-1 left-0 flex items-center justify-center`}
      >
        <i className="ri-moon-clear-fill text-xs"></i>
      </div>
      <div
        ref={cloud}
        className={`baddal absolute bottom-[-100%]  ${(first)?"duration-300":""} h-full w-full `}
      >
        <div className="circle h-4 w-4 absolute left-0 -bottom-1 bg-gray-300 rounded-full"></div>
        <div className="circle h-3 w-3 absolute left-3 -bottom-2 bg-gray-300 rounded-full"></div>
      </div>
      <div
        ref={star}
        className={`stars absolute bottom-0  ${(first)?"duration-300":""}  h-full w-full `}
      >
        <div className="circle opacity-75 h-[2px] w-[2px] absolute right-[18px] bottom-5  rounded-full">
          <i className="text-[5.5px] ri-gemini-fill"></i>
        </div>
        <div className="circle opacity-75 h-[2px] w-[2px] absolute right-2 bottom-7 rounded-full">
          <i className="text-[6.5px] ri-gemini-fill"></i>
        </div>
        <div className="circle opacity-75 h-[2px] w-[2px] absolute right-[17px] bottom-8 rounded-full">
          <i className="text-[3.5px] ri-gemini-fill"></i>
        </div>
      </div>
    </div>
  );
};

export default Toggle;
