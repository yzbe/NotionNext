import SideBar from './SideBar'
import { useRouter } from 'next/router'
import { useEffect, useImperativeHandle } from 'react'

const SideBarDrawer = ({ post, cRef, tags, slot, categories, currentCategory }) => {
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

  // ⭐️ 优化：改用更稳健的 add/remove 逻辑
  const switchSideDrawerVisible = (showStatus) => {
    const sideBarDrawer = window.document.getElementById('sidebar-drawer')
    const sideBarDrawerBackground = window.document.getElementById('sidebar-drawer-background')

    if (showStatus) {
      sideBarDrawer?.classList.remove('-ml-80')
      sideBarDrawer?.classList.add('ml-0')
      sideBarDrawerBackground?.classList.remove('hidden')
      sideBarDrawerBackground?.classList.add('block')
    } else {
      sideBarDrawer?.classList.remove('ml-0')
      sideBarDrawer?.classList.add('-ml-80')
      sideBarDrawerBackground?.classList.remove('block')
      sideBarDrawerBackground?.classList.add('hidden')
    }
  }

  return (
    <div id='sidebar-wrapper' className='hidden'>
      {/* 侧边栏主体：z-40 保证在最上层 */}
      <div id='sidebar-drawer' className='-ml-80 bg-white dark:bg-gray-900 flex flex-col duration-300 fixed h-full left-0 overflow-y-scroll scroll-hidden top-0 z-40 w-72'>
        <SideBar tags={tags} post={post} slot={slot} categories={categories} currentCategory={currentCategory} />
      </div>

      {/* ⭐️ 背景蒙版：增加 cursor-pointer 并确保 z-30 覆盖全屏 */}
      <div 
        id='sidebar-drawer-background' 
        onClick={() => switchSideDrawerVisible(false)} 
        className='hidden fixed top-0 left-0 z-30 w-full h-full bg-black/20 dark:bg-black/40 glassmorphism cursor-pointer animate__animated animate__fadeIn' 
      />
    </div>
  )
}

export default SideBarDrawer
