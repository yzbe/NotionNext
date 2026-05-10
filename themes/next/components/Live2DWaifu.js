import Head from 'next/head'
import { useEffect } from 'react'
import { loadExternalResource } from '@/lib/utils'

export default function Live2DWife() {
  useEffect(() => {
    initLive2DWife()
  }, [])
  return <>
    <Head>
      {/* ⭐️ 核心修复 1：将错误的 SmartLink 改回标准的 link 标签 */}
      {/* ⭐️ 核心修复 2：将链接升级为支持最新图标命名的 v6.5.1 版本 */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.2.0/css/all.min.css" />
    </Head>
  </>
}

function initLive2DWife() {
  // 注意：live2d_path 参数应使用绝对路径
  const live2dPath = 'https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/'
  // const live2d_path = "/live2d-widget/";

  // 加载 waifu.css live2d.min.js waifu-tips.js
  if (screen.width >= 768) {
    Promise.all([
      loadExternalResource(live2dPath + 'waifu.css', 'css'),
      loadExternalResource(live2dPath + 'live2d.min.js', 'js'),
      loadExternalResource(live2dPath + 'waifu-tips.js', 'js')
    ]).then(() => {
      // eslint-disable-next-line no-undef
      initWidget({
        waifuPath: live2dPath + 'waifu-tips.json',
        // apiPath: "https://live2d.fghrsh.net/api/",
        cdnPath: 'https://cdn.jsdelivr.net/gh/fghrsh/live2d_api/'
      })
    })
  }
}