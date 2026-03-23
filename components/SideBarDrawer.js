import { useRouter } from 'next/router'
import { useEffect } from 'react'

/**
 * 侧边栏抽屉面板 (全局通用版)
 */
const SideBarDrawer = ({
  children,
  isOpen,
  onOpen,
  onClose,
  className,
  showOnPC = false
}) => {
  const router = useRouter()

  useEffect(() => {
    const sideBarDrawerRouteListener = () => {
      switchSideDrawerVisible(false)
    }
    router.events.on('routeChangeComplete', sideBarDrawerRouteListener)
    return () => {
      router.events.off('routeChangeComplete', sideBarDrawerRouteListener)
    }
  }, [router.events])

  // ⭐️ 核心逻辑：通知 React 状态 + 强制接管 DOM
  const switchSideDrawerVisible = showStatus => {
    // 1. 同步 React 状态
    if (showStatus) {
      onOpen && onOpen()
    } else {
      onClose && onClose()
    }
    
    // 2. 强制 DOM 扭转
    const sideBarDrawer = window.document.getElementById('sidebar-drawer')
    const sideBarDrawerBackground = window.document.getElementById('sidebar-drawer-background')

    if (showStatus) {
      sideBarDrawer?.classList.remove('translate-x-[-100%]', 'opacity-0')
      sideBarDrawer?.classList.add('translate-x-0', 'opacity-100')
      sideBarDrawerBackground?.classList.remove('hidden')
      sideBarDrawerBackground?.classList.add('block')
    } else {
      sideBarDrawer?.classList.remove('translate-x-0', 'opacity-100')
      sideBarDrawer?.classList.add('translate-x-[-100%]', 'opacity-0')
      sideBarDrawerBackground?.classList.remove('block')
      sideBarDrawerBackground?.classList.add('hidden')
    }
  }

  return (
    <div
      id='sidebar-wrapper'
      className={`block ${showOnPC ? '' : 'lg:hidden'} top-0`}>
      
      {/* 侧边栏主体：z-50 */}
      <div
        id='sidebar-drawer'
        className={`z-50 ${className} ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-[-100%] opacity-0'} transform transition-all duration-300 ease-in-out bg-white dark:bg-gray-900 flex flex-col fixed h-full left-0 overflow-y-scroll top-0`}
      >
        {children}
      </div>

      {/* ⭐️ 背景蒙版：z-40，绑定所有可能的点击/滑动事件 */}
      <div
        id='sidebar-drawer-background'
        // 电脑端点击
        onClick={() => switchSideDrawerVisible(false)}
        // 移动端极速触摸响应 (手指刚碰到就关)
        onTouchStart={() => switchSideDrawerVisible(false)}
        // 移动端滑动响应
        onTouchMove={(e) => {
            e.preventDefault(); 
            switchSideDrawerVisible(false);
        }}
        className={`${isOpen ? 'block' : 'hidden'} fixed inset-0 z-40 w-full h-full bg-black/70 transition-opacity duration-300 cursor-pointer pointer-events-auto`}
      />
    </div>
  )
}

export default SideBarDrawer
