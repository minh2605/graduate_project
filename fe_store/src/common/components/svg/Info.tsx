import * as React from "react";
import { SVGProps } from "react";

const SvgInfo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="sc-gsDKAQ gxFfgh"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
      fill="currentColor"
    ></path>
    <path d="M11 11.5H13V16H11V11.5Z" fill="currentColor"></path>
    <path
      d="M13.25 9.25C13.25 9.94036 12.6904 10.5 12 10.5C11.3096 10.5 10.75 9.94036 10.75 9.25C10.75 8.55964 11.3096 8 12 8C12.6904 8 13.25 8.55964 13.25 9.25Z"
      fill="currentColor"
    ></path>
  </svg>
);

export default SvgInfo;
