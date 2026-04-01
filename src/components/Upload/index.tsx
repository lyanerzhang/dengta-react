import { ReactNode, useRef } from "react"
import { Upload as AntdUpload, message } from "antd"
import type { UploadFile, UploadProps } from "antd"
import uploadFile from "@/utils/uploadFile"

interface UploadComponentProps {
  path?: string
  value?: string[]
  onChange?: (urls: string[]) => void
  onUploadSuccess?: (urls: string[]) => void
  multiple?: boolean
  limit?: number
  accept?: string
  disabled?: boolean
  children?: ReactNode
}

export default function Upload({
  path = "default/",
  multiple = false,
  limit = 1,
  accept = ".jpg,.png,.jpeg",
  disabled = false,
  onUploadSuccess,
  children,
}: UploadComponentProps) {
  const uploadingRef = useRef(false)

  const handleChange: UploadProps["onChange"] = async (info) => {
    if (uploadingRef.current) return

    const fileList = info.fileList
      .filter((f) => f.originFileObj)
      .map((f) => ({
        raw: f.originFileObj as File,
        size: f.size || 0,
        name: `${Date.now()}${(f.name || "").substring((f.name || "").lastIndexOf("."))}`,
      }))

    if (fileList.length === 0) return

    uploadingRef.current = true
    try {
      const res = await uploadFile(fileList, "", path)
      onUploadSuccess?.(res)
    } finally {
      uploadingRef.current = false
    }
  }

  const handleExceed = () => {
    message.warning("超出数量限制")
  }

  const beforeUpload = (_file: File, fileList: File[]) => {
    if (limit && fileList.length > limit) {
      handleExceed()
      return false
    }
    return false
  }

  return (
    <AntdUpload
      onChange={handleChange}
      beforeUpload={beforeUpload}
      showUploadList={false}
      multiple={multiple}
      maxCount={limit}
      accept={accept}
      disabled={disabled}
    >
      {children}
    </AntdUpload>
  )
}
