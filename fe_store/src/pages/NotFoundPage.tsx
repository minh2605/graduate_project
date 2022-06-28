import { Button } from "common/components/Button";
import SvgLeftArrow from "common/components/svg/LeftArrow";
import { Link } from "react-router-dom";
import NotFoundImage from "assets/images/404_img.jpg";

export const NotFoundPage = (): JSX.Element => {
  return (
    <div className="w-screen h-screen flex items-center justify-center relative overflow-hidden bg-black">
      <div className="absolute inset-0 opacity-20">
        <img src={NotFoundImage} alt="" />
      </div>
      <div className="font-bold flex flex-col items-center justify-center relative text-light-red">
        <h1 className="text-xl">404</h1>
        <div className="text-h1 mb-4">Oops, page not found!</div>
        <Button>
          <Link to="/" className="flex items-center gap-2">
            <SvgLeftArrow />
            <span>Back to home</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};
