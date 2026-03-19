import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'

const Logo = props => {
  const { className } = props
  return (
    <SmartLink href='/' passHref legacyBehavior>
      {/* 1. 背景改为固定的 #1F2937，移除了 dark 模式下的颜色切换 */}
      <div
        style={{ backgroundColor: '#1F2937' }}
        className={
          'flex flex-col justify-center items-center cursor-pointer min-h-[120px] w-full ' +
          className
        }>
        
        {/* 2. 标题文字：确保背景透明，文字水平居中 */}
        <div
          data-aos='fade-down'
          data-aos-duration='500'
          data-aos-once='true'
          data-aos-anchor-placement='top-bottom'
          className='font-serif text-2xl text-white bg-transparent text-center'>
          {siteConfig('TITLE')}
        </div>

        {/* 3. 如果不需要显示描述文字，可以将下面这段 div 删除 */}
        <div
          data-aos='fade-down'
          data-aos-duration='500'
          data-aos-delay='300'
          data-aos-once='true'
          data-aos-anchor-placement='top-bottom'
          className='text-xs text-gray-400 font-light text-center bg-transparent mt-1'>
          {siteConfig('DESCRIPTION')}
        </div>
      </div>
    </SmartLink>
  )
}
export default Logo
