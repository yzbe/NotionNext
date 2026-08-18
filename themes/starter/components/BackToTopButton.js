import { useCallback, useEffect, useRef } from 'react'

/**
 * 回顶按钮
 * @returns
 */
export const BackToTopButton = () => {
  const rafRef = useRef(null)

  useEffect(() => {
    Math.easeInOutQuad = function (t, b, c, d) {
      t /= d / 2
      if (t < 1) return (c / 2) * t * t + b
      t--
      return (-c / 2) * (t * (t - 2) - 1) + b
    }

    window.addEventListener('scroll', navBarScollListener, { passive: true })
    return () => {
      // 组件卸载时清理动画帧，防止内存泄漏
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      window.removeEventListener('scroll', navBarScollListener)
    }
  }, [])

  // ⭐️ 修复 1：彻底抛弃 lodash.throttle，改用原生 requestAnimationFrame
  // 完美避开 Vercel 打包死锁，同时滚动检测性能大幅提升
  const navBarScollListener = useCallback(() => {
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY
        // 显示或隐藏返回顶部按钮
        const backToTop = document.querySelector('.back-to-top')
        if (backToTop) {
          backToTop.style.display = scrollY > 50 ? 'flex' : 'none'
        }
        rafRef.current = null
      })
    }
  }, [])

  // ====== scroll top js
  function scrollTo(element, to = 0, duration = 500) {
    const start = element.scrollTop
    const change = to - start
    const increment = 20
    let currentTime = 0

    const animateScroll = () => {
      currentTime += increment

      const val = Math.easeInOutQuad(currentTime, start, change, duration)

      element.scrollTop = val

      if (currentTime < duration) {
        setTimeout(animateScroll, increment)
      }
    }

    animateScroll()
  }

  function scrollTop() {
    if (document) {
      scrollTo(document.documentElement)
    }
  }

  return (
    <>
      {/* <!-- ====== Back To Top Start --> */}
      <a
        onClick={scrollTop}
        className='back-to-top cursor-pointer fixed bottom-16 left-auto right-8 z-[999] hidden h-10 w-10 items-center justify-center rounded-md bg-primary text-white shadow-md transition duration-300 ease-in-out hover:bg-dark'>
        
        {/* ⭐️ 修复 2：删掉了导致下沉的 mt-[6px]，由于旋转45度后的折线光学重心偏上，使用 translate-y-[2px] 进行微妙的视觉补齐，达到绝对完美的中心感 */}
        <span className='h-3 w-3 translate-y-[2px] rotate-45 border-l border-t border-white'></span>
      </a>
      {/* <!-- ====== Back To Top End --> */}
    </>
  )
}