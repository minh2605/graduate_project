import * as React from "react";
import { SVGProps } from "react";

const SvgBin = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="sc-gsDKAQ gxFfgh"
    {...props}
  >
    <path
      d="M9.5 6C9.5 5.44772 9.94772 5 10.5 5H13.5C14.0523 5 14.5 5.44772 14.5 6V7H17.5C18.0523 7 18.5 7.44772 18.5 8C18.5 8.55228 18.0523 9 17.5 9H6.5C5.94772 9 5.5 8.55228 5.5 8C5.5 7.44772 5.94772 7 6.5 7H9.5V6Z"
      fill="currentColor"
    ></path>
    <path
      d="M17.2346 10.5H6.7655L7.51227 17.2209C7.62481 18.2337 8.48093 19 9.50003 19H14.5C15.5191 19 16.3753 18.2337 16.4878 17.2209L17.2346 10.5Z"
      fill="currentColor"
    ></path>
  </svg>
);

export default SvgBin;
