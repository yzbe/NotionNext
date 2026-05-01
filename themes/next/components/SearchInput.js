import { useRouter } from 'next/router'
import { useGlobal } from '@/lib/global'
import { useImperativeHandle, useRef, useState } from 'react'
import { useNextGlobal } from '..'
import { siteConfig } from '@/lib/config'

let lock = false

const SearchInput = ({ currentTag, keyword, cRef }) => {
  const { locale } = useGlobal()
  const [onLoading, setLoadingState] = useState(false)
  const router = useRouter()
  const searchInputRef = useRef()
  const { searchModal } = useNextGlobal()

  useImperativeHandle(cRef, () => {
    return {
      focus: () => {
        searchInputRef?.current?.focus()
      }
    }
  })

  const handleFocus = () => {
    // 使用Algolia
    if (siteConfig('ALGOLIA_APP_ID')) {
      searchModal.current.openSearch()
    }
  }

  const handleSearch = () => {
    // 使用Algolia
    if (siteConfig('ALGOLIA_APP_ID')) {
      searchModal.current.openSearch()
      return
    }

    const key = searchInputRef.current.value
    if (key && key !== '') {
      setLoadingState(true)
      router.push({ pathname: '/search/' + key }).then(r => {
        setLoadingState(false)
      })
      // location.href = '/search/' + key
    } else {
      router.push({ pathname: '/' }).then(r => {
      })
    }
  }
  const handleKeyUp = (e) => {
    if (e.keyCode === 13) { // 回车
      handleSearch(searchInputRef.current.value)
    } else if (e.keyCode === 27) { // ESC
      cleanSearch()
    }
  }
  const cleanSearch = () => {
    searchInputRef.current.value = ''
    setShowClean(false)
  }
  function lockSearchInput() {
    lock = true
  }

  function unLockSearchInput() {
    lock = false
  }
  const [showClean, setShowClean] = useState(false)
  const updateSearchKey = (val) => {
    if (lock) {
      return
    }
    searchInputRef.current.value = val
    if (val) {
      setShowClean(true)
    } else {
      setShowClean(false)
    }
  }

  return (
    // ⭐️ 修复 1：最外层 div 增加 dark:bg-gray-800，彻底消除边缘漏色
    <div className='flex w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden'
         data-aos="fade-down"
         data-aos-duration="500"
         data-aos-delay="200"
         data-aos-once="true"
         data-aos-anchor-placement="top-bottom"
    >
        <input
            ref={searchInputRef}
            type='text'
            placeholder={currentTag ? `${locale.SEARCH.TAGS} #${currentTag}` : `${locale.SEARCH.ARTICLES}`}
            // ⭐️ 修复 2：输入框改为 bg-transparent（透明），让外层颜色透过来，不再有颜色叠加冲突
            className={'outline-none w-full text-sm pl-4 transition focus:shadow-lg font-light leading-10 text-black bg-transparent dark:text-white'}
            onKeyUp={handleKeyUp}
            onFocus={handleFocus}
            onCompositionStart={lockSearchInput}
            onCompositionUpdate={lockSearchInput}
            onCompositionEnd={unLockSearchInput}
            onChange={e => updateSearchKey(e.target.value)}
            defaultValue={keyword || ''}
        />

        <div className='-ml-8 cursor-pointer float-right items-center justify-center py-2 pr-3'
            onClick={handleSearch}>
            <i className={`hover:text-black transform duration-200  text-gray-500 cursor-pointer fas ${onLoading ? 'fa-spinner animate-spin' : 'fa-search'}`} />
        </div>

        {(showClean &&
            // ⭐️ 修复 3：去除了清理按钮残留的多余底色，让它完全融进胶囊体
            <div className='-ml-12 cursor-pointer float-right items-center justify-center py-2 pr-2'>
                <i className='hover:text-black dark:hover:text-white transform duration-200 text-gray-500 cursor-pointer fas fa-times' onClick={cleanSearch} />
            </div>
        )}
    </div>
  )
}

export default SearchInput
