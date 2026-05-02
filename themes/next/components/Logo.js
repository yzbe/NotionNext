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
          // 1. lg:w-auto lg:mx-4: 放弃 w-full，改用 auto 加左右 margin，确保它绝对不会溢出外层容器！
          // 2. lg:border lg:border-gray-100 dark:lg:border-gray-800: 增加极细的实体边框，强制画出卡片界限。
          // 3. lg:shadow-md: 加深默认阴影，提升悬浮感。
          // 4. lg:mb-6: 增加底部外边距，拉开和菜单的距离。
          'flex flex-col justify-center items-center cursor-pointer bg-transparent lg:bg-white dark:lg:bg-hexo-black-gray lg:border lg:border-gray-100 dark:lg:border-gray-800 lg:shadow-md lg:hover:shadow-lg lg:rounded-xl lg:py-6 lg:mb-6 lg:mx-4 lg:w-auto transition-all duration-300 w-full space-y-3 font-bold ' +
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
