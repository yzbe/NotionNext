import replaceSearchResult from '@/components/Mark'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import dynamic from 'next/dynamic'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import Announcement from './components/Announcement'
import ArticleDetail from './components/ArticleDetail'
import { ArticleLock } from './components/ArticleLock'
import BlogListBar from './components/BlogListBar'
import BlogPostArchive from './components/BlogPostArchive'
import BlogPostListPage from './components/BlogPostListPage'
import BlogPostListScroll from './components/BlogPostListScroll'
import Card from './components/Card'
import FloatDarkModeButton from './components/FloatDarkModeButton'
import Footer from './components/Footer'
import JumpToBottomButton from './components/JumpToBottomButton'
import JumpToTopButton from './components/JumpToTopButton'
import SideAreaLeft from './components/SideAreaLeft'
import SideAreaRight from './components/SideAreaRight'
import StickyBar from './components/StickyBar'
import TagItem from './components/TagItem'
import TocDrawer from './components/TocDrawer'
import TocDrawerButton from './components/TocDrawerButton'
import TopNav from './components/TopNav'
import CONFIG from './config'
import { Style } from './style'

const AlgoliaSearchModal = dynamic(
  () => import('@/components/AlgoliaSearchModal'),
  { ssr: false }
)

// 主题全局状态
const ThemeGlobalNext = createContext()
export const useNextGlobal = () => useContext(ThemeGlobalNext)

/**
 * 基础布局 采用左中右三栏布局，移动端使用顶部导航栏
 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase = props => {
  const { children, headerSlot, rightAreaSlot, post } = props
  const targetRef = useRef(null)
  const floatButtonGroup = useRef(null)
  const router = useRouter()
  
  const [showRightFloat, switchShow] = useState(true) 
  const [percent, changePercent] = useState(0) 
  
  const scrollListener = () => {
    const targetRef = document.getElementById('wrapper')
    const clientHeight = targetRef?.clientHeight
    const scrollY = window.pageYOffset
    const fullHeight = clientHeight - window.outerHeight
    let per = parseFloat(((scrollY / fullHeight) * 100).toFixed(0))
    if (per > 100) per = 100
    changePercent(per)
  }

  useEffect(() => {
    let timeoutId;
    const handleUserAction = () => {
      switchShow(true); 
      if (timeoutId) clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        switchShow(false);
      }, 5000);
    };

    const events = ['scroll', 'mousemove', 'mousedown', 'touchstart', 'keydown'];
    events.forEach(e => window.addEventListener(e, handleUserAction, { passive: true }));
    
    handleUserAction(); 

    return () => {
      events.forEach(e => window.removeEventListener(e, handleUserAction));
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const fb = document.getElementsByClassName('fb-customerchat')
    if (fb.length === 0) {
      floatButtonGroup?.current?.classList.replace('bottom-24', 'bottom-12')
    } else {
      floatButtonGroup?.current?.classList.replace('bottom-12', 'bottom-24')
    }

    document.addEventListener('scroll', scrollListener)
    return () => document.removeEventListener('scroll', scrollListener)
  }, [])

  useEffect(() => {
    const handleRouteChange = () => {
      setTimeout(() => {
        if (typeof window !== 'undefined' && window.AOS) {
          window.AOS.refresh()
        }
      }, 300) 
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    handleRouteChange() 

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  const drawerRight = useRef(null)
  const floatSlot = (
    <div className='block lg:hidden'>
      <TocDrawerButton
        onClick={() => {
          drawerRight?.current?.handleSwitchVisible()
        }}
      />
    </div>
  )

  const tocRef = isBrowser ? document.getElementById('article-wrapper') : null

  const searchModal = useRef(null)

  return (
    <ThemeGlobalNext.Provider value={{ searchModal }}>
      <div
        id='theme-next'
        className={`${siteConfig('FONT_STYLE')} dark:bg-black scroll-smooth pb-1`}>
        <Style />

        <TopNav {...props} />

        <AlgoliaSearchModal cRef={searchModal} {...props} />

        <>{headerSlot}</>

        <main
          id='wrapper'
          className={
            (JSON.parse(siteConfig('LAYOUT_SIDEBAR_REVERSE'))
              ? 'flex-row-reverse'
              : '') + ' next relative flex justify-center flex-1 pb-12 lg:mt-1 lg:mb-1' 
          }>
          <SideAreaLeft targetRef={targetRef} {...props} />

          <section
            id='container-inner'
            className={`${siteConfig('NEXT_NAV_TYPE', null, CONFIG) !== 'normal' ? 'mt-24' : ''} lg:max-w-3xl xl:max-w-4xl flex-grow md:mt-0 min-h-screen w-full relative z-10`}
            ref={targetRef}>
            {children}
          </section>

          {siteConfig('NEXT_RIGHT_BAR', null, CONFIG) && (
            <SideAreaRight
              targetRef={targetRef}
              slot={rightAreaSlot}
              {...props}
            />
          )}
        </main>

        {post && (
          <div className='block lg:hidden'>
            <TocDrawer post={post} cRef={drawerRight} targetRef={tocRef} />
          </div>
        )}

        <div
          ref={floatButtonGroup}
          className='right-8 bottom-12 lg:right-2 fixed justify-end z-20 '>
          <div
            className={
              (showRightFloat ? 'animate__animated ' : 'hidden') +
              ' animate__fadeInUp rounded-md glassmorphism justify-center duration-500  animate__faster flex space-x-2 items-center cursor-pointer '
            }>
            <JumpToTopButton percent={percent} />
            <JumpToBottomButton />
            <FloatDarkModeButton />
            {floatSlot}
          </div>
        </div>

        <Footer title={siteConfig('TITLE')} />
      </div>
    </ThemeGlobalNext.Provider>
  )
}

/**
 * 首页
 */
