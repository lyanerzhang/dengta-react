import { useEffect, useRef, useState } from "react"
import { Badge, Modal, Tooltip, message } from "antd"
import { BellOutlined, CloseOutlined } from "@ant-design/icons"
import { getMessageList, markMessageRead } from "@/api/pco"
import styles from "./pcoTipPopup.module.scss"

function formatMsgDate(dateStr: string) {
  if (!dateStr || typeof dateStr !== "string") return dateStr
  const datePart = dateStr.slice(0, 10)
  const parts = datePart.split("-")
  const y = parts[0]
  const m = parts[1] ? String(parseInt(parts[1], 10)) : ""
  const d = parts[2] ? String(parseInt(parts[2], 10)) : ""
  return `${y}年${m}月${d}日`
}

export default function PcoTipPopup() {
  const [open, setOpen] = useState(false)
  const [hasUnread, setHasUnread] = useState(false)
  const [list, setList] = useState<any[]>([])
  const workerRef = useRef<Worker | null>(null)

  const fetchList = () => {
    getMessageList({})
      .then((res: any) => {
        setHasUnread(!!res?.has_unread)
        setList(res?.list ?? [])
      })
      .catch((err: any) => message.error(typeof err === "string" ? err : "获取消息失败"))
  }

  const clearUnread = (msgId: string, markAll = false) => {
    if (markAll && !list.length) return
    markMessageRead({
      mark_all: markAll,
      msg_id: markAll ? list[0]?.msg_id : msgId,
    } as any)
      .then(() => fetchList())
      .catch((err: any) => message.error(typeof err === "string" ? err : "操作失败"))
  }

  useEffect(() => {
    fetchList()
    const code = `
      let lastTriggerDate = 0;
      addEventListener('message', function(e) {
        if (e.data === 'start') {
          checkTime();
          setInterval(checkTime, 300000);
        }
      });
      function checkTime() {
        const now = new Date();
        const currentDay = now.getDate();
        const targetHour = 10;
        if (currentDay === 1) lastTriggerDate = 0;
        if (now.getHours() === targetHour && now.getMinutes() === 0) {
          triggerFetch(now, currentDay);
          return;
        }
        const isPastTarget = now.getHours() > targetHour || (now.getHours() === targetHour && now.getMinutes() > 0);
        if (isPastTarget) triggerFetch(now, currentDay);
      }
      function triggerFetch(now, currentDay) {
        if (lastTriggerDate === currentDay) return;
        postMessage('fetchMessage');
        lastTriggerDate = currentDay;
      }
    `
    try {
      const blob = new Blob([code], { type: "application/javascript" })
      const w = new Worker(URL.createObjectURL(blob))
      workerRef.current = w
      w.onmessage = (e) => {
        if (e.data === "fetchMessage") fetchList()
      }
      w.postMessage("start")
    } catch {
      /* ignore */
    }
    return () => {
      workerRef.current?.terminate()
      workerRef.current = null
    }
  }, [])

  return (
    <div className={styles.tipPopup}>
      <Tooltip title="消息中心" placement="bottom">
        <Badge dot={hasUnread}>
          <BellOutlined className={styles.bellIcon} onClick={() => setOpen(true)} />
        </Badge>
      </Tooltip>
      <Modal
        title={null}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={800}
        destroyOnClose
        styles={{ body: { padding: 0 } }}
        closable={false}
      >
        <div className={styles.dialogTitle}>
          <span className={styles.titleClass}>消息中心</span>
          <span
            className={styles.hasRead}
            style={{ opacity: hasUnread ? 1 : 0.45 }}
            onClick={() => hasUnread && clearUnread("", true)}
          >
            全部已读
          </span>
          <CloseOutlined className={styles.closeIcon} onClick={() => setOpen(false)} />
        </div>
        <div className={styles.scrollBody}>
          {list.map((item, index) => (
            <div
              key={item.msg_id ?? index}
              className={styles.tipItem}
              onClick={() => !item.is_read && clearUnread(item.msg_id, false)}
            >
              <p className={styles.storeName}>{item.store_name}</p>
              <div className={styles.tipContent}>
                <span style={{ marginRight: 10 }}>{formatMsgDate(item.msg_create_time)}</span>
                <span>{item.msg_content}</span>
              </div>
              {!item.is_read && <p className={styles.redDot} />}
            </div>
          ))}
          <p className={styles.bottomTip}>到底了~</p>
        </div>
      </Modal>
    </div>
  )
}
