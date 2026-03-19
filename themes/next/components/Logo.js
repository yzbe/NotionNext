// themes/next/components/Logo.js
const Logo = props => {
  const { className } = props
  return (
    <SmartLink href='/' passHref legacyBehavior>
      {/* 关键：去掉 bg-black 或 style，改为 bg-transparent */}
      <div className={'flex flex-col justify-center items-center cursor-pointer bg-transparent ' + className}>
        <div className='font-serif text-xl text-white text-center bg-transparent'>
          {siteConfig('TITLE')}
        </div>
      </div>
    </SmartLink>
  )
}
