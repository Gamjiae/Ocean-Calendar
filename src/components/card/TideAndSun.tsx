const TideAndSun: React.FC = () => {
    return (
        <div className="bg-white opacity-70 w-[250px] h-[290px]">
            {/* 조석 */}
            <span>21도</span>

            {/* 일출, 일몰 */}
            <div className="flex justify-between text-sm bottom-2">
                <div className="flex">
                    <img
                        className="w-7 h-5 mr-1" 
                        src="images/sunrise.png"
                    />
                    <span>05 : 21</span>
                </div>
                <div className="flex">
                    <img
                        className="w-7 h-5 mr-1" 
                        src="images/sunset.png"
                    />
                    <span>19 : 40</span>
                </div>
            </div>
        </div>
    )
}

export default TideAndSun