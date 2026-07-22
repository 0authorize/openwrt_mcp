import { getNetworkStatus } from '../services/NetworkStatus_Service.js'

export function register_NetworkStatus_Tools(server){

    server.tool(
        "get_network_status",
        "获取 OpenWrt 网络连接状态，包括WAN接口状态、默认路由、公网IPv4/IPv6地址、DNS服务状态以及外网连通性测试。适用于检查网络是否正常、判断是否断网、检测DNS异常以及确认代理链路是否可用。",
        {},
        async () => {

            const result = await getNetworkStatus();

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