const LayoutIndex = props => {
  const { notice } = props
  return (
    <>
      <Card className='my-2 lg:hidden'>
        <Announcement post={notice} />
      </Card>

      <BlogListBar {...props} />

      {siteConfig('POST_LIST_STYLE') !== 'page' ? (
        <BlogPostListScroll {...props} showSummary={true} />
      ) : (
        <BlogPostListPage {...props} />
      )}
    </>
  )
}

/**
 * 博客列表
 */
const LayoutPostList = props => {
  return (
    <div className='mt-2 md:mt-0'>
      <BlogListBar {...props} />

      {siteConfig('POST_LIST_STYLE') !== 'page' ? (
        <BlogPostListScroll {...props} showSummary={true} />
      ) : (
        <BlogPostListPage {...props} />
      )}
    </div>
  )
}

/**
 * 搜索
 */
const LayoutSearch = props => {
  const { locale } = useGlobal()
  const { posts, keyword } = props

  useEffect(() => {
    if (isBrowser) {
      replaceSearchResult({
        doms: document.getElementById('posts-wrapper'),
        search: keyword,
        target: {
          element: 'span',
          className: 'text-red-500 border-b border-dashed'
        }
      })
    }
  }, [])

  return (
    <>
      <StickyBar>
        {/* ⭐️ 已恢复：去除冗余的特效包，只保留最基础的内容展示，把样式交给 StickyBar 统管 */}
        <div className='p-4 dark:text-gray-200'>
          <i className='mr-1 fas fa-search' /> {posts?.length}{' '}
          {locale.COMMON.RESULT_OF_SEARCH}
        </div>
      </StickyBar>
      <div className='mt-2 md:mt-5'>
        {siteConfig('POST_LIST_STYLE') !== 'page' ? (
          <BlogPostListScroll {...props} showSummary={true} />
        ) : (
          <BlogPostListPage {...props} />
        )}
      </div>
    </>
  )
}

/**
 * 404
 */
const Layout404 = props => {
  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      const article = isBrowser && document.getElementById('article-wrapper')
      if (!article) {
        router.push('/').then(() => {})
      }
    }, 3000)
  }, [])

  return (
    <>
      <div className='md:-mt-20 text-black w-full h-screen text-center justify-center content-center items-center flex flex-col'>
        <div className='dark:text-gray-200'>
          <h2 className='inline-block border-r-2 border-gray-600 mr-2 px-3 py-2 align-top'>
            <i className='mr-2 fas fa-spinner animate-spin' />
            404
          </h2>
          <div className='inline-block text-left h-32 leading-10 items-center'>
            <h2 className='m-0 p-0'>页面无法加载，即将返回首页</h2>
          </div>
        </div>
      </div>
    </>
  )
}

