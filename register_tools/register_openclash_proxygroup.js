import { getOpenClashProxyGroup } from '../services/OpenClashProxyGroup_Service.js'

export function register_OpenClashProxyGroup_Tools(server){

    server.tool(
        "get_openclash_proxy_group",
        "获取 OpenClash 当前所有代理策略组以及每个策略组当前选择的节点。用于查看当前使用的代理位置、可用节点以及后续切换代理节点。",
        {},
        async () => {

            const result = await getOpenClashProxyGroup();

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