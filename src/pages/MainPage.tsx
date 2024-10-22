import "../App.css"
import { useState } from 'react'

import Header from "../components/Header"
import AutoSearch from "../components/AutoSearch"

const MainPage: React.FC = () => {
    return (
        <div 
            className='w-screen h-screen bg-cover' 
            style={{backgroundImage: 'url(images/background.png)'}}
        >
            <Header showTitle={false}/>

            <span className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl">Ocean Calendar</span>

            
            
            <div className="absolute flex w-4/5 justify-around top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-10">
                {/* 날씨 */}
                <div className="bg-white opacity-70 w-[340px] h-[290px]">
                    {/* 현재 하늘상태에 따라 바뀌는 날씨 이미지 */}
                    <span>21도</span>
                    <span className="text-gray-600">비, 구름 많음</span>
                </div>

                {/* 수온 */}
                <div className="bg-white opacity-70 w-[340px] h-[290px]">
                    {/* 3시간 동안의 수온변화 그래프 */}
                    <span>21도</span>
                    <span className="text-gray-600">비, 구름 많음</span>
                </div>

                {/* 조석, 일출, 일몰 */}
                <div className="bg-white opacity-70 w-[340px] h-[290px]">
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
            </div>
            <AutoSearch/>
        </div>
    )
}

export default MainPage