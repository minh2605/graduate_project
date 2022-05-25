import * as React from "react";
import { SVGProps } from "react";

const SvgAccount = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="sc-gsDKAQ erBbkF"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 13C13.2426 13 14.25 11.9926 14.25 10.75C14.25 9.50736 13.2426 8.5 12 8.5C10.7574 8.5 9.75 9.50736 9.75 10.75C9.75 11.9926 10.7574 13 12 13ZM12 15C14.3472 15 16.25 13.0972 16.25 10.75C16.25 8.40279 14.3472 6.5 12 6.5C9.65279 6.5 7.75 8.40279 7.75 10.75C7.75 13.0972 9.65279 15 12 15Z"
      fill={props.color || "#494949"}
    ></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 4C16.4183 4 20 7.58172 20 12C20 14.1937 19.1171 16.1811 17.6872 17.6264C16.411 16.6455 14.5656 16 12 16C9.4344 16 7.58905 16.6455 6.31282 17.6264C4.88294 16.1811 4 14.1937 4 12C4 7.58172 7.58172 4 12 4ZM16.0273 18.9139C15.1418 18.3839 13.8588 18 12 18C10.1412 18 8.8582 18.3839 7.97271 18.9139C9.15555 19.6044 10.5316 20 12 20C13.4684 20 14.8445 19.6044 16.0273 18.9139Z"
      fill={props.color || "#494949"}
    ></path>
  </svg>
);

export default SvgAccount;
