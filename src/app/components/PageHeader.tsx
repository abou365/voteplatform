import Image from "next/image";
import styles from "./PageHeader.module.css";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  image: string;
}

export default function PageHeader({ title, subtitle, image }: PageHeaderProps) {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.bgImage}>
        <Image src={image} alt="" fill priority style={{ objectFit: "cover" }} />
        <div className={styles.overlay} />
      </div>
      <div className={styles.headerContent}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </div>
  );
} 