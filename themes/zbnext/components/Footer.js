import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import { siteConfig } from '@/lib/config'

const Footer = ({ title }) => {
  const d = new Date()
  const currentYear = d.getFullYear()
  const since = siteConfig('SINCE')
  const copyrightDate =
    parseInt(since) < currentYear ? since + '-' + currentYear : currentYear

  // 判断是否存在任何备案信息
  const beiAn = siteConfig('BEI_AN')
  const beiAnGongAn = siteConfig('BEI_AN_GONG_AN')
  const hasBeiAn = Boolean(beiAn || beiAnGongAn)

  // ⭐️ 提取统一的分隔符样式，强制字号、字体、颜色绝对一致，不受父级影响
  const divider = (
    <span className='text-gray-600 dark:text-gray-500 text-sm font-sans font-normal select-none mr-4'>
      |
    </span>
  )

  return (
    <footer className='relative z-10 dark:bg-hexo-black-gray flex-shrink-0 w-full text-sm py-2.5 px-4 bg-white dark:text-gray-400 rounded-xl flex flex-col justify-center items-center gap-y-1.5'>
      
      {/* 第一排：年份 | 博客标题 | 访客统计(PV UV) | Powered by */}
      <div className='flex flex-wrap justify-center items-center gap-x-4 leading-none'>
        
        {/* 1. 年份 */}
        <span className='inline-flex items-center'>
          <i className='fas fa-copyright mr-1' />
          <span>{`${copyrightDate}`}</span>
        </span>

        {/* 2. 博客标题 */}
        {title && (
          <span className='font-medium inline-flex items-center'>
            {divider}
            <span>{title}</span>
          </span>
        )}

        {/* 3. 访客统计 PV */}
        <span className='hidden busuanzi_container_site_pv items-center'>
          {divider}
          <i className='fas fa-eye mr-1' />
          <span className='busuanzi_value_site_pv' />
        </span>

        {/* 访客统计 UV（不需要分隔符） */}
        <span className='hidden busuanzi_container_site_uv items-center'>
          <i className='fas fa-users mr-1' />
          <span className='busuanzi_value_site_uv' />
        </span>

        {/* 4. Powered by */}
        <span className='text-xs font-serif text-gray-500 dark:text-gray-300 inline-flex items-center'>
          {/* 这里直接调用统一的 divider，它的样式会覆盖外层的 serif 字体 */}
          {divider}
          <span>
            Powered by&nbsp;
            <a
              href='https://github.com/tangly1024/NotionNext'
              className='underline hover:text-blue-500 transition-colors'>
              NotionNext {siteConfig('VERSION')}
            </a>
          </span>
        </span>
      </div>

      {/* 第二排：备案信息 */}
      {hasBeiAn && (
        <div className='flex flex-wrap justify-center items-center gap-x-4 text-xs leading-none'>
          {beiAn && (
            <span className='inline-flex items-center'>
              <i className='fas fa-shield-alt mr-1' />
              <a href={siteConfig('BEI_AN_LINK')} className='hover:underline'>
                {beiAn}
              </a>
            </span>
          )}
          <BeiAnGongAn />
        </div>
      )}

    </footer>
  )
}

export default Footer