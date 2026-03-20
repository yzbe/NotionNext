import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'

const Logo = props => {
  const { className } = props
  return (
    <SmartLink href='/' passHref legacyBehavior>
      <div
        className={
          // 在这里删除了 bg-black 和 dark:bg-gray-800，加入了 bg-transparent
          'flex flex-col justify-center items-center cursor-pointer bg-transparent space-y-3 font-bold ' +
          className
        }>
        <div
          data-aos='fade-down'
          data-aos-duration='500'
          data-aos-once='true'
          data-aos-anchor-placement='top-bottom'
          className='font-serif text-xl text-white logo'>
          {' '}
          {siteConfig('TITLE')}
        </div>
        <div
          data-aos='fade-down'
          data-aos-duration='500'
          data-aos-delay='300'
          data-aos-once='true'
          data-aos-anchor-placement='top-bottom'
          className='text-sm text-gray-300 font-light text-center'>
          {' '}
          {siteConfig('DESCRIPTION')}
        </div>
      </div>
    </SmartLink>
  )
}
export default Logo
