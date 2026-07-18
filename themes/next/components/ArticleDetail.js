import Comment from '@/components/Comment'
import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import NotionPage from '@/components/NotionPage'
import ShareBar from '@/components/ShareBar'
import WWAds from '@/components/WWAds'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { formatDateFmt } from '@/lib/utils/formatDate'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import CONFIG from '../config'
import ArticleCopyright from './ArticleCopyright'
import BlogAround from './BlogAround'
import RecommendPosts from './RecommendPosts'
import TagItem from './TagItem'
import WordCount from '@/components/WordCount'

/**
 * 文章详情
 * @param {*} props
 * @returns
 */
export default function ArticleDetail(props) {
  const { post, recommendPosts, prev, next } = props
  const url = siteConfig('LINK') + useRouter().asPath
  const { locale } = useGlobal()
  const router = useRouter()
  const showArticleInfo = siteConfig('NEXT_ARTICLE_INFO', null, CONFIG)

  // 动画样式
  const aosProps = {
    'data-aos': 'fade-down',
    'data-aos-duration': '400',
    'data-aos-once': 'true',
    'data-aos-anchor-placement': 'top-bottom'
  }

  // 返回上一级逻辑
  const handleBack = () => {
    if (window.history.length <= 1) {
      router.push('/')
    } else {
      router.back()
    }
  }

  return (
    <>
      {/* ⭐️ 核心修正：将按钮移出 overflow-hidden 的父容器之外 */}
      {/* 使用 fixed 定位，并设置极高的 z-index */}
      <div className='block md:hidden fixed top-[75px] left-[25px] z-[99]'>
        <button
          onClick={handleBack}
          className='flex items-center justify-center w-10 h-10 rounded-full 
                     bg-white/40 dark:bg-black/20 backdrop-blur-xl
                     text-gray-900 dark:text-white
                     shadow-sm active:scale-95 transition-all duration-200'
        >
          <i className='fas fa-chevron-left text-lg' />
        </button>
      </div>

      <div
        style={{ borderRadius: '12px' }}
        className='mt-2 md:mt-0 overflow-hidden bg-white dark:bg-hexo-black-gray shadow transition-shadow duration-300 md:hover:shadow-2xl dark:md:hover:shadow-[0_20px_50px_-5px_#ffffff26,0_8px_20px_-6px_#ffffff1a] overflow-x-auto flex-grow mx-auto w-screen md:w-full relative'
      >
        <div
          itemScope
          itemType='https://schema.org/Movie'
          className='py-10 px-4 lg:pt-24 md:px-24 dark:border-gray-700'
        >
          {showArticleInfo && (
            <header {...aosProps}>
              {/* 头图 */}
              {siteConfig('NEXT_POST_HEADER_IMAGE_VISIBLE', null, CONFIG) &&
                post?.type &&
                post?.type !== 'Page' &&
                post?.pageCover && (
                  <div className='w-full relative md:flex-shrink-0 overflow-hidden'>
                    <LazyImage
                      alt={post.title}
                      src={post?.pageCover}
                      className='object-center w-full'
                    />
                  </div>
                )}

              {/* 标题 */}
              <div className='text-center font-bold text-3xl text-black dark:text-white font-serif pt-6'>
                {siteConfig('POST_TITLE_ICON') && (
                  <NotionIcon icon={post.pageIcon} />
                )}
                {post.title}
              </div>

              {/* 元数据 */}
              <section className='mt-2 text-gray-500 dark:text-gray-400 font-light leading-7 text-sm'>
                <div className='flex flex-wrap justify-center'>
                  {post?.type !== 'Page' && (
                    <>
                      {/* 发布日期 */}
                      <SmartLink
                        href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}
                        passHref
                        legacyBehavior>
                        <div className='pl-1 mr-2 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 border-b dark:border-gray-500 border-dashed'>
                          <i className='far fa-calendar mr-1' />{' '}
                          {post?.publishDay}
                        </div>
                      </SmartLink>

                      {/* 最后修改日期 */}
                      {post?.lastEditedDay && (
                        <span className='mr-2'>
                          {' '}
                          | <i className='far fa-calendar-check mr-2' />
                          {post.lastEditedDay}{' '}
                        </span>
                      )}

                      {/* 浏览量统计 */}
                      <div className='hidden busuanzi_container_page_pv font-light mr-2'>
                        <i className='mr-1 fas fa-eye' />
                        <span className='mr-2 busuanzi_value_page_pv' />
                      </div>

                      {/* 字数统计 */}
                      <WordCount wordCount={post.wordCount} readTime={post.readTime} />
                    </>
                  )}
                </div>
              </section>
            </header>
          )}

          <article id='article-wrapper' className='mx-auto'>
            <WWAds className='w-full' orientation='horizontal' />
            {post && <NotionPage post={post} />}
            <WWAds className='w-full' orientation='horizontal' />
          </article>

          {showArticleInfo && (
            <>
              <ShareBar post={post} />
              {post?.type === 'Post' && (
                <ArticleCopyright author={siteConfig('AUTHOR')} url={url} />
              )}
              {post?.type === 'Post' && (
                <RecommendPosts
                  currentPost={post}
                  recommendPosts={recommendPosts}
                />
              )}

              <section className='flex justify-between'>
                {post.category && (
                  <div className='cursor-pointer my-auto text-md mr-2 hover:text-black dark:hover:text-white border-b dark:text-gray-500 border-dashed'>
                    <SmartLink
                      href={`/category/${post.category}`}
                      legacyBehavior>
                      <a>
                        <i className='mr-1 far fa-folder-open' /> {post.category}
                      </a>
                    </SmartLink>
                  </div>
                )}

                {post?.type === 'Post' && post.tagItems && (
                  <div className='flex items-center flex-nowrap leading-8 p-1 py-4 overflow-x-auto'>
                    <div className='hidden md:block dark:text-gray-300 whitespace-nowrap'>
                      {locale.COMMON.TAGS}:&nbsp;
                    </div>
                    {post.tagItems.map(tag => (
                      <TagItem key={tag.name} tag={tag} />
                    ))}
                  </div>
                )}
              </section>
              {post?.type === 'Post' && <BlogAround prev={prev} next={next} />}
            </>
          )}

          <div className='duration-200 w-full dark:border-gray-700 bg-transparent'>
            <Comment frontMatter={post} />
          </div>
        </div>
      </div>
    </>
  )
}