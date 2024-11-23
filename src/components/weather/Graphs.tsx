import { useQuery } from "@tanstack/react-query";
import { useBeachStore } from "../../util/useStore";
import TempGraph from "./TempGraph";
import WsdGraph from "./WsdGraph";
import { useEffect } from "react";
import { processWeatherItems } from "../../util/apiUtils";
import { Fcst } from "../../util/interface";

interface Props {
    tmp: Fcst[]
}

const Graphs: React.FC<Props> = ({tmp}) => {
    return (
        <div className="p-[30px] w-3/5 h-[300px]">
            <TempGraph tmp={tmp}/>
            {/* <WsdGraph /> */}
        </div>
    )
}

export default Graphs;