export function validatorTel(_rule: any, value: string): Promise<void> {
  const regMobilePhone = /^1\d{10}$/
  if (!value) return Promise.reject(new Error("请输入手机号"))
  if (!regMobilePhone.test(value)) return Promise.reject(new Error("请填写正确的手机号"))
  return Promise.resolve()
}

export function validatorEmail(_rule: any, value: string): Promise<void> {
  const regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/
  if (value && !regEmail.test(value)) return Promise.reject(new Error("请填写正确的邮箱"))
  return Promise.resolve()
}
