import { ssh_and_run_command } from "../tools/ssh.js";


const token = "sC5VcFUh";


async function getProxyDelay(node){

    const command = `
curl -s \
-H "Authorization: Bearer ${token}" \
"http://127.0.0.1:9090/proxies/${encodeURIComponent(node)}/delay?timeout=5000&url=http://www.gstatic.com/generate_204"
`;

    try {

        const result = await ssh_and_run_command(command);

        const data = JSON.parse(result);

        return data.delay ?? -1;

    } catch(error){

        return -1;

    }

}



export async function getOpenClashProxyGroupAndDelay() {


    const command = `
curl -s \
-H "Authorization: Bearer ${token}" \
http://127.0.0.1:9090/proxies
`;


    try {


        const result = await ssh_and_run_command(command);


        const clashData = JSON.parse(result);


        const proxies = clashData.proxies;


        const groups = [];


        for (const [name, proxy] of Object.entries(proxies)) {


            // 只获取策略组
            if(proxy.type === "Selector"){


                const nodeList = proxy.all.filter(node =>
                    node !== "DIRECT" &&
                    node !== "REJECT"
                );


                // 并发测速
                const nodes = await Promise.all(

                    nodeList.map(async(node)=>{

                        const delay = await getProxyDelay(node);

                        return {

                            name:node,

                            delay

                        };

                    })

                );


                groups.push({

                    name:name,

                    current:proxy.now,

                    nodes:nodes

                });


            }

        }


        return groups;


    } catch(error){

        throw error;

    }

}