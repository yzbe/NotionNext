import { useGlobal } from '@/lib/global'
import dynamic from 'next/dynamic'

const NotionPage = dynamic(() => import('@/components/NotionPage'))

const Announcement = ({ post, className }) => {
  const { locale } = useGlobal()
  if (!post) {
    return <></>
  }
  return <>
        <div className="text-sm px-2 flex flex-nowrap justify-between">
            <div className="font-light text-gray-600 dark:text-gray-200">
                <i className="mr-2 fas fa-bullhorn" />{locale.COMMON.ANNOUNCEMENT}
            </div>
        </div>
        
        {/* 外层容器：移动端使用 flex 居中和 py-1；桌面端 (lg:) 恢复为 block 和默认边距 */}
        {post && (<div id="announcement-content" className="flex flex-col justify-center items-center py-1 lg:block lg:py-0">
            <style dangerouslySetInnerHTML={{
                __html: `
                /* ⭐️ 核心修改：加入媒体查询，只在小屏幕下（最大宽度 1024px）压缩高度 */
                @media (max-width: 1024px) {
                    #announcement-content .notion,
                    #announcement-content .notion-page,
                    #announcement-content .notion-block,
                    #announcement-content h1,
                    #announcement-content h2,
                    #announcement-content h3,
                    #announcement-content p,
                    #announcement-content .notion-text {
                        min-height: auto !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        line-height: 1.2 !important;
                    }
                }
                `
            }} />
            <NotionPage post={post} className='text-center ' />
        </div>)}
    </>
}
export default Announcement
