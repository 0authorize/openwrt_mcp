import { ssh_and_run_command } from "../tools/ssh.js";


const command = `
curl -s \
-H "Authorization: Bearer sC5VcFUh" \
http://127.0.0.1:9090/proxies
`;


export async function getOpenClashProxyGroup() {

    try {

        const result = await ssh_and_run_command(command);


        // SSH返回的是字符串，需要解析
        const clashData = JSON.parse(result);


        const proxies = clashData.proxies;


        const groups = [];


        for (const [name, proxy] of Object.entries(proxies)) {


            // 只取Selector类型的代理组
            if(proxy.type === "Selector"){

                groups.push({

                    name:name,

                    current:proxy.now,

                    nodes:proxy.all

                });

            }

        }


        return groups;


    } catch(error){

        throw error;

    }

}这个能不能直接改