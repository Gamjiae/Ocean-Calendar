type props = {
    emoji: string,
    sky: string,
    tmp: string,
    pty: string
}

const Weather: React.FC<props> = ({ emoji, sky, tmp, pty }) => {
    return (
        // 나중에 이거 다른 카드에도 적용하셈
        <div className="flex items-center justify-center flex-col bg-white opacity-65 w-[250px] h-[290px] rounded-3xl"> 
            <img className='w-[100px] mb-10' src={emoji} alt='Weather Emoji'/>
            <div className="text-lg font-medium">{tmp} ℃</div>
            <span className="text-gray-600 mt-5 text-sm">{pty}, {sky}</span>
        </div>
    )
}

export default Weather