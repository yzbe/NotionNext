import { useGlobal } from '@/lib/global'
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

    function throttle(func, wait) {
      let previous = 0;
      return function(...args) {
        let now = Date.now();
        if (now - previous > wait) {
          func.apply(this, args);
          previous = now;
        }
      };
    }

    const TopNav = (props) => {

const TopNav = (props) => {
  const { tags, currentTag, categories, currentCategory } = props
  const { locale } = useGlobal()
  const searchDrawer = useRef()
  const collapseRef = useRef(null)
  
  const topNavRef = useRef(null) 
  
  const router = useRouter()
  const rafRef = useRef(null)
  const navRef = useRef(null)
  const windowTopRef = useRef(0)
  const [isOpen, changeShow] = useState(false)

  // ⭐️ 同步修改：匹配 top-1 的悬浮状态
  const scrollTrigger = useCallback(throttle(() => {
    const scrollS = window.scrollY
    if (scrollS >= windowTop && scrollS > 10) {
      const nav = document.querySelector('#sticky-nav')
      nav && nav.classList.replace('top-1', '-top-40') 
      windowTop = scrollS
    } else {
      const nav = document.querySelector('#sticky-nav')
      nav && nav.classList.replace('-top-40', 'top-1')
      windowTop = scrollS
    }
  }, 200), [])

  useEffect(() => {
    if (siteConfig('NEXT_NAV_TYPE', null, CONFIG) === 'autoCollapse') {
      navRef.current = document.querySelector('#sticky-nav')
      scrollTrigger()
      window.addEventListener('scroll', scrollTrigger, { passive: true })
    }
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      siteConfig('NEXT_NAV_TYPE', null, CONFIG) === 'autoCollapse' && window.removeEventListener('scroll', scrollTrigger)
    }
  }, [scrollTrigger])

  useEffect(() => {
    router.events.on('routeChangeComplete', menuCollapseHide)
    return () => {
      router.events.off('routeChangeComplete', menuCollapseHide)
    }
  }, [menuCollapseHide, router.events])

  const menuCollapseHide = () => {
    changeShow(false)
  }

  const toggleMenuOpen = () => {
    changeShow(!isOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && topNavRef.current && !topNavRef.current.contains(event.target)) {
        changeShow(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside) 
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
                    <div className='text-gray-600 dark:text-gray-200'><i className='mr-2 fas fa-list' />{locale.COMMON.CATEGORY}</div>
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
        <div id='top-nav' className='block lg:hidden' ref={topNavRef}>
            <SearchDrawer cRef={searchDrawer} slot={searchDrawerSlot} />

            {/* 顶部悬浮（top-1 / mt-1）和四角全圆，但将宽度恢复成了贴边的 w-full */}
            <div 
              id='sticky-nav' 
              style={{ borderRadius: '12px' }}
              className={`overflow-hidden shadow-md ${siteConfig('NEXT_NAV_TYPE', null, CONFIG) !== 'normal' ? 'fixed top-1' : 'relative mt-1'} lg:relative w-full z-20 transform duration-500`}
            >
               {/* ⭐️ 核心修改点：
                   1. 背景色：bg-white/90 dark:bg-hexo-black-gray/90 (日间白，夜间深)
                   2. 字体图标颜色：text-black dark:text-white (日间黑，夜间白)
               */}
                <div className='w-full flex justify-between items-center p-4 bg-white/90 dark:bg-hexo-black-gray/90 backdrop-blur-md text-black dark:text-white relative'>
                    <div className='flex flex-none flex-grow-0'>
                        <div onClick={toggleMenuOpen} className='w-8 cursor-pointer'>
                            {isOpen ? <i className='fas fa-times' /> : <i className='fas fa-bars' />}
                        </div>
                    </div>

                     <div className='absolute left-1/2 -translate-x-1/2 flex'>
                        <Logo {...props} />
                    </div>

                    {/* ⭐️ 图标颜色也同步去掉了强制的深色模式约束，让它跟随父级 */}
                    <div className='mr-1 flex justify-end items-center text-sm space-x-4 font-serif'>
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
