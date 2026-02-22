import NotionIcon from '@/components/NotionIcon'
import NotionPage from '@/components/NotionPage'
import TwikooCommentCount from '@/components/TwikooCommentCount'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { formatDateFmt } from '@/lib/utils/formatDate'
import Image from 'next/image'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'
import Card from './Card'
import TagItemMini from './TagItemMini'

const BlogPostCard = ({ post, index, showSummary }) => {
  const { locale } = useGlobal()
  const showPreview =
    siteConfig('NEXT_POST_LIST_PREVIEW', null, CONFIG) && post.blockMap
  // 动画样式 首屏卡片不用，后面翻出来的加动画
  const aosProps =
    index > 2
      ? {
          'data-aos': 'fade-down',
          'data-aos-duration': '400',
          'data-aos-once': 'true',
          'data-aos-anchor-placement': 'top-bottom'
        }
      : {}

  return (
    <Card className='w-full'>
      <div
        key={post.id}
        className='flex flex-col-reverse justify-between duration-300'>
        {/* 【布局优化】
            1. lg:py-2: 将大屏幕下的上下内边距从 32px 压缩至 8px
            2. justify-center: 确保在极窄高度下内容垂直居中
         */}
        <div className='lg:py-2 lg:px-8 py-2 px-4 flex flex-col w-full justify-center'>
          
          {/* 【标题优化】text-xl 缩小字号，leading-tight 紧凑行高 */}
          <SmartLink
            {...aosProps}
            href={post?.href}
            passHref
            className={`cursor-pointer text-xl ${showPreview ? 'text-center' : ''} leading-tight text-gray-700 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-400 font-bold`}>
            {siteConfig('POST_TITLE_ICON') && (
              <NotionIcon icon={post.pageIcon} />
            )}{' '}
            <span className='menu-link'>{post.title}</span>
          </SmartLink>

          {/* 【Meta信息】mt-1 缩小与标题的间距 */}
          <div
            {...aosProps}
            className={`flex mt-1 items-center ${showPreview ? 'justify-center' : 'justify-start'} flex-wrap dark:text-gray-500 text-gray-500 `}>
            <div>
              {post.category && (
                <>
                  <SmartLink
                    href={`/category/${post.category}`}
                    passHref
                    className='hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer font-light text-xs transform'>
                    <i className='mr-1 fas fa-folder' />
                    <span className='menu-link'>{post.category}</span>
                  </SmartLink>
                  <span className='mx-2 text-xs'>|</span>
                </>
              )}
              <SmartLink
                href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}
                passHref
                className='hover:text-blue-500 dark:hover:text-blue-400 font-light cursor-pointer text-xs leading-4 mr-3'>
                <span className='menu-link'>{post.date?.start_date}</span>
              </SmartLink>
            </div>

            <TwikooCommentCount
              post={post}
              className='hover:text-blue-500 dark:hover:text-blue-400 hover:underline text-xs'
            />

            <div className='hover:text-blue-500 dark:hover:text-blue-400 md:flex-nowrap flex-wrap md:justify-start inline-block'>
              {post.tagItems?.map(tag => (
                <TagItemMini key={tag.name} tag={tag} />
              ))}
            </div>
          </div>

          {/* 【摘要优化】
              1. mt-1: 缩小上方间距
              2. mb-0: 彻底删除原本巨大的底部空白 (原本是 mb-12)
              3. w-2/3: 限制宽度为卡片的 2/3
              4. line-clamp-2: 限制最多显示2行
          */}
          {(!showPreview || showSummary) && !post.results && (
            <p
              {...aosProps}
              className='mt-1 mb-0 w-3/4 text-gray-700 dark:text-gray-300 text-sm font-light leading-6 line-clamp-2'>
              {post.summary}
            </p>
          )}

          {/* 搜索结果同步调整宽度为 2/3 */}
          {post.results && (
            <p className='line-clamp-2 mt-1 mb-0 w-2/3 text-gray-700 dark:text-gray-300 text-sm font-light leading-6'>
              {post.results.map((r, index) => (
                <span key={index}>{r}</span>
              ))}
            </p>
          )}

          {showPreview && post?.blockMap && (
            <div className='overflow-ellipsis truncate'>
              <NotionPage post={post} />
            </div>
          )}

          {/* 【注】原有的“文章详情”按钮和虚线区域已彻底移除，以实现极致压缩效果 */}
        </div>

        {/* 封面图逻辑保留 */}
        {siteConfig('NEXT_POST_LIST_COVER', null, CONFIG) &&
          post?.pageCoverThumbnail && (
            <SmartLink href={post?.href} passHref legacyBehavior>
              <div className='h-72 w-full relative duration-200 cursor-pointer transform overflow-hidden'>
                <Image
                  className='hover:scale-105 transform duration-500'
                  src={post?.pageCoverThumbnail}
                  alt={post.title}
                  layout='fill'
                  objectFit='cover'
                  loading='lazy'
                />
              </div>
            </SmartLink>
          )}
      </div>
    </Card>
  )
}

export default BlogPostCard
