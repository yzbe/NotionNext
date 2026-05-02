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
          // ⭐️ 核心调整：去掉了分割线，将夜间模式的底色改为了暗一点的 dark:lg:bg-gray-900/90
          // 这样就通过自然的明暗对比，完美区分了 Logo 区和下方的菜单区
          'flex flex-col justify-center items-center cursor-pointer bg-transparent lg:bg-[#18181B]/90 dark:lg:bg-gray-900/90 w-full space-y-3 font-bold ' +
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
        <div className='hidden lg:block'>
            <div
            data-aos='fade-down'
            data-aos-duration='500'
            data-aos-once='true'
            data-aos-anchor-placement='top-bottom'
            className='font-serif text-xl text-white logo text-center'>
            {siteConfig('TITLE')}
            </div>
            
            {siteConfig('DESCRIPTION') && (
            <div
                data-aos='fade-down'
                data-aos-duration='500'
                data-aos-delay='300'
                data-aos-once='true'
                data-aos-anchor-placement='top-bottom'
                className='text-sm text-gray-500 dark:text-gray-300 font-light text-center mt-3'>
                {siteConfig('DESCRIPTION')}
            </div>
            )}
        </div>

      </div>
    </SmartLink>
  )
}
export default Logo
