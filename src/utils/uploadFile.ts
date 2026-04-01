import { getAliStsToken } from "@/api/public"
import { base64ToString } from "@/utils/base64"
import OSS from "ali-oss"
import { message, notification } from "antd"

interface UploadFile {
  raw?: File
  name: string
  size: number
}

function getRepairFileName(file: UploadFile, fileName?: string): string {
  const name = fileName || file.name
  const timestamp = Date.now()
  const typeSuffix = name.substring(name.lastIndexOf("."))
  const pattern =
    /[`~!@#$%^&*()=|{}':;',\\[\].<>/?~！@#￥%……&*（）——|{}【】'；：""'。，、？•·+\s]/g
  const namePrefix = name.substring(0, name.lastIndexOf("."))
  const cleanName = `${namePrefix.replace(pattern, "")}${typeSuffix}`

  if (fileName) {
    return `${cleanName}-${Math.floor(Math.random() * 100000 + 1)}${timestamp}.${file.raw?.type.split("/")[1]}`
  }
  return `${Math.floor(Math.random() * 100000 + 1)}${timestamp}-${cleanName}`
}

async function createOSSClient(bucketName: string): Promise<OSS> {
  try {
    const res = await getAliStsToken()
    const st = JSON.parse(base64ToString(res.st))
    return new OSS({
      region: "oss-cn-beijing",
      accessKeyId: st.Credentials.AccessKeyId,
      accessKeySecret: st.Credentials.AccessKeySecret,
      stsToken: st.Credentials.SecurityToken,
      bucket: bucketName,
      secure: true,
    })
  } catch {
    notification.warning({ message: "警告", description: "获取 OSS 凭证失败" })
    throw new Error("获取 OSS 凭证失败")
  }
}

async function multipartUpload(
  file: UploadFile,
  folder: string,
  fileName: string,
  client: OSS,
  bucketName: string
): Promise<string> {
  try {
    const name = getRepairFileName(file, fileName)
    const result = await client.multipartUpload(folder + name, file.raw!, {})
    return `/api/ticket/get/aly/oss/url.json?&object_name=${result.name}&bucket_name=${bucketName}`
  } catch {
    notification.warning({
      message: "警告",
      description: `${file.name} 上传失败,请重试`,
    })
    throw new Error("上传失败")
  }
}

export default async function uploadFile(
  files: UploadFile[],
  fileName = "",
  folder = "",
  bucketName = "chuxin-dengta-pub"
): Promise<any[]> {
  if (!Array.isArray(files)) throw new Error("请上传数组类型")

  const hide = message.loading("上传中...", 0)
  try {
    const client = await createOSSClient(bucketName)
    const uploadPromises = files.map(async (file) => {
      if (file.raw) {
        return await multipartUpload(file, folder, fileName, client, bucketName)
      }
      return file
    })
    return await Promise.all(uploadPromises)
  } catch {
    notification.error({ message: "错误", description: "文件上传失败" })
    throw new Error("文件上传失败")
  } finally {
    hide()
  }
}
