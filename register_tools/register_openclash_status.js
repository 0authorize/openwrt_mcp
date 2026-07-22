import { getOpenClashStatus } from '../services/OpenClashStatus_Service.js'

export function register_OpenClashStatus_Tools(server){

    server.tool(
        "get_openclash_status",
        "获取 OpenClash 当前运行状态，包括服务状态、核心运行状态、当前配置、代理模式、TUN/Fake-IP状态、监听端口、代理策略组以及最近错误日志。用于诊断 OpenClash 是否正常运行、检查代理模式和排查代理连接问题。",
        {},
        async () => {

            const result = await getOpenClashStatus();

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