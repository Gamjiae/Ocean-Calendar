import { ResponsiveLine } from '@nivo/line';
import { WaterTempItem } from '../util/interface';

interface props {
    tmp: WaterTempItem[];
    text?: string;
    style?: React.CSSProperties;
}

const formatTime = (d: string): string => {
    const hours = d.slice(8, 10);
    const minutes = d.slice(10, 12);
    return `${hours}:${minutes}`;
}

const Graph: React.FC<props> = ({ tmp, text }) => {
    const data = [{
        id: 'line',
        data: tmp.map(item => ({
            x: formatTime(item.tm) || 0,
            y: parseFloat(item.tw) || 0
        }))
    }]
    
    const minValue = Math.min(...tmp.map(item => parseFloat(item.tw) || 0));
    console.log(data);

    return (
        <div className='w-full h-full mb-[50px]'>
            <p>{text}</p>
            <ResponsiveLine 
                colors={'LightSkyBlue'}
                data={data}
                margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
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
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false,
                }}
                yFormat=" >-.2f"
                curve='linear'
                axisBottom={{
                    format: '%H:%M',
                    tickValues: 'every 1 hour',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    truncateTickAt: 0
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    truncateTickAt: 0
                }}
                enableGridX={false}
                pointSize={10}
                pointBorderWidth={1}
                enablePointLabel={true}
                pointLabel="data.yFormatted"
                pointLabelYOffset={-12}
                enableArea={true}
                areaBaselineValue={minValue}
                enableCrosshair={false}
                useMesh={true}
            />
        </div>
    )
}

export default Graph