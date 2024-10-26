import styled from 'styled-components';
import { ResponsiveLine } from '@nivo/line';

type ForecastData = {
    fcstTime: string;
    fcstValue: string;
}

type props = {
    tmp: ForecastData[]
}

const Graph: React.FC<props> = ({ tmp }) => {
    const data = [{
        id: 'line',
        color: '#0EA5E9',
        data: [
            { x: tmp[0]?.fcstTime, y: parseFloat(tmp[0]?.fcstValue) || 0 },
            { x: tmp[1]?.fcstTime, y: parseFloat(tmp[1]?.fcstValue) || 0 },
            { x: tmp[2]?.fcstTime, y: parseFloat(tmp[2]?.fcstValue) || 0 }
        ]
    }]

    return (
        <div className='h-[400px] w-full'>
            <ResponsiveLine 
                data={data}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: "linear" }}
                yScale={{
                    type: "linear",
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false,
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'transportation',
                    legendOffset: 36,
                    legendPosition: 'middle',
                    truncateTickAt: 0
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'count',
                    legendOffset: -40,
                    legendPosition: 'middle',
                    truncateTickAt: 0
                }}
                enableGridX={false}
                colors={{ scheme: 'nivo' }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                enablePointLabel={true}
                pointLabel="data.yFormatted"
                pointLabelYOffset={-12}
                enableArea={true}
                enableCrosshair={false}
                enableTouchCrosshair={true}
                useMesh={true}
                legends={[]}
            />
        </div>
    )
}

export default Graph