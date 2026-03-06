import * as React from 'react'
import Katex from '@/components/KatexReact'
import { getBlockTitle } from 'notion-utils'

const katexSettings = {
  throwOnError: false,
  strict: false
}

/**
 * 数学公式组件
 * 修复了 Notion 块级公式被识别为图片导致的渲染异常问题
 */
export const Equation = ({ block, math, inline = false, className, ...rest }) => {
  // 1. 核心修复：强制获取最原始的 LaTeX 字符串
  // 直接访问 block.properties.title，这是绕过 Notion 图片占位符的关键
  const rawTitle = block?.properties?.title?.[0]?.[0]
  
  // 优先级：外部传入 math > 原始 title 属性 > getBlockTitle 兜底
  let finalMath = math || (typeof rawTitle === 'string' ? rawTitle : null) || getBlockTitle(block, null)

  // 2. 垃圾数据过滤：拦截失效的图片占位符文本
  if (!finalMath || typeof finalMath !== 'string' || finalMath.includes('notion image')) {
    return null
  }

  // 3. 渲染逻辑
  // 行内模式：返回 span
  if (inline) {
    return (
      <span className={`notion-equation notion-equation-inline ${className || ''}`}>
        <Katex math={finalMath} settings={katexSettings} {...rest} />
      </span>
    )
  }

  // 块级模式：返回居中的 div 容器
  return (
    <div className={`notion-equation notion-equation-block w-full text-center my-6 py-2 overflow-x-auto ${className || ''}`}>
      <Katex 
        math={finalMath} 
        settings={{ ...katexSettings, displayMode: true }} 
        {...rest} 
      />
    </div>
  )
}
