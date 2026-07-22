import { ssh_and_run_command } from "../tools/ssh.js";
const network_status_command = `
echo "===== WAN接口状态 =====";

ubus call network.interface.wan status 2>/dev/null | \
grep -E '"up":|"l3_device":|"address":';


echo;
echo "===== 默认路由 =====";

ip route show default;


echo;
echo "===== 公网IP =====";

echo -n "IPv4: ";
curl -4 -s --max-time 3 http://api.ipify.org || echo "获取失败";


echo;

echo -n "IPv6: ";
curl -6 -s --max-time 3 http://api6.ipify.org || echo "未连接";


echo;
echo "===== DNS服务 =====";


if pidof dnsmasq >/dev/null; then
    echo "dnsmasq运行中";
else
    echo "dnsmasq未运行";
fi;


echo;
echo "--- 上游DNS ---";

if [ -f /tmp/resolv.conf.auto ]; then
    cat /tmp/resolv.conf.auto | grep nameserver;
else
    echo "无DNS配置";
fi;


echo;
echo "===== DNS解析测试 =====";


if nslookup baidu.com 127.0.0.1 >/dev/null 2>&1; then
    echo "本地DNS正常";
else
    echo "本地DNS异常";
fi;


echo;
echo "===== 外网HTTP测试 =====";


for url in \\
"https://www.baidu.com" \\
"https://github.com" \\
"https://www.google.com"
do

    if curl -I -s --connect-timeout 2 --max-time 3 $url >/dev/null; then
        echo "$url : OK";
    else
        echo "$url : FAILED";
    fi

done;
`;
export async function getNetworkStatus() {
    try {
        const result =await ssh_and_run_command(network_status_command);
            return result;
    } catch (error) {
        throw error;
    }
    
}