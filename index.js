import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import{ register_RouterStatus_Tools } from "./register_tools/register_router.js"
import{ register_NetworkStatus_Tools } from "./register_tools/register_network.js"

import{ register_TrafficeStatice_Tools } from "./register_tools/register_traffice.js"

import{ register_SwitchOpenClashModel_Tools } from "./register_tools/register_openclash_switchmodel.js"
import{ register_OpenClashStatus_Tools } from "./register_tools/register_openclash_status.js"
import{ register_OpenClashProxyGroup_Tools } from "./register_tools/register_openclash_proxygroup.js"
import{ register_OperationOpenclashStatus_Tools } from "./register_tools/register_openclash_operation.js"
import{ register_OpenClashProxyGroupAndDelay_Tools } from "./register_tools/register_openclash_delay.js"
const server = new McpServer(
    {
        name:"openwrt-control",
        version:"1.0.0"    
    },
    {
        capabilities:{
            tools:{}
        }
    }
)

register_RouterStatus_Tools(server);
register_NetworkStatus_Tools(server);
register_TrafficeStatice_Tools(server);
register_OpenClashStatus_Tools(server);
register_SwitchOpenClashModel_Tools(server);
register_OpenClashProxyGroup_Tools(server);
register_OperationOpenclashStatus_Tools(server);
register_OpenClashProxyGroupAndDelay_Tools(server);
const transport = new StdioServerTransport();

await server.connect(transport);