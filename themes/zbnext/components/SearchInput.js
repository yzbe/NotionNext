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
    if (siteConfig('ALGOLIA_APP_ID')) {
      searchModal.current.openSearch()
    }
  }

  const handleSearch = () => {
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
    } else {
      router.push({ pathname: '/' }).then(r => {
      })
    }
  }
  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleSearch(searchInputRef.current.value)
    } else if (e.keyCode === 27) {
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
    <div 
      style={{ borderRadius: '9999px' }}
      /* ⭐️ 核心修正：将 dark:bg-gray-800 改为 dark:bg-[#2c2c2c]，让搜索框浮现出来 */
      className='flex w-full bg-gray-100 dark:bg-[#464646] rounded-full overflow-hidden'
      data-aos="fade-down"
      data-aos-duration="500"
      data-aos-delay="200"
      data-aos-once="true"
      data-aos-anchor-placement="top-bottom"
    >
        <input
            ref={searchInputRef}
            type='text'
            style={{ borderRadius: '9999px' }}
            placeholder={currentTag ? `${locale.SEARCH.TAGS} #${currentTag}` : `${locale.SEARCH.ARTICLES}`}
            /* （保留了你之前修复手机端放大的完美配置） */
            className={'rounded-full outline-none w-full text-base md:text-sm pl-4 transition focus:shadow-lg font-light leading-10 text-black bg-transparent dark:text-white appearance-none'}
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
            {/* ⭐️ 顺手优化：给搜索放大镜加上了 dark:hover:text-white，鼠标放上去会有交互变白的效果 */}
            <i className={`hover:text-black dark:hover:text-white transform duration-200  text-gray-500 cursor-pointer fas ${onLoading ? 'fa-spinner animate-spin' : 'fa-search'}`} />
        </div>

        {(showClean &&
            <div className='-ml-12 cursor-pointer float-right items-center justify-center py-2 pr-2'>
                <i className='hover:text-black dark:hover:text-white transform duration-200 text-gray-500 cursor-pointer fas fa-times' onClick={cleanSearch} />
            </div>
        )}
    </div>
  )
}

export default SearchInput