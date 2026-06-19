import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import LazyImage from '@/components/LazyImage'

const Logo = props => {
  const { className, siteInfo } = props 
  
  const avatar = siteInfo?.icon || siteConfig('AUTHOR_IMAGE') || '/avatar.svg'

  return (
    <SmartLink href='/' passHref legacyBehavior>
      <div className={'group w-full cursor-pointer lg:-mb-2 ' + className}>
        <div className='flex flex-col justify-center items-center w-full lg:py-6 space-y-3 font-bold'>
          
          {/* === 移动端 Logo (静止无动画) === */}
          <div className='block lg:hidden'>
              <div className="p-[0px] rounded-full bg-white/20 border border-white/40">
                  <LazyImage 
                    src={avatar} 
                    className='h-10 w-10 rounded-full object-cover' 
                    alt={siteConfig('TITLE')} 
                  />
              </div>
          </div>

          {/* === 桌面端 Logo (保留悬停平滑放大特效) === */}
          <div className='hidden lg:block w-full'>
              <div
                data-aos='fade-down'
                data-aos-duration='500'
                data-aos-once='true'
                data-aos-anchor-placement='top-bottom'
                className='w-full text-center'>
                {/* 此处应用 group-hover:scale-110 放大特效 */}
                <div className='font-sans font-extrabold text-3xl text-gray-900 dark:text-white logo inline-block transform transition-transform duration-500 group-hover:scale-110'>
                  {siteConfig('TITLE')}
                </div>
              </div>
              
              {siteConfig('DESCRIPTION') && (
              <div
                  data-aos='fade-down'
                  data-aos-duration='500'
                  data-aos-delay='300'
                  data-aos-once='true'
                  data-aos-anchor-placement='top-bottom'
                  className='text-sm text-gray-700 dark:text-gray-300 font-light text-center mt-3 w-full px-2 break-words'>
                  {siteConfig('DESCRIPTION')}
              </div>
              )}
          </div>

        </div>

        {/* logo下悬浮短线 */}
        <div className='hidden lg:block w-[85%] mx-auto h-[1px] bg-black/30 dark:bg-white/30'></div>

      </div>
    </SmartLink>
  )
}
export default Logo