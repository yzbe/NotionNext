import { useGlobal } from '@/lib/global'
import throttle from 'lodash.throttle'
import SmartLink from '@/components/SmartLink'
import { useCallback, useEffect, useRef, useState } from 'react'
import CategoryGroup from './CategoryGroup'
import Collapse from '@/components/Collapse'
import Logo from './Logo'
import { MenuList } from './MenuList'
import SearchDrawer from './SearchDrawer'
import TagGroups from './TagGroups'
import CONFIG from '../config'
import { siteConfig } from '@/lib/config'
import { useNextGlobal } from '..'
import { useRouter } from 'next/router'

let windowTop = 0

const TopNav = (props) => {
  const { tags, currentTag, categories, currentCategory } = props
  const { locale } = useGlobal()
  const searchDrawer = useRef()
  const collapseRef = useRef(null)
  
  // ⭐️ 1. 新增：创建一个 ref 探头，用来定位整个导航菜单的物理范围
  const topNavRef = useRef(null) 
  
  const router = useRouter()

  const scrollTrigger = useCallback(throttle(() => {
    const scrollS = window.scrollY
    if (scrollS >= windowTop && scrollS > 10) {
      const nav = document.querySelector('#sticky-nav')
      nav && nav.classList.replace('top-0', '-top-40')
      windowTop = scrollS
    } else {
      const nav = document.querySelector('#sticky-nav')
      nav && nav.classList.replace('-top-40', 'top-0')
      windowTop = scrollS
    }
  }, 200), [])

  useEffect(() => {
    if (siteConfig('NEXT_NAV_TYPE', null, CONFIG) === 'autoCollapse') {
      scrollTrigger()
      window.addEventListener('scroll', scrollTrigger)
    }
    return () => {
      siteConfig('NEXT_NAV_TYPE', null, CONFIG) === 'autoCollapse' && window.removeEventListener('scroll', scrollTrigger)
    }
  }, [])

  const [isOpen, changeShow] = useState(false)

  useEffect(() => {
    router.events.on('routeChangeComplete', menuCollapseHide)
    return () => {
      router.events.off('routeChangeComplete', menuCollapseHide)
    }
  }, [])

  const menuCollapseHide = () => {
    changeShow(false)
  }

  const toggleMenuOpen = () => {
    changeShow(!isOpen)
  }

  // ⭐️ 2. 核心逻辑：全局监听点击和触摸
  useEffect(() => {
    const handleClickOutside = (event) => {
      // 如果菜单是开着的，且你点击/触摸的元素不在 TopNav 内部，就关掉它！
      if (isOpen && topNavRef.current && !topNavRef.current.contains(event.target)) {
        changeShow(false)
      }
    }

    // 只有当菜单打开时，才开始监听整个文档的动作，节能高效
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside) // 手机端手指一摸就触发
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isOpen])

  const { searchModal } = useNextGlobal()
  const showSearchModal = () => {
    if (siteConfig('ALGOLIA_APP_ID')) {
      searchModal?.current?.openSearch()
    } else {
      searchDrawer?.current?.show()
    }
  }

  const searchDrawerSlot = <>
        {categories && (
            <section className='mt-8'>
                <div className='text-sm flex flex-nowrap justify-between font-light px-2'>
                    <div className='text-gray-600 dark:text-gray-200'><i className='mr-2 fas fa-th-list' />{locale.COMMON.CATEGORY}</div>
                    <SmartLink
                        href={'/category'}
                        passHref
                        className='mb-3 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white hover:underline cursor-pointer'>
                        {locale.COMMON.MORE} <i className='fas fa-angle-double-right' />
                    </SmartLink>
                </div>
                <CategoryGroup currentCategory={currentCategory} categories={categories} />
            </section>
        )}

        {tags && (
            <section className='mt-4'>
                <div className='text-sm py-2 px-2 flex flex-nowrap justify-between font-light dark:text-gray-200'>
                    <div className='text-gray-600 dark:text-gray-200'><i className='mr-2 fas fa-tag' />{locale.COMMON.TAGS}</div>
                    <SmartLink
                        href={'/tag'}
                        passHref
                        className='text-gray-500 hover:text-black  dark:hover:text-white hover:underline cursor-pointer'>
                        {locale.COMMON.MORE} <i className='fas fa-angle-double-right' />
                    </SmartLink>
                </div>
                <div className='p-2'>
                    <TagGroups tags={tags} currentTag={currentTag} />
                </div>
            </section>
        )}
    </>

  return (
        // ⭐️ 3. 将探头 ref 挂在最外层的 div 上
        <div id='top-nav' className='block lg:hidden' ref={topNavRef}>
            <SearchDrawer cRef={searchDrawer} slot={searchDrawerSlot} />

            <div id='sticky-nav' className={`${siteConfig('NEXT_NAV_TYPE', null, CONFIG) !== 'normal' ? 'fixed' : 'relative'} lg:relative w-full top-0 z-20 transform duration-500`}>
                <div className='w-full flex justify-between items-center p-4 bg-[#1F2937] dark:bg-[#1F2937] text-white relative'> 
                    {/* 左侧LOGO 标题 */}
                    <div className='flex flex-none flex-grow-0'>
                        <div onClick={toggleMenuOpen} className='w-8 cursor-pointer'>
                            {isOpen ? <i className='fas fa-times' /> : <i className='fas fa-bars' />}
                        </div>
                    </div>

                     <div className='absolute left-1/2 -translate-x-1/2 flex'>
                        <Logo {...props} />
                    </div>

                    {/* 右侧功能 */}
                    <div className='mr-1 flex justify-end items-center text-sm space-x-4 font-serif dark:text-gray-200'>
                        <div className="cursor-pointer block lg:hidden" onClick={showSearchModal}>
                            <i className="mr-2 fas fa-search" />
                        </div>
                    </div>
                </div>

                <Collapse collapseRef={collapseRef} type='vertical' isOpen={isOpen}>
                    <MenuList onHeightChange={(param) => collapseRef.current?.updateCollapseHeight(param)} {...props} from='top' />
                </Collapse>
            </div>
        </div>)
}

export default TopNav
