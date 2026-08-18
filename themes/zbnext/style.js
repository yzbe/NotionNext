/* eslint-disable react/no-unknown-property */
import CONFIG from './config'
import { themeConsoleStyle } from '@/lib/themeConsoleStyle'
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  return (
    <style jsx global>{`
      /* ⭐️ 终极镇压方案：使用最高权重选择器 (html.dark + #ID) 强制覆盖 */
      
      /* 1. 强制重写全局变量与最底层背景 */
      html.dark, 
      html.dark body,
      html.dark #theme-next,
      html.dark #theme-zbnext {
        --next-console-card: #1e1e1e !important;
        --next-console-bg: #121212 !important;
        --next-console-border: #333333 !important;
        background-color: #121212 !important;
      }

      /* 2. 暴力击穿所有漏网的卡片（利用属性选择器，无视原本类名） */
      html.dark #theme-next .bg-white,
      html.dark #theme-next [class*="bg-hexo-black-gray"],
      html.dark #theme-next [class*="bg-gray-800"],
      html.dark #theme-next [class*="bg-gray-900"] {
        background-color: #1e1e1e !important;
        border-color: #333333 !important;
      }

      // 日间底色
      body {
        background-color: #eeedee;
      }

      // 菜单下划线动画
      #theme-next .menu-link {
        text-decoration: none;
        background-image: linear-gradient(#4e80ee, #4e80ee);
        background-repeat: no-repeat;
        background-position: bottom center;
        background-size: 0 2px;
        transition: background-size 100ms ease-in-out;
      }
      #theme-next .menu-link:hover {
        background-size: 100% 2px;
        color: #4e80ee;
      }

      ${themeConsoleStyle('next', CONFIG)}
  `}</style>
  )
}

export { Style }