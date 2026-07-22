import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { exec } from "child_process";


const server = new Server(
    {
        name: "ping-agent",
        version: "1.0.0"
    },
    {
        capabilities: {
            tools: {}
        }
    }
);


// 注册一个工具
server.tool(
    "ping_baidu",
    "Ping百度测试网络是否连通",
    {},
    async () => {
        const result = await new Promise((resolve)=>{

            exec(
                "ping www.baidu.com -n 4",
                (error, stdout)=>{

                    resolve(stdout || error.message);

                }
            );

        });
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

// 使用stdio通信
const transport = new StdioServerTransport();

await server.connect(transport);
// server.tool(
//     工具名称,
//     工具描述,
//     参数定义,
//     执行函数
// )
server.tool(
    "ping_host",
    "测试指定主机是否连通",
    {
        type:"object",
        properties:{
            host:{
                type:"string",
                description:"目标域名或者IP"
            }
        },
        required:[
            "host"
        ]
    },
    async({host})=>{

        return {
            content:[
                {
                    type:"text",
                    text:`正在ping ${host}`
                }
            ]
        };

    }
)
//模型会传回：
// {
//     "name":"ping_host",
//     "arguments":{
//         "host":"baidu.com"
//     }
// }
// MCP收到会传回：
// {
//  "host":"baidu.com"
// }
// 所以把host解析出来


// 工具:
// ping_host

// 说明:
// 测试指定主机是否连通

// 参数:

// host:
//   类型 string
//   描述:
//     目标域名或者IP