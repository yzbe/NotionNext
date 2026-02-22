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
  const showPreview = siteConfig('NEXT_POST_LIST_PREVIEW', null, CONFIG) && post.blockMap
  
  const aosProps = index > 2
    ? {
        'data-aos': 'fade-down',
        'data-aos-duration': '400',
        'data-aos-once': 'true',
        'data-aos-anchor-placement': 'top-bottom'
      }
    : {}

  return (
    <Card className='w-full'>
      <div key={post.id} className='flex flex-col-reverse justify-between duration-300'>
        {/* 【修改 1】减小外层 padding，从 lg:p-8 改为 lg:p-5，并删除多余间距 */}
        <div className='lg:p-5 p-4 flex flex-col w-full justify-center min-h-[150px]'>
          
          {/* 【修改 2】缩小标题字号，从 text-3xl 改为 text-xl (约 0.7-0.8倍) */}
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

          {/* Meta 信息行 */}
          <div
            {...aosProps}
            className={`flex mt-2 items-center ${showPreview ? 'justify-center' : 'justify-start'} flex-wrap dark:text-gray-500 text-gray-500`}>
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

          {/* 【修改 3】摘要限制 2 行，并删除 mb-12 (这是导致底部空白巨大的元凶) */}
          {(!showPreview || showSummary) && !post.results && (
            <p
              {...aosProps}
              className='mt-3 text-gray-700 dark:text-gray-300 text-sm font-light leading-6 line-clamp-2'>
              {post.summary}
            </p>
          )}

          {/* 搜索结果保留 */}
          {post.results && (
            <p className='line-clamp-2 mt-3 text-gray-700 dark:text-gray-300 text-sm font-light leading-6'>
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

          {/* 【修改 4】彻底删除原有的“文章详情”按钮和虚线分割线区域 */}
          {/* 这里原本的代码已移除，以实现紧凑布局 */}
        </div>

        {/* 封面图保留逻辑 */}
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
