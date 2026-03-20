import { useGlobal } from '@/lib/global'
import dynamic from 'next/dynamic'

const NotionPage = dynamic(() => import('@/components/NotionPage'))

const Announcement = ({ post, className }) => {
  const { locale } = useGlobal()
  if (!post) {
    return <></>
  }
  return <>
        {/* 顶部 "公告" 两个字的栏目，去掉了原有的 pb-1 让它更紧凑 */}
        <div className="text-sm px-2 flex flex-nowrap justify-between">
            <div className="font-light text-gray-600 dark:text-gray-200">
                <i className="mr-2 fas fa-bullhorn" />{locale.COMMON.ANNOUNCEMENT}
            </div>
        </div>
        
        {/* 将之前的 pb-4（底部内边距）改成了 py-1（仅仅保留极小的上下内边距防贴边） */}
        {post && (<div id="announcement-content" className="flex flex-col justify-center items-center py-1">
            <style dangerouslySetInnerHTML={{
                __html: `
                /* Notion 节点高度和边距 */
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
                
                /* 隐藏空行的备用选项 */
                /*
                #announcement-content .notion-blank {
                    display: none !important;
                }
                */
                `
            }} />
            <NotionPage post={post} className='text-center ' />
        </div>)}
    </>
}
export default Announcement
