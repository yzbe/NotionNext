import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'

const Logo = props => {
  const { className } = props
  return (
    <SmartLink href='/' passHref legacyBehavior>
      {/* 这里的 style 确保背景色强制为 #1F2937 */}
      <div
        style={{ backgroundColor: '#1F2937' }}
        className={
          'flex flex-col justify-center items-center cursor-pointer font-bold w-full h-full min-h-[60px] md:min-h-[120px] ' +
          className
        }>
        
        <div
          data-aos='fade-down'
          data-aos-duration='500'
          data-aos-once='true'
          data-aos-anchor-placement='top-bottom'
          className='font-serif text-xl md:text-2xl text-white bg-transparent text-center px-4'>
          {siteConfig('TITLE')}
        </div>
        
        {/* 描述文字 - 可选 */}
        <div
          className='text-xs text-gray-400 font-light text-center bg-transparent mt-1 hidden md:block'>
          {siteConfig('DESCRIPTION')}
        </div>
      </div>
    </SmartLink>
  )
}
export default Logo
