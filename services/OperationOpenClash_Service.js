import {ssh_and_run_command} from "../tools/ssh.js";


const command_map = {

    start:{
        name:"开启OpenClash",
        command:"/etc/init.d/openclash start"
    },

    stop:{
        name:"关闭OpenClash",
        command:"/etc/init.d/openclash stop"
    },

    restart:{
        name:"重启OpenClash",
        command:"/etc/init.d/openclash restart"
    },

    update:{
        name:"更新OpenClash配置",
        command:"/usr/share/openclash/openclash.sh CC2"
    }

};



export async function OperationOpenclashStatus(mode){

    const operation = command_map[mode];

    if(!operation){
        throw new Error(
            `不支持的操作:${mode}`
        );
    }

    return await ssh_and_run_command(operation.command);
}