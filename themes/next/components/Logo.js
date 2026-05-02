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
          // ⭐️ 核心修改：
          // 1. 彻底删除了 lg:hover:-translate-y-1 (取消物理上浮)
          // 2. 加上了与 Card.js 完全同款的自定义柔和白光：dark:lg:hover:shadow-[0_0_20px_rgba(255,255,255,0.06)]
          // 3. 补上了日间模式的 lg:hover:shadow-xl 保证两边动画强度一致
          'flex flex-col justify-center items-center cursor-pointer bg-transparent lg:bg-gradient-to-br lg:from-[#eef0f1] lg:to-[#9ca3af] lg:border lg:border-gray-200 dark:lg:border-transparent lg:shadow-sm lg:hover:shadow-xl dark:lg:hover:shadow-[0_0_20px_rgba(255,255,255,0.06)] lg:rounded-xl lg:py-5 lg:mb-4 lg:mx-1 lg:mt-1 lg:w-auto transition-shadow duration-300 w-full space-y-3 font-bold ' +
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
            className='font-serif text-xl text-gray-900 logo text-center w-full'>
            {siteConfig('TITLE')}
            </div>
            
            {siteConfig('DESCRIPTION') && (
            <div
                data-aos='fade-down'
                data-aos-duration='500'
                data-aos-delay='300'
                data-aos-once='true'
                data-aos-anchor-placement='top-bottom'
                className='text-sm text-gray-700 font-light text-center mt-3 w-full px-2 break-words'>
                {siteConfig('DESCRIPTION')}
            </div>
            )}
        </div>

      </div>
    </SmartLink>
  )
}
export default Logo
