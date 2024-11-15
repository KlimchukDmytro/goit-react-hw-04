import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

const ImageGallery = ({ results, openModal }) => {
  return (
    <div>
      <ul className={s.imgList}>
        {results.map((img) => {
          return (
            <li
              key={img.id}
              className={s.imgItem}
              onClick={() => openModal(img)}
            >
              <ImageCard small={img.urls.small} description={img.description} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ImageGallery;
