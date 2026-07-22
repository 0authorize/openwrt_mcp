import {ssh_and_run_command} from "../tools/ssh.js";


const mode_map = {

    rule:{
        name:"规则模式",
        value:"rule"
    },

    global:{
        name:"全局模式",
        value:"global"
    },

    direct:{
        name:"直连模式",
        value:"direct"
    }

};



export async function switchOpenclashMode(mode){


    if(!mode_map[mode]){
        throw new Error(
            `不支持的模式:${mode},支持:
            rule/global/direct`
        );
    }


    const command = `

echo "当前切换模式:${mode_map[mode].name}";

uci set openclash.config.proxy_mode=${mode_map[mode].value};

uci commit openclash;

echo "重启OpenClash";

 /etc/init.d/openclash restart;


echo "完成";

`;


    return await ssh_and_run_command(command);

}