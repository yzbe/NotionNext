import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'

/**
 * 最新文章列表
 * @param posts 所有文章数据
 * @param sliceCount 截取展示的数量 默认6
 * @constructor
 */
const LatestPostsGroup = ({ latestPosts }) => {
  // 获取当前路径
  const currentPath = useRouter().asPath
  const { locale } = useGlobal()

  if (!latestPosts) {
    return <></>
  }

  return (
    <>
      <div className='text-sm pb-1 px-2 flex flex-nowrap justify-between'>
        <div className='font-light text-gray-600  dark:text-gray-200'>
          <i className='mr-2 fas fa-history' />
          {locale.COMMON.LATEST_POSTS}
        </div>
      </div>
      {latestPosts.map(post => {
        const selected =
          currentPath === `${siteConfig('SUB_PATH', '')}/${post.slug}`
        return (
          <SmartLink
            key={post.id}
            title={post.title}
            href={post?.href}
            passHref
            className={'my-1 flex font-light'}>
            
            {/* ⭐️ 核心修改区：重写了这里的动态 className，匹配圆角气泡风格 */}
            <div
              className={`
                w-full py-1.5 px-3 flex rounded-lg cursor-pointer transition-colors duration-200
                ${selected
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-medium' 
                  /* 选中状态：浅灰底色气泡、深色文字、字重加粗 */
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white' 
                  /* 未选中状态：透明背景、浅色文字、悬浮时出现更浅的灰色气泡 */
                }
              `}>
              
              {/* 顺手把不合规范的 <li> 换成了 <div>，并将原先过小的 text-xs 改为了 text-sm 以对齐其他组件 */}
              <div className='line-clamp-2 text-sm'>{post.title}</div>
              
            </div>
          </SmartLink>
        )
      })}
    </>
  )
}
export default LatestPostsGroup