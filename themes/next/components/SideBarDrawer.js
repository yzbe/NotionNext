import SideBar from './SideBar'
import { useRouter } from 'next/router'
import { useEffect, useImperativeHandle } from 'react'

/**
 * 侧边栏抽屉面板，可以从侧面拉出
 */
const SideBarDrawer = ({ post, cRef, tags, slot, categories, currentCategory }) => {
  useImperativeHandle(cRef, () => {
    return {
      handleSwitchSideDrawerVisible: () => switchSideDrawerVisible(true)
    }
  })

  useEffect(() => {
    const sideBarWrapperElement = document.getElementById('sidebar-wrapper')
    sideBarWrapperElement?.classList?.remove('hidden')
  }, [])

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

  // 恢复原版兼容性最高的替换逻辑
  const switchSideDrawerVisible = (showStatus) => {
    const sideBarDrawer = window.document.getElementById('sidebar-drawer')
    const sideBarDrawerBackground = window.document.getElementById('sidebar-drawer-background')

    if (showStatus) {
      sideBarDrawer?.classList.replace('-ml-80', 'ml-0')
      sideBarDrawerBackground?.classList.replace('hidden', 'block')
    } else {
      sideBarDrawer?.classList.replace('ml-0', '-ml-80')
      sideBarDrawerBackground?.classList.replace('block', 'hidden')
    }
  }

  return (
    <div id='sidebar-wrapper' className='hidden'>
      
      {/* 侧边栏主体：保持层级最高 */}
      <div id='sidebar-drawer' className='-ml-80 w-80 bg-white dark:bg-gray-900 flex flex-col duration-300 fixed h-full left-0 overflow-y-scroll scroll-hidden top-0 z-50'>
        <SideBar tags={tags} post={post} slot={slot} categories={categories} currentCategory={currentCategory} />
      </div>
      
      {/* ⭐️ 核心修改点：全屏背景蒙版 */}
      <div 
        id='sidebar-drawer-background' 
        // 1. 鼠标点击触发关闭
        onClick={() => switchSideDrawerVisible(false)} 
        // 2. 手机端：手指刚刚碰到屏幕就触发关闭（比 onClick 响应更快）
        onTouchStart={() => switchSideDrawerVisible(false)}
        // 3. 手机端：手指在区域内滑动触发关闭
        onTouchMove={(e) => {
            e.preventDefault(); // 防止穿透滑动后面的网页内容
            switchSideDrawerVisible(false)
        }}
        // 使用 inset-0 强制铺满全屏，确保能捕捉到所有空白区域的动作
        className='hidden fixed inset-0 z-40 bg-black/40 dark:bg-black/60 cursor-pointer pointer-events-auto transition-opacity duration-300' 
      />

    </div>
  )
}

export default SideBarDrawer
