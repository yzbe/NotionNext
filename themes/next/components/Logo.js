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
          'flex flex-col justify-center items-center cursor-pointer bg-[#1F2937] dark:bg-[#1F2937] w-full space-y-3 font-bold ' +
          className
        }>
        
               {/* 移动端专属的圆形头像：增加了容器和边框样式 */}
        <div className='block lg:hidden'>
            <div className="p-0.2 rounded-full bg-white/10 border border-white/10 shadow-inner">
                <LazyImage 
                  src={avatar} 
                  className='h-9 w-9 rounded-full object-cover shadow-sm' 
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
