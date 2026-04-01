import { useState, useEffect, useCallback } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Input, Checkbox, Modal, message } from "antd"
import { PhoneOutlined, SafetyCertificateOutlined } from "@ant-design/icons"
import { getLoginSendSms, loginSystem, checkUserInfo } from "@/api/dishwasher"
import { loginByCode, getLoginSendSmsInApp } from "@/api/public"
import { useAppStore } from "@/store"
import { getRedirectPath } from "@/utils/getMenuPermission"
import Footer from "@/components/Footer"
import toast from "@/components/Toast"
import headLogo from "@/assets/images/headLogo.png"
import styles from "./userLogin.module.scss"

export default function UserLogin() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const store = useAppStore()

  const [phone, setPhone] = useState("")
  const [code, setCode] = useState("")
  const [checkedAgree, setCheckedAgree] = useState(false)
  const [isCounting, setIsCounting] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [dialogVisible, setDialogVisible] = useState(false)
  const [needAppToken, setNeedAppToken] = useState(false)
  const appToken = localStorage.getItem("INTERNAL_APP_TOKEN")

  const regMobilePhone = /^1\d{10}$/

  const readAgreement = () => {
    window.open("/agreementFile", "_blank")
  }

  const onNumberFinish = () => {
    if (!phone) {
      toast.show("请输入手机号")
      return false
    }
    if (!regMobilePhone.test(phone)) {
      toast.show("请填写正确的手机号")
      return false
    }
    return true
  }

  const startCountdown = useCallback(() => {
    setIsCounting(true)
    setCountdown(60)
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setIsCounting(false)
          return 60
        }
        return prev - 1
      })
    }, 1000)
  }, [])

  const getLoginCode = () => {
    if (!onNumberFinish()) return
    const sendSms = needAppToken
      ? getLoginSendSmsInApp({ phone }, appToken)
      : getLoginSendSms({ phone })

    sendSms
      .then(() => {
        toast.show("验证码发送成功!")
        startCountdown()
      })
      .catch((err: string) => message.error(err))
  }

  const getCheckUserInfo = async () => {
    try {
      const res: any = await checkUserInfo({})
      localStorage.setItem("userName", res.phone)
      localStorage.setItem("userUnionId", res.union_id)
    } catch (err: any) {
      message.error(err)
    }
  }

  const handleLoginSuccess = async (token: string) => {
    localStorage.setItem("userToken", token)
    await getCheckUserInfo()
    await store.getUserMenuPermissions()
    await store.getIsIntelligentWashUser()
    const redirect = getRedirectPath(useAppStore.getState().menuPermission)
    if (redirect) {
      navigate(redirect, { replace: true })
    }
  }

  const logInCheck = () => {
    if (!onNumberFinish()) return
    if (!code) { toast.show("请输入验证码"); return }
    if (code.length !== 6) { toast.show("验证码错误，请重新输入"); return }
    if (!checkedAgree) { setDialogVisible(true); return }

    const loginFn = needAppToken
      ? loginByCode({ auth_code: searchParams.get("code"), phone, sms_code: code }, appToken)
      : loginSystem({ phone, sms_code: code })

    loginFn
      .then(async (res: any) => handleLoginSuccess(res.token))
      .catch((err: string) => message.error(err))
  }

  useEffect(() => {
    if (searchParams.get("app_token")) {
      store.setLoading(true)
    }
    if (searchParams.get("code")) {
      loginByCode({ auth_code: searchParams.get("code") }, appToken)
        .then(async (res: any) => {
          if (res.error_code === "PassportNotBindPhone") {
            message.warning("请使用手机号验证码登录")
            setNeedAppToken(true)
          } else {
            await handleLoginSuccess(res.token)
          }
        })
        .catch((err: string) => message.error(err))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className={styles.loginContainer}>
        <div className={styles.loginHead}>
          <img width={104} height={32} src={headLogo} alt="logo" />
        </div>
        <div className={styles.loginBgBox}>
          <div className={styles.loginForm}>
            <Input
              className={styles.formAccount}
              maxLength={11}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="手机号"
              prefix={<PhoneOutlined style={{ padding: "0 10px" }} />}
            />
            <Input
              className={styles.formCode}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="验证码"
              prefix={<SafetyCertificateOutlined style={{ padding: "0 10px" }} />}
              suffix={
                <span
                  className={styles.codeStyle}
                  onClick={() => !isCounting && getLoginCode()}
                  style={{ cursor: isCounting ? "default" : "pointer" }}
                >
                  {isCounting ? `${countdown} s` : "获取验证码"}
                </span>
              }
            />
            <Checkbox
              className={styles.formChecked}
              checked={checkedAgree}
              onChange={(e) => setCheckedAgree(e.target.checked)}
            >
              <span className={styles.formCheckedText}>
                <span className={styles.formCheckedTextSpan1}>阅读并同意</span>
                <span className={styles.formCheckedTextSpan2} onClick={(e) => { e.stopPropagation(); readAgreement() }}>
                  《厨芯用户服务协议&厨芯隐私政策》
                </span>
              </span>
            </Checkbox>
            <div className={styles.logInBtn} onClick={logInCheck}>
              登 录
            </div>
          </div>
          <Footer backgroundColor="rgba(255,255,255,0.6)" />
        </div>
      </div>
      <Modal
        open={dialogVisible}
        title="阅读并同意以下条款"
        width={480}
        onCancel={() => setDialogVisible(false)}
        onOk={() => { setDialogVisible(false); setCheckedAgree(true) }}
        okText="同意并继续"
      >
        <p className={styles.dialogText} onClick={readAgreement}>
          《厨芯用户服务协议&厨芯隐私政策》
        </p>
      </Modal>
    </>
  )
}
