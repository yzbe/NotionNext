import { useGlobal } from '@/lib/global'
import dynamic from 'next/dynamic'

const NotionPage = dynamic(() => import('@/components/NotionPage'))

const Announcement = ({ post, className }) => {
  const { locale } = useGlobal()
  if (!post) {
    return <></>
  }
  return <>
        <div className="text-sm pb-1 px-2 flex flex-nowrap justify-between">
            <div className="font-light text-gray-600  dark:text-gray-200">
                <i className="mr-2 fas fa-bullhorn" />{locale.COMMON.ANNOUNCEMENT}
            </div>
        </div>
        {post && (<div id="announcement-content" className="flex flex-col justify-center items-center pb-4">
            {/* 注入极端的 CSS 覆盖，彻底干掉 Notion 的默认排版空间 */}
            <style dangerouslySetInnerHTML={{
                __html: `
                #announcement-content .notion {
                    min-height: auto !important;
                    padding: 0 !important;
                    margin: 0 !important;
                }
                #announcement-content .notion-page {
                    min-height: auto !important;
                    padding: 0 !important; /* 彻底去掉上下边距 */
                    margin: 0 !important; /* 彻底去掉外边距 */
                }
                /* 针对段落标签 p 强制去掉默认的 margin-top 和 margin-bottom */
                #announcement-content .notion-text {
                    margin-top: 0 !important;
                    margin-bottom: 0 !important;
                    padding: 0 !important;
                    line-height: 1.5 !important;
                }
                
                /* 备用：隐藏 Notion 里的回车空行。
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
