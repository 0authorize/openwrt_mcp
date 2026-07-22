# openwrt_mcp
用于给Agent操作OpenWrt路由器的MCP

## 配置

使用前需要修改 `tools/ssh.js` 中的 SSH 连接配置：

```javascript
const ssh_config = {
    "ip_host": "192.168.1.1",    // 改为你的路由器IP
    "username": "root",          // 改为你的用户名
    "password": "your_password"  // 改为你的密码
}
```

## 功能

- `get_router_status` - 获取路由器整体状态（负载、内存、磁盘、在线设备等）
- `get_network_status` - 获取网络连接状态
- `get_traffice_stastice` - 获取流量统计
- `get_openclash_status` - 获取 OpenClash 运行状态
- `switch_openclash_proxy_mode` - 切换 OpenClash 代理模式
- `get_openclash_proxy_group` - 获取代理策略组
