import * as React from 'react'

import Katex from '@/components/KatexReact'
import { getBlockTitle } from 'notion-utils'

const katexSettings = {
  throwOnError: false,
  strict: false
}

/**
 * 数学公式
 * @param {} param0
 * @returns
 */
export const Equation = ({ block, math, inline = false, className, ...rest }) => {
 /* math = math || getBlockTitle(block, null)
  if (!math) return null */

  // 1. 优先尝试直接从 block 属性中提取纯文本，跳过可能包含图片的 getBlockTitle
  const rawTitle = block?.properties?.title?.[0]?.[0]
  
  // 2. 依次尝试：传入的 math > 原始标题文本 > getBlockTitle 兜底
  math = math || (typeof rawTitle === 'string' ? rawTitle : null) || getBlockTitle(block, null)

  // 3. 严格过滤非字符串和 Notion 的错误占位符
  if (!math || typeof math !== 'string' || math === 'notion image') {
    return null
  }

  return (
    <span
      role='button'
      tabIndex={0}
      className={`notion-equation ${inline ? 'notion-equation-inline' : 'notion-equation-block'}`}
    >
      <Katex math={math} settings={katexSettings} {...rest} />
    </span>
  )
}
