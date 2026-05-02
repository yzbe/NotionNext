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
          // ⭐️ 悬浮卡片式设计核心修改：
          // 1. lg:bg-white dark:lg:bg-hexo-black-gray: 桌面端赋予卡片实体的背景色
          // 2. lg:shadow-md lg:hover:shadow-lg: 增加阴影，鼠标悬停时阴影加深，体现悬浮感
          // 3. lg:rounded-xl: 增加圆角，让卡片看起来更柔和
          // 4. lg:p-6 lg:mb-4 lg:mx-2: 增加内边距让内容居中呼吸，外边距让卡片与周围元素拉开距离
          // 5. 手机端保持 bg-transparent 融入顶部导航
          'flex flex-col justify-center items-center cursor-pointer bg-transparent lg:bg-white dark:lg:bg-hexo-black-gray lg:shadow-sm lg:hover:shadow-md lg:rounded-xl lg:py-6 lg:mb-4 lg:mx-2 transition-shadow duration-300 w-full space-y-3 font-bold ' +
          className
        }>
            
          {/* 移动端专属的圆形头像：进一步精简尺寸与光圈 */}
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
