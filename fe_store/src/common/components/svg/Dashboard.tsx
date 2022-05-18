import * as React from "react";
import { SVGProps } from "react";

const SvgDashboard = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <rect x="2" y="2" width="9" height="9" rx="2" fill="currentColor"></rect>
    <rect
      opacity="0.3"
      x="13"
      y="2"
      width="9"
      height="9"
      rx="2"
      fill="currentColor"
    ></rect>
    <rect
      opacity="0.3"
      x="13"
      y="13"
      width="9"
      height="9"
      rx="2"
      fill="currentColor"
    ></rect>
    <rect
      opacity="0.3"
      x="2"
      y="13"
      width="9"
      height="9"
      rx="2"
      fill="currentColor"
    ></rect>
  </svg>
);

export default SvgDashboard;
