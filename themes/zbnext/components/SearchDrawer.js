import { Router } from 'next/router'
import { useImperativeHandle, useRef, useEffect } from 'react'
import SearchInput from './SearchInput'

const SearchDrawer = ({ cRef, slot }) => {
  const searchDrawer = useRef()
  const searchInputRef = useRef()

  // ⭐️ 黄金标准：用固定定位锁死背景，防止 iOS 弹出键盘时页面乱跳、露底
  const lockScroll = () => {
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'
    document.body.dataset.scrollX = scrollY
  }

  const unlockScroll = () => {
    const scrollY = parseInt(document.body.dataset.scrollX || '0', 10)
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.left = ''
    document.body.style.right = ''
    document.body.style.width = ''
    window.scrollTo(0, scrollY)
  }

  useImperativeHandle(cRef, () => {
    return {
      show: () => {
        searchDrawer?.current?.classList?.remove('hidden')
        searchInputRef?.current?.focus()
        lockScroll()
      }
    }
  })

  const hidden = () => {
    searchDrawer?.current?.classList?.add('hidden')
    unlockScroll()
  }

  useEffect(() => {
    const handleRouteChange = () => hidden()
    Router.events.on('routeChangeComplete', handleRouteChange)
    
    // 支持按 Esc 键关闭
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') hidden()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
      window.removeEventListener('keydown', handleKeyDown)
      unlockScroll()
    }
  }, [])

  return (
    <div id='search-drawer-wrapper' ref={searchDrawer} className='hidden'>
      {/* 
        ⭐️ 核心改动：
        1. overflow-hidden：切断内部任何可能的滚动条。
        2. touch-none：剥夺手指在浮层内的滑动与橡皮筋回弹权限，将其变为真正的静态固定页面。
      */}
      <div className='flex-col fixed inset-0 pt-14 px-5 z-40 justify-start overflow-hidden touch-none pb-20'>
          <div className='md:max-w-3xl w-full mx-auto animate__animated animate__faster animate__fadeIn'>
            <SearchInput cRef={searchInputRef} />
            
            {/* 搜索结果插槽（如果该组件有传入其他提示或快捷标签） */}
            {slot}

            {/* 退出/关闭按钮 */}
            <div className='flex justify-center mt-10 animate__animated animate__fadeInUp animate__faster'>
                <button 
                    onClick={hidden}
                    className='group flex items-center justify-center w-12 h-12 p-0 rounded-full 
                               bg-white/80 dark:bg-hexo-black-gray/80 backdrop-blur-md
                               border border-gray-200 dark:border-gray-700
                               shadow-lg transition-all duration-300
                               hover:scale-110 active:scale-95'
                >
                    <i className='fas fa-times text-gray-500 dark:text-gray-400 group-hover:text-red-500 transition-colors text-xl leading-none' />
                </button>
            </div>
          </div>
      </div>

      {/* 背景蒙版：使用 scale-[200%] 扩大 2 倍，确保在手机虚拟键盘弹起压缩视口时也绝对不会边缘漏白 */}
      <div 
        id='search-drawer-background' 
        onClick={hidden} 
        className='animate__animated animate__faster animate__fadeIn fixed bg-day dark:bg-night inset-0 z-30 scale-[200%]' 
      />
    </div>
  )
}

export default SearchDrawer