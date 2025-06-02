import React, { useState } from "react";
import Options from "./Options";

const Form = () => {
  return (
    <div id="contact" className="h-fit flex-col-reverse lg:flex-row  w-full flex gap-4 my-4">
      <div className="right flex flex-row lg:flex-col p-4 justify-between w-full lg:w-[20%] rounded-lg bg-[--solid-color] bg-[url(https://accessibe.com/media/impact/hero.png)] bg-cover bg-left">
        <div className="top text-lg font-semibold">SudipAcharya.</div>
        <div className="bottom">
          <ul>
            <li>
              <a className="flex items-center gap-1" href="https://www.facebook.com/sudip.acharya.927980">
                <i className="ri-facebook-circle-fill text-xl"></i>
                <span className="text-sm">Sudip Acharya</span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-1" href="https://www.instagram.com/sudipacharya.js/">
                <i className="ri-instagram-fill text-xl"></i>
                <span className="text-sm">Sudip Acharya</span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-1" href="https://x.com/drxking456">
                <i className="ri-twitter-x-fill text-xl"></i>
                <span className="text-sm">Sudip Acharya</span>
              </a>
            </li>
            <li>
              <a className="flex items-center gap-1" href="https://www.linkedin.com/in/sudip-acharya-937347281/">
                <i className="ri-linkedin-box-fill text-xl"></i>
                <span className="text-sm">Sudip Acharya</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="left h-full w-full lg:w-[80%] rounded-lg bg-[--solid-color] flex flex-col pt-5 lg:px-44 md:px-24 px-5">
        <h1 className="text-2xl font-semibold">I'd love to help</h1>
        <p className="text-sm">
          Reach out and i'll get in touch as soon as possible
        </p>
        <form
          action="https://formspree.io/f/mkgwladb"
          method="POST"
          className="py-10 flex flex-col gap-4"
        >
          <div className="name flex gap-4 md:flex-row flex-col">
            <div className="first-name flex flex-col md:w-1/2 gap-1">
              <label className="text-sm" htmlFor="first-name">
                First name
              </label>
              <input
                required
                placeholder="Jane"
                className=" bg-[--form-input-color] rounded-md focus:outline-none px-4 py-2 text-sm"
                type="text"
                id="first-name"
                name="first-name"
              />
            </div>
            <div className="last-name flex flex-col md:w-1/2 gap-1">
              <label className="text-sm px-1" htmlFor="last-name">
                Last name
              </label>
              <input
                required
                placeholder="Foster"
                className=" bg-[--form-input-color] rounded-md focus:outline-none px-4 py-2 text-sm"
                type="text"
                id="last-name"
                name="last-name"
              />
            </div>
          </div>
          <div className="email flex flex-col gap-1">
            <label htmlFor="email" className="text-sm px-1">
              Email
            </label>
            <input
            required
              placeholder="fosterjane@gmail.com"
              className=" bg-[--form-input-color] rounded-md focus:outline-none px-4 py-2 text-sm"
              type="email"
              id="email"
              name="email"
            />
          </div>
          <div className="location flex flex-col gap-1">
            <label htmlFor="contries" className="text-sm px-1">
              Location
            </label>

            <select
            required
              id="countries"
              name="country"
              className="text-sm bg-[--form-input-color] rounded-md focus:outline-none px-4 py-2 "
            >
              <option className="text-sm " value="sel" hidden>
                Select a country
              </option>
              <Options />
            </select>
          </div>
          <div className="message">
            <label htmlFor="message" className="text-sm px-1">
              Message
            </label>
            <textarea
              required
              name="message"
              id="message"
              className="bg-[--form-input-color]  rounded-md w-full h-36 focus:outline-none px-4 py-2 text-sm resize-none"
              placeholder="Message"
            ></textarea>
          </div>
          <input
            type="submit"
            value="Send Message"
            className="py-2 rounded-md w-full cursor-pointer bg-blue-500 text-white"
          />
        </form>
      </div>
    </div>
  );
};

export default Form;
