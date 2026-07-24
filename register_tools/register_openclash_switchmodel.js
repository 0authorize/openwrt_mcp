import { z } from 'zod'
import { switchOpenclashMode } from '../services/SwitchOpenClashModel_Service.js'

export function register_SwitchOpenClashModel_Tools(server){

    server.tool(
        "switch_openclash_proxy_mode",
    `
    切换 OpenClash 代理模式。

    用于修改 OpenClash 当前代理策略模式。

    支持模式:
    - rule: 规则模式，根据配置规则决定是否代理
    - global: 全局模式，所有流量经过代理
    - direct: 直连模式，所有流量不经过代理

    执行后会修改 OpenClash 配置并使配置生效。

    适用场景:
    - 用户要求切换代理模式
    - 用户需要测试代理是否正常
    - 当前规则模式导致某些网站无法访问，需要临时切换测试

    注意:
    该操作会影响整个局域网设备的代理行为。
    `,
        {
            mode: z.enum(["rule", "global", "direct"]).describe("切换OpenClash代理模式，可选 rule/global/direct")
        },
        async({mode})=>{
            const result = await switchOpenclashMode(mode);
            return {
                content:[
                    {
                        type:"text",
                        text:result
                    }
                ]
            }
        }
    )
}
