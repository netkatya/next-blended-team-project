import GridItem from "../GridItem/GridItem";

import styles from "./PhotosGalleryItem.module.css";

export default function PhotosGalleryItem() {
  return (
    <GridItem>
      <div
        className={styles.thumb}
        style={{
          backgroundColor: "avg_color",
          borderColor: "avg_color",
        }}
      >
        <img src="" alt="" />
      </div>
    </GridItem>
  );
}
