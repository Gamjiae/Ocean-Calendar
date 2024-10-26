type props = {
   
}

const Weather: React.FC<props> = () => {
    return (
        <div className="bg-white opacity-70 w-[250px] h-[290px]">
            {/* 3시간 동안의 수온변화 그래프 */}
            <span>21도</span>
            <span className="text-gray-600">비, 구름 많음</span>
        </div>
    )
}

export default Weather