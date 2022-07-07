import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

interface SlideShowData {
  slideData: string[];
}
export const SlideShow = ({ slideData }: SlideShowData): JSX.Element => {
  console.log("slideData", slideData);
  return (
    <>
      {slideData.length > 0 ? (
        <div className="w-50 h-50">
          <div className="slide-container">
            <Slide>
              {slideData.map((slideImage, index) => (
                <div className="each-slide" key={index}>
                  <img src={slideImage} alt="slide" />
                </div>
              ))}
            </Slide>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
