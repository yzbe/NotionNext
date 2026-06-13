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
import { useRouter } from 'next/router'

let windowTop = 0

const TopNav = (props) => {
  const { tags, currentTag, categories, currentCategory } = props
  const { locale } = useGlobal()
  const searchDrawer = useRef()
  const collapseRef = useRef(null)
  const topNavRef = useRef(null) 
  const router = useRouter()
  const rafRef = useRef(null)
  const navRef = useRef(null)
  const [isOpen, changeShow] = useState(false)

  // ⭐️ 修复 1：将函数的定义提升到 useEffect 之前，彻底消灭 TDZ 初始化报错
  const menuCollapseHide = useCallback(() => {
    changeShow(false)
  }, [])

  const toggleMenuOpen = () => {
    changeShow(!isOpen)
  }

  // ⭐️ 修复 2：彻底弃用容易引发依赖缺失的 throttle，改用原生动画帧，丝滑且永不报错
  const scrollTrigger = useCallback(() => {
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
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
        rafRef.current = null
      })
    }
  }, [])

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
  }, [router.events, menuCollapseHide])

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

  // ⭐️ 修复 3：切断了 useNextGlobal 的循环依赖，直接唤起原生抽屉搜索
  const showSearchModal = () => {
    searchDrawer?.current?.show()
  }

  const searchDrawerSlot = (
    <>
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
  )

  return (
        <div id='top-nav' className='block lg:hidden' ref={topNavRef}>
            <SearchDrawer cRef={searchDrawer} slot={searchDrawerSlot} />

            <div 
              id='sticky-nav' 
              style={{ borderRadius: '12px' }}
              className={`overflow-hidden shadow-md ${siteConfig('NEXT_NAV_TYPE', null, CONFIG) !== 'normal' ? 'fixed top-1' : 'relative mt-1'} lg:relative w-full z-20 transform duration-500`}
            >
                <div className='w-full flex justify-between items-center p-4 bg-white/90 dark:bg-hexo-black-gray/90 backdrop-blur-md text-black dark:text-white relative'>
                    <div className='flex flex-none flex-grow-0'>
                        <div onClick={toggleMenuOpen} className='w-8 cursor-pointer'>
                            {isOpen ? <i className='fas fa-times' /> : <i className='fas fa-bars' />}
                        </div>
                    </div>

                     <div className='absolute left-1/2 -translate-x-1/2 flex'>
                        <Logo {...props} />
                    </div>

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
        </div>
  )
}

export default TopNav