import { ssh_and_run_command } from '../tools/ssh.js'
const router_overview_command = `
echo "===== 系统负载 =====";
uptime;

echo;
echo "===== 内存状态 =====";
free -h;

echo;
echo "===== 磁盘状态 =====";
df -h | head -5;

echo;
echo "===== OpenClash状态 =====";
if ps | grep clash | grep -v grep > /dev/null; then
    ps | grep clash | grep -v grep;
    echo "OpenClash运行中";
else
    echo "OpenClash未运行";
fi;


echo;
echo "===== 网络接口 =====";
ip -br addr;


echo;
echo "===== DHCP在线设备 =====";

if [ -f /tmp/dhcp.leases ]; then
    printf "%-16s %-20s %-20s\n" "IP" "MAC" "HOSTNAME";
    awk '{printf "%-16s %-20s %-20s\n",$3,$2,$4}' /tmp/dhcp.leases;
else
    echo "无DHCP记录";
fi;


echo;
echo "===== ARP邻居 =====";
ip neigh;


echo;
echo "===== WiFi状态 =====";

if command -v iwinfo >/dev/null 2>&1; then
    iwinfo | grep -E "ESSID|Signal|Bit Rate";
else
    echo "iwinfo不存在";
fi;
`;
export async function getRouterStatus() {
    try {
        const result =await ssh_and_run_command(router_overview_command);
            return result;
    } catch (error) {
        throw error;
    }
    
}