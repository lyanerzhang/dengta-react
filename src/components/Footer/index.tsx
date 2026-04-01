import styles from "./footer.module.scss"

interface FooterProps {
  backgroundColor?: string
}

export default function Footer({ backgroundColor = "transparent" }: FooterProps) {
  return (
    <div className={styles.footerContent} style={{ background: backgroundColor }}>
      <span className={styles.infoText}>苏ICP备2023019770号-7</span>
    </div>
  )
}
