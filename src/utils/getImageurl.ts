const imgBaseUrl = `../assets/images`
const imgBaseModule = import.meta.glob<true, string, any>('../assets/images/**', { eager: true })
export function getImageurl(imgName: string) {
  // console.log('imgBaseModule', imgName, imgBaseModule)
  const url = imgBaseModule[`${imgBaseUrl}/${imgName}`]?.default
  // console.log(2222, url)
  return url
}
