import { ssh_and_run_command } from "../tools/ssh.js";

const openclash_status_command = `
set +e;
echo "===== OpenClash 服务状态 =====";

if /etc/init.d/openclash status >/dev/null 2>&1; then
    echo "OpenClash服务: 运行中";
else
    echo "OpenClash服务: 未运行";
fi;


echo;
echo "===== Clash核心进程 =====";

ps | grep -E "clash|mihomo" | grep -v grep || echo "核心未运行";


echo;
echo "===== Clash核心版本 =====";

if [ -f /etc/openclash/core/clash_meta ]; then

    /etc/openclash/core/clash_meta -v 2>/dev/null;

else

    echo "未找到clash_meta核心";

fi;


echo;
echo "===== 当前配置文件 =====";

if [ -f /etc/config/openclash ]; then

    uci show openclash | grep -E "config|enable|config_path";

else

    echo "openclash配置不存在";

fi;


echo;
echo "===== Clash运行模式 =====";


CONFIG=$(uci -q get openclash.config.config_path);


if [ -n "$CONFIG" ] && [ -f "$CONFIG" ]; then

    grep -E "^mode:|^mixed-port:|^redir-port:|^tproxy-port:|^tun:" $CONFIG;

else

    echo "无法找到当前配置文件";

fi;


echo;
echo "===== TUN状态 =====";


if ip link show | grep tun >/dev/null; then

    echo "TUN接口存在";

    ip link show | grep tun;

else

    echo "未发现TUN接口";

fi;


echo;
echo "===== Fake-IP状态 =====";


if [ -n "$CONFIG" ] && [ -f "$CONFIG" ]; then

    grep -A5 "fake-ip" "$CONFIG" | head -10;

else

    echo "无法读取配置";

fi;


echo;
echo "===== Clash监听端口 =====";


netstat -tlnp 2>/dev/null | grep -E "clash|mihomo" \
|| ss -tlnp 2>/dev/null | grep -E "clash|mihomo" \
|| echo "未发现监听";


echo;
echo "===== 代理策略组 =====";


if command -v curl >/dev/null 2>&1; then

    curl -s http://127.0.0.1:9090/proxies 2>/dev/null | \
    grep -o '"name":"[^"]*"' | head -20;

else

    echo "curl不存在";

fi;


echo;
echo "===== 最近OpenClash错误日志 =====";


if [ -f /tmp/openclash.log ]; then

    tail -30 /tmp/openclash.log | grep -iE "error|fail|warning";

else

    echo "日志不存在";

fi;

`;
export async function getOpenClashStatus() {
    try {
        const result =await ssh_and_run_command(openclash_status_command);
            return result;
    } catch (error) {
        throw error;
    }
    
}