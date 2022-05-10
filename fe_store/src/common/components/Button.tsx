import tw, { styled } from "twin.macro";
type ButtonProps = {
  variant?: "primary" | "secondary";
  size?: "sm" | "lg" | "xl";
};

export const Button = styled.button(
  ({ variant = "primary", size = "sm" }: ButtonProps) => [
    tw`px-4 py-2 rounded-3xl text-sm font-medium transition`,
    variant === "primary" && tw`bg-light-red hover:bg-dark-red text-white`,
    variant === "secondary" && tw`bg-border-grey hover:bg-light-grey`,
    size === "lg" && tw`px-8`,
    size === "xl" && tw`px-10`,
  ]
);
