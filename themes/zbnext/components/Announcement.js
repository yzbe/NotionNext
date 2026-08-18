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
        
        {/* 修改点：去掉了 lg:block，让桌面端也保持 flex 居中。同时加入 lg:min-h-[200px] 控制桌面端高度 */}
        {post && (<div id="announcement-content" className="flex flex-col justify-center items-center py-1 lg:min-h-[100px]">
            <style dangerouslySetInnerHTML={{
                __html: `
                /* 依然保持只在小屏幕下（最大宽度 1023px）压缩高度的逻辑 */
                @media (max-width: 1023px) {
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
