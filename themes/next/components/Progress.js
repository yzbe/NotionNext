import { useEffect, useState } from 'react'
import { isBrowser } from '@/lib/utils'

/**
 * 顶部页面阅读进度条
 * @returns {JSX.Element}
 * @constructor
 */
const Progress = ({ targetRef, showPercent = true }) => {
  const currentRef = targetRef?.current || targetRef
  const [percent, changePercent] = useState(0)
  const scrollListener = () => {
    const target = currentRef || (isBrowser && document.getElementById('article-wrapper'))
    if (target) {
      const clientHeight = target.clientHeight
      const scrollY = window.pageYOffset
      const fullHeight = clientHeight - window.outerHeight
      let per = parseFloat(((scrollY / fullHeight) * 100).toFixed(0))
      if (per > 100) per = 100
      if (per < 0) per = 0
      changePercent(per)
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', scrollListener)
    return () => document.removeEventListener('scroll', scrollListener)
  }, [])

  return (
    // ⭐️ 核心修改 1：外层底槽
    // 去掉了过于突兀的 shadow-2xl，改为内阴影 shadow-inner，加上 rounded-full 和 overflow-hidden 变成完美药丸形
    // 增加了夜间模式底色 dark:bg-gray-700
    <div className="h-4 w-full shadow-inner bg-gray-400 dark:bg-gray-700 rounded-full overflow-hidden">
      <div
        // ⭐️ 核心修改 2：内层进度条
        // 同步加上 rounded-full，以及夜间模式的浅灰色 dark:bg-gray-400
        // 改用 flex 布局让内部数字完美垂直居中
        className="h-4 bg-gray-600 dark:bg-gray-400 duration-200 rounded-full flex items-center justify-end"
        style={{ width: `${percent}%` }}
      >
        {showPercent && (
          // ⭐️ 核心修改 3：数字排版优化
          // 加了 pr-2（右内边距）防止数字紧贴圆角边缘，并适配了夜间模式的深色字体
          <div className="text-white dark:text-gray-900 text-[10px] font-bold pr-2">
            {percent}%
          </div>
        )}
      </div>
    </div>
  )
}

export default Progress
