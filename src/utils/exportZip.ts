interface exportProps {
  data: BlobPart
  name?: string
}
export function exportZip({ data, name = 'sdk.zip' }: exportProps) {
  const blob = new Blob([data])
  const fileName = name
  if ('download' in document.createElement('a')) {
    // 非IE下载
    const elink = document.createElement('a')
    elink.download = fileName
    elink.style.display = 'none'
    elink.href = URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href) // 释放URL 对象
    document.body.removeChild(elink)
  }
  else {
    window.$Toast.show('浏览器不支持下载')
  }
}
