import { LazyLoadImage } from "react-lazy-load-image-component";
import myImage from "../../assets/ibrahim.WebP";
import { memo } from "react";

function DeveloperImage() {
  return (
    <div className="about-image mx-auto ">
      <LazyLoadImage
        srcSet={myImage}
        alt="Ibrahim Ahmed"
        className="object-fit-cover w-100 h-100 rounded-circle"
        title="Ibrahim Ahmed"
        effect="blur" // Apply a blur effect during lazy loading
      />
    </div>
  );
}
export default memo(DeveloperImage);
