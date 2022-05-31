import * as React from "react";
import { SVGProps } from "react";

const SvgEdit = (props: SVGProps<SVGSVGElement>) => (
  <svg
    className="mr-2 h-5 w-5"
    aria-hidden="true"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 13V16H7L16 7L13 4L4 13Z"
      fill="currentColor"
      stroke="currentColor"
      stroke-width="2"
    ></path>
  </svg>
);

export default SvgEdit;
