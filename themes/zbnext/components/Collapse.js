import { useEffect, useImperativeHandle, useRef } from 'react'

/**
 * 折叠面板组件，支持水平折叠、垂直折叠
 * @param {type:['horizontal','vertical'], isOpen} props
 * @returns
 */
const Collapse = ({
  type = 'vertical',
  isOpen = false,
  children,
  onHeightChange,
  className,
  collapseRef
}) => {
  const ref = useRef(null)

  useImperativeHandle(collapseRef, () => {
    return {
      updateCollapseHeight: ({ height, increase }) => {
        if (isOpen) {
          ref.current.style.height = ref.current.scrollHeight + 'px'
          ref.current.style.height = 'auto'
        }
      }
    }
  })

  /**
   * 折叠
   */
  const collapseSection = element => {
    if (!element) return
    const sectionHeight = element.scrollHeight
    const sectionWidth = element.scrollWidth

    requestAnimationFrame(function () {
      switch (type) {
        case 'horizontal':
          element.style.width = sectionWidth + 'px'
          requestAnimationFrame(function () {
            element.style.width = 0 + 'px'
          })
          break
        case 'vertical':
          element.style.height = sectionHeight + 'px'
          requestAnimationFrame(function () {
            element.style.height = 0 + 'px'
          })
      }
    })
  }

  /**
   * 展开
   */
  const expandSection = element => {
    if (!element) return
    const sectionHeight = element.scrollHeight
    const sectionWidth = element.scrollWidth
    let clearTime = 0
    switch (type) {
      case 'horizontal':
        element.style.width = sectionWidth + 'px'
        clearTime = setTimeout(() => {
          element.style.width = 'auto'
        }, 500) // ⭐️ 配合动画时长延长到 500ms
        break
      case 'vertical':
        element.style.height = sectionHeight + 'px'
        clearTime = setTimeout(() => {
          element.style.height = 'auto'
        }, 500) // ⭐️ 配合动画时长延长到 500ms
    }

    return () => clearTimeout(clearTime)
  }

  useEffect(() => {
    if (isOpen) {
      expandSection(ref.current)
    } else {
      collapseSection(ref.current)
    }
    onHeightChange &&
      onHeightChange({
        height: ref.current?.scrollHeight,
        increase: isOpen
      })
  }, [isOpen])

  return (
    <div
      ref={ref}
      style={
        type === 'vertical'
          ? { height: '0px', willChange: 'height' }
          : { width: '0px', willChange: 'width' }
      }
      // 1. duration-500：把速度放慢到 500 毫秒，告别闪现的生硬感。
      // 2. ease-in-out：加入平滑的缓动函数，让起步和收尾都有细腻的缓冲。
      className={`${className || ''} overflow-hidden transition-all duration-500 ease-in-out`}>
      {children}
    </div>
  )
}

export default Collapse