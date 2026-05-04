import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import LazyImage from '@/components/LazyImage'

const Logo = props => {
  const { className, siteInfo } = props 
  
  const avatar = siteInfo?.icon || siteConfig('AUTHOR_IMAGE') || '/avatar.svg'

  return (
    <SmartLink href='/' passHref legacyBehavior>
      <div
        className={
          // 修改点1：
          // 将 lg:rounded-xl 缩小为 lg:rounded-lg，以满足同心圆角视觉比例
          // 保持删除了 lg:mb-4，彻底消除 Logo 下方多余的空隙！
          'flex flex-col justify-center items-center cursor-pointer bg-transparent lg:bg-gradient-to-br lg:from-[#a9aec6] lg:via-[#dedede] lg:to-[#a9aec6] lg:border lg:border-gray-200 dark:border-transparent lg:rounded-lg lg:py-5 lg:mx-1 lg:mt-1 lg:w-auto w-full space-y-3 font-bold ' +
          className
        }>
            
          <div className='block lg:hidden'>
              <div className="p-[0px] rounded-full bg-white/10 border border-white/20">
                  <LazyImage 
                    src={avatar} 
                    className='h-8 w-8 rounded-full object-cover' 
                    alt={siteConfig('TITLE')} 
                  />
              </div>
          </div>

        <div className='hidden lg:block w-full'>
            <div
            data-aos='fade-down'
            data-aos-duration='500'
            data-aos-once='true'
            data-aos-anchor-placement='top-bottom'
            // 修改点2：
            // 移除了 font-serif 避免网络字体加载导致的文字闪烁
            // 替换为 font-sans font-extrabold，使用系统默认字体并加粗
            className='font-sans font-extrabold text-xl text-gray-900 logo text-center w-full'>
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