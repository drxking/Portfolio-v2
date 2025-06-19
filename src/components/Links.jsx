import React from "react";

const social = Object.entries({
  "ri-facebook-circle-fill": "https://www.facebook.com/sudip.acharya.927980",
  "ri-instagram-fill": "https://www.instagram.com/sudipacharya.js/",
  "ri-twitter-x-fill": "https://twitter.com/drxking456",
  "ri-linkedin-box-fill":
    "https://www.linkedin.com/in/sudip-acharya-937347281/",
  "ri-github-fill": "https://github.com/drxking",
  "ri-threads-fill": "https://www.threads.net/@sudipacharya.js",
});

const Links = ({hiddens}) => {
  return (
    <div className="links">
      <p className={hiddens?"text-sm hidden":"text-sm"}>Connect with Me Through:</p>
      <div className="flex gap-2">
        {social.map(([classes, links]) => (
          <a key={classes} href={links}>
            <i className={`${classes} text-[35px]`}></i>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Links;
