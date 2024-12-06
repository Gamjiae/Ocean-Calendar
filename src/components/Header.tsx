import { Link } from "react-router-dom";

interface HeaderProps {
  showTitle?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showTitle = true }) => {
  return (
    <div className='flex items-center h-[60px] w-screen text-white'
    style={{backgroundColor: '#1e1b4b'}}>
      {/* 사이트 이름 */}
      <div className='flex items-center'>
        <Link to='/'>
          <div className="flex">
            <img className='w-[30px] h-[30px] ml-3' src='images/titleImage.png' alt="Ocean Calendar logo"/>
            {showTitle && (
              <span className='opacity-80 text-2xl ml-5 hidden md:block'>Ocean Calendar</span>
            )}
          </div>
        </Link>
      </div>

      {/* 네비게이션 */}
      <div className='flex justify-evenly flex-grow text-sm'>
        <Link to={'/weather'} className='flex items-center'>
          <img className='w-6 h-6 mr-[9px]' src='images/weather.png' />
          <span>날씨 예보</span>
        </Link>
        <Link to={'/temp'} className='flex items-center'>
          <img className='w-6 h-6 mr-[9px]' src='images/temperature.png'/>
          <span>수온 정보</span>
        </Link>
        <Link to={'/tide'} className='flex items-center'>
          <img className='w-6 h-6 mr-[9px]' src='images/tide.png'/>
          <span>조석 정보</span>
        </Link>
        <Link to={'/wave'} className='flex items-center'>
          <img className='w-6 h-6 mr-[9px]' src='images/wave.png'/>
          <span>파고 정보</span>
        </Link>
      </div>
    </div>
  );
}

export default Header;