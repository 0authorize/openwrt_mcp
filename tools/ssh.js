import { Client } from 'ssh2';

const ssh_config = {
    "ip_host":"192.168.1.1",
    "username":"root",
    "password":"147258369DWX"
}


export function ssh_and_run_command(command){
    return new Promise((successful,faild) =>{
        const conn = new Client();
        conn.on('ready',() =>{
            conn.exec(command,(err,stream) =>{
                if(err){
                    conn.end();
                    faild(err)
                    return;
                }
                let succe_Info = '';
                let faild_Info = '';
                stream.on('data',(data) =>{
                    succe_Info += data.toString();
                })
                stream.stderr.on('data',(data) =>{
                    faild_Info += data.toString();
                })
                stream.on('close',(code) =>{
                    conn.end();
                    if(code === 0){
                        successful(succe_Info);
                    }else{
                        faild(`${faild_Info},Code[${code}]`);
                    }
                })
            })
        })
        conn.on('error',(err) =>{
            faild("SSH连接失败!");
        })
        conn.connect({
            host:ssh_config.ip_host,
            port:22,
            username:ssh_config.username,
            password:ssh_config.password
        });
    })
}

