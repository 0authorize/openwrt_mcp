import { OperationOpenclashStatus } from '../services/OperationOpenClash_Service.js'
export function register_OperationOpenclashStatus_Tools(server){
server.tool(
    "operation_openclash_status",
    `
    管理 OpenClash 运行状态。

    用于控制 OpenClash 服务运行状态，包括：
    - start: 启动 OpenClash 服务
    - stop: 停止 OpenClash 服务
    - restart: 重启 OpenClash 服务
    - update: 更新 OpenClash 当前配置文件

    适用场景:
    - 用户要求开启或关闭 OpenClash
    - 用户要求重启 OpenClash 使配置生效
    - 用户修改代理配置后需要重新加载配置
    - 用户要求更新当前 OpenClash 订阅配置

    注意:
    - stop 操作会导致局域网设备暂时失去代理能力
    - restart 和 update 操作会影响当前网络连接，可能导致已有连接短暂中断
    - 该操作会影响整个局域网设备的代理行为
    `,
    {
        operation: z.enum([
            "start",
            "stop",
            "restart",
            "update"
        ]).describe("OpenClash操作类型，可选 start/stop/restart/update")
    },
    async ({operation}) => {
        const result = await OperationOpenclashStatus(operation);

        return {
            content:[
                {
                    type:"text",
                    text:result
                }
            ]
        };
    }
);
}