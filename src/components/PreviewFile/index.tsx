import { useState, useEffect } from "react"
import { Modal, Image, Spin } from "antd"
import { DeleteOutlined, ZoomInOutlined, LoadingOutlined } from "@ant-design/icons"
import icVideoPlay from "@/assets/images/ic_videoPlay.png"
import styles from "./previewFile.module.scss"

interface PreviewFileProps {
  src: string
  fileType: "image" | "video"
  videoType?: string
  width?: string
  height?: string
  needMask?: boolean
  canDelete?: boolean
  onDelete?: () => void
}

export default function PreviewFile({
  src,
  fileType,
  videoType = "video/mp4",
  width = "64px",
  height = "64px",
  needMask = false,
  canDelete = false,
  onDelete,
}: PreviewFileProps) {
  const [showDialog, setShowDialog] = useState(false)
  const [fileUrl, setFileUrl] = useState("")
  const [loadingVideo, setLoadingVideo] = useState(false)
  const imgToken = localStorage.getItem("imgToken")

  useEffect(() => {
    if (src) setFileUrl(`${src}&it=${imgToken}`)
  }, [src, imgToken])

  const showPreview = () => {
    if (!fileUrl) return
    setShowDialog(true)
  }

  return (
    <>
      <div
        className={`${styles.thumbnailPreview} ${!fileUrl ? styles.isEmpty : ""} ${needMask && fileUrl ? styles.hasMask : ""}`}
        style={{ width, height, border: fileUrl ? undefined : "none" }}
        onClick={showPreview}
      >
        {canDelete && fileUrl && (
          <div className={styles.deleteMask} onClick={(e) => e.stopPropagation()}>
            <div className={styles.iconGroup}>
              <ZoomInOutlined className={styles.previewIcon} onClick={showPreview} />
              <DeleteOutlined className={styles.deleteIcon} onClick={onDelete} />
            </div>
          </div>
        )}
        {fileUrl ? (
          fileType === "image" ? (
            <Image src={fileUrl} preview={false} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div className={styles.videoThumbnail}>
              <video
                className={styles.videoThumb}
                onLoadStart={() => setLoadingVideo(true)}
                onCanPlay={() => setLoadingVideo(false)}
              >
                <source src={fileUrl} type={videoType} />
              </video>
              {loadingVideo ? (
                <div className={styles.videoLoading}>
                  <Spin indicator={<LoadingOutlined style={{ fontSize: 16, color: "#fff" }} />} />
                </div>
              ) : (
                <img width={24} className={styles.playIcon} src={icVideoPlay} alt="play" />
              )}
            </div>
          )
        ) : (
          <div className={styles.nodataClass}> - </div>
        )}
      </div>
      <Modal
        open={showDialog}
        title={fileType === "image" ? "菜品图片预览" : "制作视频预览"}
        footer={null}
        width="70%"
        onCancel={() => setShowDialog(false)}
        destroyOnClose
      >
        {fileType === "image" ? (
          <div className={styles.previewContainer}>
            <Image src={fileUrl} style={{ width: "100%", maxHeight: "70vh" }} />
          </div>
        ) : (
          <video controls className={styles.previewVideo}>
            <source src={fileUrl} type={videoType} />
            当前浏览器不支持视频播放
          </video>
        )}
      </Modal>
    </>
  )
}
