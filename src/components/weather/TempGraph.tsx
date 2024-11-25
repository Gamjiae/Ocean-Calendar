import { ResponsiveLine } from '@nivo/line';
import { Fcst } from '../../util/interface';

interface Prop {
    fcstData: Fcst[];
    text: string;
    style?: React.CSSProperties;
}

const formatTime = (d: string, t: string): string => {
    const month = d.slice(4, 6);
    const day = d.slice(6, 8);
    const hours = t.slice(0, 2);
    const minutes = t.slice(2, 4);
    console.log(month);
    return `${month}/${day}${hours}:${minutes}`;
}

const TempGraph: React.FC<Prop> = ({fcstData, text, style}) => {
    const data = [{
        id: 'line',
        data: fcstData.map((item) => ({
            x: formatTime(item.fcstDate, item.fcstTime),
            y: parseFloat(item.fcstValue) || 0
        }))
    }]

    const minValue = Math.min(...fcstData.map(item => parseFloat(item.fcstValue) || 0));
    console.log(fcstData[0].fcstDate);
    console.log(`graph ${text} data:`, data[0]);

    return ( 
        <div className='h-full w-full mb-[50px]' style={style}>
            <p>{text}</p>
            <ResponsiveLine 
                colors={'LightSkyBlue'}
                data={data}
                margin={{ top: 20, right: 40, bottom: 50, left: 60 }}
                xFormat="time:%m월 %d일 %H:%M"
                xScale={{ 
                    type: "time",
                    format: "%m/%d%H:%m",
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
                    format: '%m월%d일 %H:%M',
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

export default TempGraph