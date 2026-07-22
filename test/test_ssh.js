import { ssh_and_run_command } from '../tools/ssh.js'

const test_router_status_command = `
echo "===== 系统 =====";
uptime;
echo;
free -h;
echo;
echo "===== 磁盘 =====";
df -h | head -3;
echo;
echo "===== OpenClash =====";
ps | grep clash | grep -v grep;
echo;
echo "===== 网络接口 =====";
ip -br addr;
echo;
echo "===== 在线设备(DHCP) =====";
cat /tmp/dhcp.leases;
echo;
echo "===== ARP设备 =====";
ip neigh;
echo;
echo "===== WiFi设备 =====";
iwinfo | grep -E "ESSID|Signal|Bit Rate";
echo;
echo "===== Ping测试 =====";
ping -c 2 baidu.com;
ping -c 2 github.com;
ping -c 2 google.com;
`;
const test_network_status_command = `
echo "===== WAN接口状态 =====";
ubus call network.interface.wan status | grep -E '"up":|"l3_device":|"address":';
echo;
echo "===== 默认网关 =====";
ip route show default;
echo;
echo "===== 公网 IP (IPv4 / IPv6) =====";
echo -n "IPv4: "; curl -s --connect-timeout 3 http://v4.ipv6-test.com/api/myip.php || echo "获取失败";
echo -n "IPv6: "; curl -s --connect-timeout 3 http://v6.ipv6-test.com/api/myip.php || echo "未连接或无IPv6";
echo;
echo "===== DNS 服务状态 =====";
echo "--- dnsmasq 进程 ---";
pgrep dnsmasq > /dev/null && echo "dnsmasq 运行中" || echo "dnsmasq 未运行";
echo "--- 上游 DNS (resolv.conf) ---";
cat /tmp/resolv.conf.auto | grep nameserver;
echo "--- DNS 解析测试 ---";
nslookup baidu.com 127.0.0.1 > /dev/null 2>&1 && echo "本地 DNS (127.0.0.1) 解析: 正常" || echo "本地 DNS (127.0.0.1) 解析: 异常";
`;
const traffic_status_command = `
echo "===== LAN实时速度 =====";

INTERFACE="br-lan";


if [ -d /sys/class/net/$INTERFACE ]; then

    RX1=$(cat /sys/class/net/$INTERFACE/statistics/rx_bytes);
    TX1=$(cat /sys/class/net/$INTERFACE/statistics/tx_bytes);

    sleep 1;

    RX2=$(cat /sys/class/net/$INTERFACE/statistics/rx_bytes);
    TX2=$(cat /sys/class/net/$INTERFACE/statistics/tx_bytes);


    RX_SPEED=$(( (RX2-RX1)/1024 ));
    TX_SPEED=$(( (TX2-TX1)/1024 ));


    echo "接口: $INTERFACE";
    echo "下载速度 RX: \${RX_SPEED} KB/s";
    echo "上传速度 TX: \${TX_SPEED} KB/s";

else

    echo "br-lan不存在";

fi;


echo;
echo "===== WiFi客户端流量 =====";


if command -v iw >/dev/null 2>&1; then


    iw dev | grep Interface | while read line
    do

        WIFI_IF=$(echo $line | awk '{print $2}');

        echo "--- $WIFI_IF ---";


        iw dev $WIFI_IF station dump 2>/dev/null | \
        grep -E "Station|signal:|rx bytes:|tx bytes:";

    done;


else

    echo "iw命令不存在";

fi;


echo;
echo "===== 在线设备 =====";


if [ -f /tmp/dhcp.leases ]; then

    awk '{print $3,$2,$4}' /tmp/dhcp.leases;

else

    echo "无设备信息";

fi;


echo;
echo "===== 当前连接数 =====";


if [ -f /proc/net/nf_conntrack ]; then

    cat /proc/net/nf_conntrack | wc -l;

else

    echo "conntrack不可用";

fi;
`;
const openclash_status_command = `
echo "===== OpenClash 服务状态 =====";

if ps | grep -E "/etc/openclash/clash" | grep -v grep >/dev/null; then
    echo "状态: 运行中";
else
    echo "状态: 未运行";
fi;


echo;
echo "===== 核心信息 =====";

if [ -f /etc/openclash/core/clash_meta ]; then
    /etc/openclash/core/clash_meta -v 2>&1;
else
    echo "核心不存在";
fi;


echo;
echo "===== 当前配置 =====";

echo "配置文件:";
uci -q get openclash.config.config_path;

echo;
echo "核心类型:";
uci -q get openclash.config.core_type;


echo;
echo "===== OpenClash模式 =====";

echo "代理模式:";
uci -q get openclash.config.proxy_mode;

echo "运行模式:";
uci -q get openclash.config.operation_mode;

echo "增强模式:";
uci -q get openclash.config.en_mode;


echo;
echo "===== 端口监听 =====";

echo "HTTP端口:";
uci -q get openclash.config.http_port;

echo "SOCKS端口:";
uci -q get openclash.config.socks_port;

echo "Mixed端口:";
uci -q get openclash.config.mixed_port;

echo "Redir端口:";
uci -q get openclash.config.proxy_port;

echo "TProxy端口:";
uci -q get openclash.config.tproxy_port;

echo "Dashboard API:";
uci -q get openclash.config.cn_port;


echo;
echo "===== TUN状态 =====";

if ip link | grep -i tun >/dev/null; then
    echo "TUN接口: 已启用";
    ip link | grep -i tun;
else
    echo "TUN接口: 未发现";
fi;


echo;
echo "===== Fake-IP状态 =====";

grep -E "^mode:|fake-ip|fake-ip-range" /etc/openclash/CC2.yaml 2>/dev/null;


echo;
echo "===== Clash API状态 =====";

curl -s \
-H "Authorization: Bearer $(uci -q get openclash.config.dashboard_password)" \
http://127.0.0.1:9090/version 2>/dev/null \
|| echo "API访问失败";


echo;
echo "===== 当前代理策略 =====";

curl -s \
-H "Authorization: Bearer $(uci -q get openclash.config.dashboard_password)" \
http://127.0.0.1:9090/proxies 2>/dev/null \
| grep -o '"name":"[^"]*"' \
| head -20;


echo;
echo "===== 最近异常日志 =====";

tail -100 /tmp/openclash.log 2>/dev/null \
| grep -iE "error|failed|warning" \
| tail -10 \
|| echo "无异常";


`;
const command1 = `
curl -s \
-H "Authorization: Bearer sC5VcFUh" \
http://127.0.0.1:9090/proxies
`;
async function test_ssh_connect(){
    try {
        console.log("正在尝试连接并执行命令..."); // 👈 加一行这个看函数有没有被调用
        const result = await ssh_and_run_command(traffic_status_command);
        console.log("执行成功，输出如下：");
        console.log(result);
    } catch (err) {
        console.error("捕获到错误：", err); // 👈 看这里有没有捕获到异常！
    }
}

test_ssh_connect();