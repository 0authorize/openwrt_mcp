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
## 用到的包
```npm install @modelcontextprotocol/sdk zod```

## 功能

### 路由器状态
- `get_router_status` - 获取路由器整体状态（负载、内存、磁盘、在线设备、WiFi等）

### 网络状态
- `get_network_status` - 获取网络连接状态（WAN接口、公网IP、DNS、连通性测试）

### 流量统计
- `get_traffice_stastice` - 获取实时流量统计（LAN速度、WiFi客户端流量、在线设备、连接数）

### OpenClash 管理
- `get_openclash_status` - 获取 OpenClash 运行状态（服务状态、核心版本、配置、TUN、监听端口、错误日志）
- `switch_openclash_proxy_mode` - 切换 OpenClash 代理模式（rule/global/direct）
- `get_openclash_proxy_group` - 获取代理策略组列表（策略组名称、当前选择节点、可用节点列表）
- `get_openclash_proxy_group_and_delay` - 获取代理策略组及节点测速延迟（耗时较长，会并发测试所有节点延迟）
- `operation_openclash_status` - 管理 OpenClash 运行状态（start/stop/restart/update配置）

## 安装

```bash
npm install
```

## 使用

在 Hermes Agent 的 `config.yaml` 中配置 MCP 服务器：

```yaml
mcp_servers:
  openwrt:
    command: node
    args:
      - /path/to/openwrt_MCP/index.js
```
