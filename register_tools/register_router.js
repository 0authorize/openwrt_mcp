import { getRouterStatus } from '../services/RouterStatus_Service.js'

export function register_RouterStatus_Tools(server){

    server.tool(
        "get_router_status",
        "获取 OpenWrt 路由器整体运行状态，包括系统负载、内存使用、磁盘空间、OpenClash运行状态、网络接口信息、在线设备列表、ARP邻居以及WiFi基础信息。适用于检查路由器是否正常运行、排查系统资源问题以及查看当前连接设备。",
        {},
        async () => {

            const result = await getRouterStatus();

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