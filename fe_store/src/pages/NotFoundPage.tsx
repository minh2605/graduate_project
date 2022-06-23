import NotFoundImage from "assets/images/404.png";
export const NotFoundPage = (): JSX.Element => {
  return (
    <div className="">
      <img src={NotFoundImage} alt="" />
    </div>
  );
};
