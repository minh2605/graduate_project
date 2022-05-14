import * as React from "react";
import { SVGProps } from "react";

const SvgLeftArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m14.12 6.707-1.413-1.414L6 12l6.707 6.707 1.414-1.414L9.828 13h9.586v-2H9.828l4.293-4.293Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgLeftArrow;
