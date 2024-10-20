import styles from "./ProductDescription.module.css";

export default function ProductDescription() {
  return (
    <div className={styles.descriptionContainer}>
      <div className={styles.buttons}>
        <button>Description</button>
        <button>Additional Info</button>
        <button>Reviews</button>
        <button>Video</button>
      </div>
      <div className={styles.descriptionDetails}>
        <h1>Varius tempor.</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac quam
          dolor. In dignissim lectus sed nisl tempor, ac porttitor libero
          consectetur. Pellentesque diam dolor, tincidunt nec ante congue,
          tincidunt facilisis tortor. Mauris vitae massa molestie, sagittis
          ligula vel, egestas massa. Phasellus quis sodales augue. Donec nec
          ultricies diam. Integer feugiat odio ut dictum viverra. Donec vehicula
          nisi placerat cursus mollis. Nunc aliquam tempor justo, ut sagittis
          nisi. Mauris ullamcorper quis nisl sed dictum. Maecenas quam risus,
          congue quis accumsan at, imperdiet sed lectus. Aliquam in est purus
        </p>
        <h1>More details</h1>
        <ul>
          <li>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac
            quam dolor. In dignissim lectus sed nisl tempor, ac porttitor libero
            consectetur.
          </li>
          <li>
            Cras ac quam dolor. In dignissim lectus sed nisl tempor, ac
            porttitor libero consectetur. Pellentesque diam dolor, tincidunt nec
            ante.
          </li>
          <li>
            Pellentesque diam dolor, tincidunt nec ante congue, tincidunt
            facilisis tortor.
          </li>
          <li>
            Mauris vitae massa molestie, sagittis ligula vel, egestas massa.
            Phasellus quis sodales augue. Donec nec ultricies diam.
          </li>
          <li>
            Phasellus quis sodales augue. Integer feugiat odio ut dictum
            viverra.
          </li>
        </ul>
      </div>
    </div>
  );
}
