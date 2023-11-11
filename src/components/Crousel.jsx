import crousels from "../libs/crousels";
import { LLImage } from "../utils/images";

const Crousel = () => {
  return (
    <div className="carousel rounded-box flex gap-x-2">
      {crousels.map((crousel) => (
        <div className="carousel-item min-min-w-64 h-64" key={crousel.id}>
          <LLImage
            image={crousel.image}
            alt={crousel.title}
            className={"h-64"}
          />
        </div>
      ))}
    </div>
  );
};

export default Crousel;
