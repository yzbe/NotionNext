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
          // ⭐️ 极简分区策略：
          // 1. bg-transparent：完全舍弃色块背景，融入大环境
          // 2. lg:border-b：在桌面端底部加一条极细的边界线
          // 3. lg:border-gray-200 dark:lg:border-gray-800：线条颜色极淡，若有若无
          // 4. pb-6 mb-2：用留白（Whitespace）来辅助视觉分区，不拥挤
          'flex flex-col justify-center items-center cursor-pointer bg-transparent lg:border-b lg:border-gray-200 dark:lg:border-gray-800 pb-6 mb-2 w-full space-y-3 font-bold ' +
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
            // ⭐️ 核心修复：文字颜色改为 text-gray-900 dark:text-white，适配无底色状态
            className='font-serif text-xl text-gray-900 dark:text-white logo text-center'>
            {siteConfig('TITLE')}
            </div>
            
            {siteConfig('DESCRIPTION') && (
            <div
                data-aos='fade-down'
                data-aos-duration='500'
                data-aos-delay='300'
                data-aos-once='true'
                data-aos-anchor-placement='top-bottom'
                className='text-sm text-gray-500 dark:text-gray-400 font-light text-center mt-3'>
                {siteConfig('DESCRIPTION')}
            </div>
            )}
        </div>

      </div>
    </SmartLink>
  )
}
export default Logo
