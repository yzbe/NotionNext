import { Router } from 'next/router'
import { useImperativeHandle, useRef } from 'react'
import SearchInput from './SearchInput'

const SearchDrawer = ({ cRef, slot }) => {
  const searchDrawer = useRef()
  const searchInputRef = useRef()

  useImperativeHandle(cRef, () => {
    return {
      show: () => {
        searchDrawer?.current?.classList?.remove('hidden')
        searchInputRef?.current?.focus()
      }
    }
  })

  const hidden = () => {
    searchDrawer?.current?.classList?.add('hidden')
  }

  Router.events.on('routeChangeComplete', (...args) => {
    hidden()
  })

  return (
    <div id='search-drawer-wrapper' ref={searchDrawer} className='hidden'>
      <div className='flex-col fixed px-5 w-full left-0 top-14 z-40 justify-center'>
          <div className='md:max-w-3xl w-full mx-auto animate__animated animate__faster animate__fadeIn'>
            <SearchInput cRef={searchInputRef} />
            
            {/* 搜索结果插槽 */}
            {slot}

            {/* ⭐️ 新增：退出/关闭按钮 */}
            <div className='flex justify-center mt-10 animate__animated animate__fadeInUp animate__faster'>
                <button 
                    onClick={hidden}
                    className='group flex items-center justify-center w-12 h-12 rounded-full 
                               bg-white/80 dark:bg-hexo-black-gray/80 backdrop-blur-md
                               border border-gray-200 dark:border-gray-700
                               shadow-lg transition-all duration-300
                               hover:scale-110 active:scale-95'
                >
                    <i className='fas fa-times text-gray-500 dark:text-gray-400 group-hover:text-red-500 transition-colors text-xl' />
                </button>
            </div>
          </div>
      </div>

      {/* 背景蒙版 */}
      <div id='search-drawer-background' onClick={hidden} className='animate__animated animate__faster animate__fadeIn fixed bg-day dark:bg-night top-0 left-0 z-30 w-full h-full' />
    </div>
  )
}

export default SearchDrawer
