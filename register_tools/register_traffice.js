import { getTrafficeStastice } from '../services/TrafficeStatistics_Service.js'

export function register_TrafficeStatice_Tools(server){

    server.tool(
        "get_traffice_stastice",
        "获取 OpenWrt 当前网络流量状态，包括局域网实时上传下载速度、WiFi客户端流量统计、在线设备信息以及当前网络连接数量。适用于查询当前谁正在占用网络、分析设备网络使用情况。",
        {},
        async () => {

            const result = await getTrafficeStastice();

            return {
                content:[
                    {
                        type:"text",
                        text: JSON.stringify(result, null, 2)
                    }
                ]
            };
        }
    );

}