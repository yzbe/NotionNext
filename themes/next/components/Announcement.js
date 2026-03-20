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
        {post && (<div id="announcement-content">
            {/* 注入 CSS 压缩高度，同时将隐藏空行的代码注释掉备用 */}
            <style dangerouslySetInnerHTML={{
                __html: `
                #announcement-content .notion {
                    min-height: auto !important;
                    padding: 0 !important;
                }
                #announcement-content .notion-page {
                    min-height: auto !important;
                    padding: 0.5rem 0 !important;
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
