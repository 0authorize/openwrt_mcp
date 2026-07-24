import { ssh_and_run_command } from "../tools/ssh.js";
const network_status_command = `
echo "===== WAN接口状态 =====";

ubus call network.interface.wan status 2>/dev/null | \
grep -E '"up":|"l3_device":|"address":|"ipv6-address"';


echo;
echo "===== 默认路由 =====";

echo "IPv4路由:";
ip -4 route show default;

echo "IPv6路由:";
ip -6 route show default;


echo;
echo "===== 公网IP检测 =====";


echo -n "IPv4: ";
curl --noproxy "*" -4 -s --connect-timeout 2 --max-time 3 https://api.ipify.org \
|| echo "IPv4不可用";


echo;


echo -n "IPv6: ";
curl --noproxy "*" -6 -s --connect-timeout 2 --max-time 3 https://api6.ipify.org \
|| echo "IPv6不可用";


echo;
echo "===== IPv4/IPv6连通测试 =====";


echo -n "IPv4访问: ";
if curl --noproxy "*" -4 -I -s --connect-timeout 2 --max-time 3 https://www.baidu.com >/dev/null;
then
    echo "正常";
else
    echo "失败";
fi;


echo -n "IPv6访问: ";
if curl --noproxy "*" -6 -I -s --connect-timeout 2 --max-time 3 https://www.google.com >/dev/null;
then
    echo "正常";
else
    echo "失败";
fi;


echo;
echo "===== DNS服务 =====";


if pidof dnsmasq >/dev/null; then
    echo "dnsmasq运行中";
else
    echo "dnsmasq未运行";
fi;


echo;
echo "--- 上游DNS ---";

cat /tmp/resolv.conf.auto 2>/dev/null | grep nameserver || echo "无";


echo;
echo "===== DNS解析测试 =====";


if nslookup baidu.com 127.0.0.1 >/dev/null 2>&1;
then
    echo "本地DNS正常";
else
    echo "本地DNS异常";
fi;
`;
export async function getNetworkStatus() {
    try {
        const result =await ssh_and_run_command(network_status_command);
            return result;
    } catch (error) {
        throw error;
    }
    
}