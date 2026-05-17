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
            
            <div
              className={`
                w-full py-1.5 px-2 flex items-center rounded-lg cursor-pointer transition-colors duration-200
                /* ⭐️ 核心修改：将上面的 px-3 改为了 px-2，实现左侧边缘的完美纵向对齐 */
                ${selected
                  ? 'bg-gray-200 dark:bg-gray-800 text-black dark:text-white font-medium' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white' 
                }
              `}>
              
              {/* ⭐️ 新增区：加入了你指定的文本行图标，并用 mr-2 保持合适的右侧间距 */}
              <i className='fas fa-file-lines mr-2' />
              
              <div className='line-clamp-2 text-sm'>{post.title}</div>
              
            </div>
          </SmartLink>
        )
      })}
    </>
  )
}
export default LatestPostsGroup