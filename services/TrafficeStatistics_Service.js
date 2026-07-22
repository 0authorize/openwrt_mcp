import { ssh_and_run_command } from '../tools/ssh.js'
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
export async function getTrafficeStastice() {
    try {
        const result =await ssh_and_run_command(traffic_status_command);
            return result;
    } catch (error) {
        throw error;
    }
    
}