import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import LazyImage from '@/components/LazyImage'

const Logo = props => {
  //  从 props 中提取 siteInfo
  const { className, siteInfo } = props 
  
  // 优先使用 Notion 数据库设置的 Icon，如果没有再退回到配置文件里的头像
  const avatar = siteInfo?.icon || siteConfig('AUTHOR_IMAGE') || '/avatar.svg'

  return (
    <SmartLink href='/' passHref legacyBehavior>
      <div
        className={
          // ⭐️ 核心修正：
          // 1. lg:mx-1 lg:mt-1: 缩小左右间距，增加顶部间距，让四周留白看起来均匀统一。
          // 2. lg:hover:-translate-y-1: 增加“物理向上浮动”的动画，这是夜间模式下悬浮感的最强利器！
          // 3. dark:lg:hover:bg-gray-800: 夜间模式悬浮时背景微亮，弥补阴影看不见的缺陷。
          // 4. dark:lg:border-gray-700/50: 夜间模式边框改得更弱、更柔和，不再突兀。
          'flex flex-col justify-center items-center cursor-pointer bg-transparent lg:bg-white dark:lg:bg-hexo-black-gray lg:border lg:border-gray-100 dark:lg:border-gray-700/50 lg:shadow-sm lg:hover:shadow-md lg:rounded-xl lg:py-5 lg:mb-4 lg:mx-4 lg:mt-4 lg:w-auto transform transition-all duration-300 lg:hover:-translate-y-1 dark:lg:hover:bg-gray-800 w-full space-y-3 font-bold ' +
          className
        }>
            
          {/* 移动端专属的圆形头像 */}
          <div className='block lg:hidden'>
              <div className="p-[0px] rounded-full bg-white/10 border border-white/20">
                  <LazyImage 
                    src={avatar} 
                    className='h-8 w-8 rounded-full object-cover' 
                    alt={siteConfig('TITLE')} 
                  />
              </div>
          </div>

        {/* 桌面端专属的文字 Logo 和描述 */}
        <div className='hidden lg:block w-full'>
            <div
            data-aos='fade-down'
            data-aos-duration='500'
            data-aos-once='true'
            data-aos-anchor-placement='top-bottom'
            className='font-serif text-xl text-gray-900 dark:text-white logo text-center w-full'>
            {siteConfig('TITLE')}
            </div>
            
            {siteConfig('DESCRIPTION') && (
            <div
                data-aos='fade-down'
                data-aos-duration='500'
                data-aos-delay='300'
                data-aos-once='true'
                data-aos-anchor-placement='top-bottom'
                className='text-sm text-gray-500 dark:text-gray-400 font-light text-center mt-3 w-full px-2 break-words'>
                {siteConfig('DESCRIPTION')}
            </div>
            )}
        </div>

      </div>
    </SmartLink>
  )
}
export default Logo
