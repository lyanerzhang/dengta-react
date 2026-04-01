import { PlusOutlined } from "@ant-design/icons"
import styles from "./dottedButton.module.scss"

interface DottedButtonProps {
  text?: string
  onClick?: () => void
}

export default function DottedButton({ text = "添加", onClick }: DottedButtonProps) {
  return (
    <div className={styles.dottedButton} onClick={onClick}>
      <PlusOutlined style={{ fontSize: 14 }} />
      <span style={{ marginLeft: 8 }}>{text}</span>
    </div>
  )
}