/**
 * 归档
 */
const LayoutArchive = props => {
  const { archivePosts } = props

  return (
    <div className='mt-2 md:mt-0'>
      <div 
        style={{ borderRadius: '12px' }}
        className='mb-10 pb-20 bg-white md:p-12 p-3 dark:bg-hexo-black-gray shadow transition-shadow duration-300 md:hover:shadow-2xl dark:md:hover:shadow-[0_20px_50px_-5px_#ffffff26,0_8px_20px_-6px_#ffffff1a] min-h-full'
      >
        {Object.keys(archivePosts).map(archiveTitle => (
          <BlogPostArchive
            key={archiveTitle}
            posts={archivePosts[archiveTitle]}
            archiveTitle={archiveTitle}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * 文章详情
 */
const LayoutSlug = props => {
  const { post, lock, validPassword } = props

  const router = useRouter()
  const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000
  useEffect(() => {
    if (!post) {
      setTimeout(
        () => {
          if (isBrowser) {
            const article = document.querySelector('#article-wrapper #notion-article')
            if (!article) {
              router.push('/404').then(() => {
                console.warn('找不到页面', router.asPath)
              })
            }
          }
        },
        waiting404
      )
    }
  }, [post])
  return (
    <>
      {post && !lock && <ArticleDetail {...props} />}
      {post && lock && <ArticleLock validPassword={validPassword} />}
    </>
  )
}

/**
 * 分类列表
 */
const LayoutCategoryIndex = props => {
  const { allPosts, categoryOptions } = props
  const { locale } = useGlobal()
  return (
    <div totalPosts={allPosts} {...props} className='mt-2 md:mt-0'>
      <div 
        style={{ borderRadius: '12px' }}
        className='bg-white dark:bg-hexo-black-gray px-10 py-10 shadow transition-shadow duration-300 md:hover:shadow-2xl dark:md:hover:shadow-[0_20px_50px_-5px_#ffffff26,0_8px_20px_-6px_#ffffff1a] h-full'
      >
        <div className='dark:text-gray-200 mb-5 font-bold'>
          <i className='mr-4 fas fa-list' />
          {locale.COMMON.CATEGORY}:
        </div>
        
        {/* ⭐️ 核心修正：给外层 flex 加上一点间距 (gap-3) 让排列更舒服 */}
        <div id='category-list' className='duration-200 flex flex-wrap gap-3'>
          {categoryOptions?.map(category => {
            return (
              <SmartLink
                key={category.name}
                href={`/category/${category.name}`}
                passHref
                legacyBehavior>
                <div
                  className={`
                    cursor-pointer rounded-lg px-5 py-2 flex items-center transition-colors duration-200
                    /* ⭐️ 同步主菜单的悬停配色，去除生硬直角 */
                    bg-gray-100 dark:bg-[#2c2c2c] text-gray-700 dark:text-gray-300 
                    hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-black dark:hover:text-white
                  `}>
                  <i className='mr-2 fas fa-folder' />
                  {category.name} ({category.count})
                </div>
              </SmartLink>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/**
 * 标签列表
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  const { locale } = useGlobal()
  return (
    <div className='mt-2 md:mt-0'>
      <div 
        style={{ borderRadius: '12px' }}
        className='bg-white dark:bg-hexo-black-gray px-10 py-10 shadow transition-shadow duration-300 md:hover:shadow-2xl dark:md:hover:shadow-[0_20px_50px_-5px_#ffffff26,0_8px_20px_-6px_#ffffff1a] h-full'
      >
        <div className='dark:text-gray-200 mb-5'>
          <i className='fas fa-tags mr-4' />
          {locale.COMMON.TAGS}:
        </div>
        <div id='tags-list' className='duration-200 flex flex-wrap'>
          {tagOptions.map(tag => {
            return (
              <div key={tag.name} className='p-2'>
                <TagItem key={tag.name} tag={tag} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
