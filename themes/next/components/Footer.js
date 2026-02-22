import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import { siteConfig } from '@/lib/config'

const Footer = ({ title }) => {
  const d = new Date()
  const currentYear = d.getFullYear()
  const since = siteConfig('SINCE')
  const copyrightDate =
    parseInt(since) < currentYear ? since + '-' + currentYear : currentYear

  return (
    <footer className='relative z-10 dark:bg-gray-800 flex-shrink-0 justify-center text-center m-auto w-full leading-6 text-sm py-2 bg-white dark:text-gray-400'>
      {/* 使用 flex 布局让所有元素在一行水平居中，gap-x-4 控制元素间的间距 */}
      <div className='flex flex-wrap justify-center items-center gap-x-6'>
    
        {/* 1. 版权图标与年份 */}
        <span>
          <i className='fas fa-copyright' /> {`${copyrightDate}`}
        </span>

        {/* 2. 博客标题 */}
        <span className='font-medium'>
          {title}
        </span>

        {/* 3. Powered by 信息 */}
        <span className='text-xs font-serif text-gray-500 dark:text-gray-300'>
          Powered by{' '}
          <a
            href='https://github.com/tangly1024/NotionNext'
            className='underline hover:text-blue-500 transition-colors'>
            NotionNext {siteConfig('VERSION')}
          </a>
        </span>
      </div>

      {/* 下面是备案信息，如果你的 Notion 里没填 BEI_AN，这部分会自动隐藏 */}
      <div className='mt-1 text-xs'>
        {siteConfig('BEI_AN') && (
          <>
            <i className='fas fa-shield-alt' />{' '}
            <a href={siteConfig('BEI_AN_LINK')} className='mr-2'>
              {siteConfig('BEI_AN')}
            </a>
          </>
        )}
        <BeiAnGongAn />
      </div>

      {/* 隐藏的统计组件保持不动 */}
      <span className='hidden busuanzi_container_site_pv'>
        <i className='fas fa-eye' />
        <span className='px-1 busuanzi_value_site_pv'> </span>
      </span>
      <span className='pl-2 hidden busuanzi_container_site_uv'>
        <i className='fas fa-users' />
        <span className='px-1 busuanzi_value_site_uv'> </span>
      </span>
    </footer>
  )
}

export default Footer
