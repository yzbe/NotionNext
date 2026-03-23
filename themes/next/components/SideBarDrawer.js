import SideBar from './SideBar'
import { useRouter } from 'next/router'
import { useEffect, useImperativeHandle, useRef } from 'react'

/**
 * NEXT 主题：侧边栏抽屉面板
 */
const SideBarDrawer = ({ post, currentCategory, currentTag, cRef, categories, tags, slot }) => {
  // 1. 设置引用，用来精确定位侧边栏主体
  const drawerRef = useRef(null)

  useImperativeHandle(cRef, () => {
    return {
      handleSwitchSideDrawerVisible: () => switchSideDrawerVisible(true)
    }
  })

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

  // 2. NEXT 主题专属的抽屉开关逻辑
  const switchSideDrawerVisible = (showStatus) => {
    const sideBarDrawer = window.document.getElementById('sidebar-drawer')
    const sideBarDrawerBackground = window.document.getElementById('sidebar-drawer-background')

    if (showStatus) {
      sideBarDrawer?.classList.remove('-translate-x-full', 'translate-x-full')
      sideBarDrawer?.classList.add('translate-x-0')
      sideBarDrawerBackground?.classList.remove('hidden')
      sideBarDrawerBackground?.classList.add('block')
    } else {
      sideBarDrawer?.classList.remove('translate-x-0')
      // 兼容可能存在的左右滑出设定
      sideBarDrawer?.classList.add('-translate-x-full') 
      sideBarDrawerBackground?.classList.remove('block')
      sideBarDrawerBackground?.classList.add('hidden')
    }
  }

  // 3. 全局监听：不管谁挡住了事件，只要点/滑在外面就关掉
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sideBarDrawerBackground = window.document.getElementById('sidebar-drawer-background')
      if (
        sideBarDrawerBackground?.classList.contains('block') &&
        drawerRef.current &&
        !drawerRef.current.contains(event.target)
      ) {
        switchSideDrawerVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  return (
    <div id='sidebar-wrapper'>
      {/* 侧边栏主体（白底菜单部分） */}
      <div 
        ref={drawerRef}
        id='sidebar-drawer' 
        className='-translate-x-full transition-transform duration-300 fixed h-full left-0 w-72 max-w-full bg-white dark:bg-gray-900 flex flex-col overflow-y-scroll scroll-hidden top-0 z-50 shadow-2xl'
      >
        <SideBar tags={tags} post={post} slot={slot} categories={categories} currentCategory={currentCategory} currentTag={currentTag} />
      </div>

      {/* ⭐️ 背景蒙版：支持点击、滑动关闭 */}
      <div 
        id='sidebar-drawer-background' 
        onClick={() => switchSideDrawerVisible(false)}
        onTouchMove={(e) => { 
            e.preventDefault(); // 阻止滑动穿透到底部网页
            switchSideDrawerVisible(false); 
        }}
        className='hidden fixed inset-0 z-40 bg-black/40 dark:bg-black/60 glassmorphism cursor-pointer pointer-events-auto' 
      />
    </div>
  )
}

export default SideBarDrawer
