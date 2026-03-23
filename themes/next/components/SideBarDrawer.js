import SideBar from './SideBar'
import { useRouter } from 'next/router'
import { useEffect, useImperativeHandle } from 'react'

const SideBarDrawer = ({ post, cRef, tags, slot, categories, currentCategory }) => {
  // 暴露给父组件
  useImperativeHandle(cRef, () => ({
    handleSwitchSideDrawerVisible: () => switchSideDrawerVisible(true)
  }))

  useEffect(() => {
    const sideBarWrapperElement = document.getElementById('sidebar-wrapper')
    sideBarWrapperElement?.classList?.remove('hidden')
  }, [])

  const router = useRouter()
  useEffect(() => {
    const sideBarDrawerRouteListener = () => switchSideDrawerVisible(false)
    router.events.on('routeChangeComplete', sideBarDrawerRouteListener)
    return () => {
      router.events.off('routeChangeComplete', sideBarDrawerRouteListener)
    }
  }, [router.events])

  // ⭐️ 修复重点：使用更健壮的 add/remove 逻辑
  const switchSideDrawerVisible = (showStatus) => {
    const sideBarDrawer = window.document.getElementById('sidebar-drawer')
    const sideBarDrawerBackground = window.document.getElementById('sidebar-drawer-background')

    if (!sideBarDrawer || !sideBarDrawerBackground) return

    if (showStatus) {
      // 打开菜单
      sideBarDrawer.classList.remove('-ml-80')
      sideBarDrawer.classList.add('ml-0')
      sideBarDrawerBackground.classList.remove('hidden')
      sideBarDrawerBackground.classList.add('block')
    } else {
      // 关闭菜单
      sideBarDrawer.classList.remove('ml-0')
      sideBarDrawer.classList.add('-ml-80')
      sideBarDrawerBackground.classList.remove('block')
      sideBarDrawerBackground.classList.add('hidden')
    }
  }

  return (
    <div id='sidebar-wrapper' className='hidden'>
      {/* 侧边栏主体：z-50 确保在最顶层 */}
      <div 
        id='sidebar-drawer' 
        className='-ml-80 bg-white dark:bg-gray-900 flex flex-col duration-300 fixed h-full left-0 overflow-y-scroll scroll-hidden top-0 z-50 w-80'
      >
        <SideBar tags={tags} post={post} slot={slot} categories={categories} currentCategory={currentCategory} />
      </div>

      {/* ⭐️ 背景蒙版：z-40 覆盖全屏，负责监听点击 */}
      <div 
        id='sidebar-drawer-background' 
        onClick={() => switchSideDrawerVisible(false)} 
        className='hidden fixed top-0 left-0 z-40 w-full h-full bg-black/40 dark:bg-black/60 glassmorphism cursor-pointer animate__animated animate__fadeIn'
      />
    </div>
  )
}

export default SideBarDrawer
