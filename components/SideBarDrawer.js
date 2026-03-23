import { useRouter } from 'next/router'
import { useEffect } from 'react'

/**
 * 侧边栏抽屉面板，可以从侧面拉出 (全局通用版)
 * @returns {JSX.Element}
 * @constructor
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

  // ⭐️ 修复核心：更加稳健的状态同步逻辑
  const switchSideDrawerVisible = showStatus => {
    // 1. 先触发父组件的状态更新
    if (showStatus) {
      onOpen && onOpen()
    } else {
      onClose && onClose()
    }
    
    // 2. 稳健的 DOM 操作，抛弃 replace，改用 remove/add
    const sideBarDrawer = window.document.getElementById('sidebar-drawer')
    const sideBarDrawerBackground = window.document.getElementById(
      'sidebar-drawer-background'
    )

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
      
      {/* 侧边栏主体：z-50 保持最高层级 */}
      <div
        id='sidebar-drawer'
        className={`z-50 ${className} ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-[-100%] opacity-0'} transform transition-transform duration-300 ease-in-out bg-white dark:bg-gray-900 flex flex-col fixed h-full left-0 overflow-y-scroll top-0`}
      >
        {children}
      </div>

      {/* ⭐️ 背景蒙版：增加滑动事件、提升层级、铺满全屏 */}
      <div
        id='sidebar-drawer-background'
        // 点击蒙版关闭
        onClick={() => switchSideDrawerVisible(false)}
        // 手机端滑动蒙版关闭
        onTouchMove={(e) => {
            e.preventDefault(); // 防止穿透滑动到底层页面
            switchSideDrawerVisible(false);
        }}
        // 改为 inset-0 全屏铺满，z-40 确保盖住底层网页，但位于菜单(z-50)下方
        className={`${isOpen ? 'block' : 'hidden'} fixed inset-0 z-40 w-full h-full bg-black/70 transition-opacity duration-300 cursor-pointer`}
      />
    </div>
  )
}

export default SideBarDrawer
