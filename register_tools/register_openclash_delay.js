import { getOpenClashProxyGroupAndDelay } from '../services/services/OpenClashSpeedTest_Servive.js'

export function register_OpenClashProxyGroupAndDelay_Tools(server){

    server.tool(
        "get_openclash_proxy_group_and_delay",
        "获取 OpenClash 当前所有代理策略组以及每个策略组当前选择的节点以及各个节点的速度，该操作耗时较长，当用户想查看节点速度的时候可以调用。用于查看当前使用的代理位置、可用节点以及后续切换代理节点。",
        {},
        async () => {

            const result = await getOpenClashProxyGroupAndDelay();

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