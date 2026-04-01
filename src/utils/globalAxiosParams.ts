import { md5 } from "js-md5"

function getBrowserInfo() {
  let platform: string | null = null
  if (navigator.platform) {
    platform = navigator.platform
  } else {
    platform = (navigator as any)?.userAgentData?.platform
  }
  const browserInfo = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform,
  }
  return md5(JSON.stringify(browserInfo))
}

const globalAxiosParams = {
  bi: getBrowserInfo(),
}

export default globalAxiosParams
