import { ResponsiveLine } from '@nivo/line';
import { WaterTempItem } from '../util/interface';

type props = {
    tmp: WaterTempItem[]
}

const formatTime = (d: string): string => {
    const hours = d.slice(8, 10);
    const minutes = d.slice(10, 12);
    return `${hours}:${minutes}`;
}

const Graph: React.FC<props> = ({ tmp }) => {
    const data = [{
        id: 'line',
        data: tmp.map(item => ({
            x: formatTime(item.tm),
            y: parseFloat(item.tw) || 0
        }))
    }]
    
    console.log(data);

    return (
        <div className='h-4/5 w-full pb-6'>
            <ResponsiveLine 
                colors={'LightSkyBlue'}
                data={data}
                margin={{ top: 10, right: 30, bottom: 50, left: 60 }}
                xFormat="time:%H:%M"
                xScale={{ 
                    type: "time",
                    format: "%H:%m",
                    useUTC: false,
                    min: 'auto',
                    max: 'auto',
                }}
                yScale={{
                    type: "linear",
                    min: 10,
                    max: 25,
                    stacked: true,
                    reverse: false,
                }}
                yFormat=" >-.2f"
                curve='linear'
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    format: '%H:%M',
                    tickValues: 'every 1 hour',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '시간',
                    legendOffset: 36,
                    legendPosition: 'end',
                    truncateTickAt: 0
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '수온',
                    legendOffset: -40,
                    legendPosition: 'end',
                    truncateTickAt: 0
                }}
                enableGridX={false}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                enablePointLabel={true}
                pointLabel="data.yFormatted"
                pointLabelYOffset={-12}
                enableArea={true}
                areaBaselineValue={10}
                enableCrosshair={false}
                enableTouchCrosshair={true}
                useMesh={true}
                legends={[]}
            />
        </div>
    )
}

export default Graph