import styles from "./Map.module.scss";

const Map = () => {
  return (
    <div className={styles.mapContainer}>
      <iframe
        className={styles.mapFrame}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.7220104832134!2d126.97865237663997!3d37.56653597979857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2eab31a52d9%3A0x7b446f6a45e2a30!2sSeoul%2C%20South%20Korea!5e0!3m2!1sen!2skr!4v1707738212345"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
