import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import LazyImage from '@/components/LazyImage'

const Logo = props => {
  const { className, siteInfo } = props 
  
  const avatar = siteInfo?.icon || siteConfig('AUTHOR_IMAGE') || '/avatar.svg'

  return (
    <SmartLink href='/' passHref legacyBehavior>
      {/* 下方菜单的紧凑间距 */}
      <div className={'w-full cursor-pointer -mb-2 ' + className}>
        
        {/*  py-6（上下等距的内边距） */}
        <div className='flex flex-col justify-center items-center w-full py-6 space-y-3 font-bold'>
          
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
                className='font-sans font-extrabold text-xl text-gray-900 dark:text-white logo text-center w-full'>
                {siteConfig('TITLE')}
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