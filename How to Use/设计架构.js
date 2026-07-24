// // openwrt-control

// // ├── router
// // │   ├── get_router_status
// // │   ├── get_network_status
// // │   └── get_traffic_statistics
// // │
// // ├── openclash
// // │   ├── get_openclash_status
// // │   ├── restart_openclash
// // │   ├── change_mode
// // │   ├── switch_node
// // │   └── test_proxy
// // │
// // ├── devices
// // │   ├── get_online_devices
// // │   ├── block_device
// // │   ├── unblock_device
// // │   └── limit_speed
// // │
// // ├── wifi
// // │   ├── get_wifi_info
// // │   └── restart_wifi
// // │
// // └── diagnose
// //     ├── ping_test
// //     ├── dns_test
// //     └── check_health

// //----------------------------------------------Core 核心功能

// // openwrt-control
// // │
// // ├── tools
// // │   ├── router.js          # 路由器基础状态
// // │   ├── openclash.js       # OpenClash控制
// // │   ├── devices.js         # 局域网设备管理
// // │   ├── wifi.js            # WiFi管理
// // │   └── diagnose.js        # 网络诊断
// // │
// // └── index.js
// //----------------------------------------------Core 核心功能 -end
// /**
//  * 获取路由器基础状态
//  * 
//  * 返回:
//  * - CPU使用率
//  * - 内存使用率
//  * - 运行时间
//  * - 温度
//  * - WAN状态
//  */
// get_router_status


// /**
//  * 获取当前网络状态
//  *
//  * 返回:
//  * - WAN是否连接
//  * - 当前公网IP
//  * - DNS状态
//  * - 默认网关
//  */
// get_network_status


// /**
//  * 获取流量统计
//  *
//  * 返回:
//  * - 每个设备上传流量
//  * - 每个设备下载流量
//  * - 当前实时带宽
//  */
// get_traffic_statistics

// 重点 --> Openclash 操作 ---------------------------------------------------

// /**
//  * 获取OpenClash运行状态
//  *
//  * 返回:
//  * - 是否运行
//  * - 当前模式(rule/global/direct)
//  * - 当前核心版本
//  * - TUN状态
//  * - 当前代理节点
//  */
// get_openclash_status



// /**
//  * 启动OpenClash
//  *
//  * 执行:
//  * /etc/init.d/openclash start
//  */
// start_openclash



// /**
//  * 停止OpenClash
//  *
//  * 执行:
//  * /etc/init.d/openclash stop
//  */
// stop_openclash



// /**
//  * 重启OpenClash
//  *
//  * 用于:
//  * - 配置更新后生效
//  * - OpenClash异常恢复
//  */
// restart_openclash



// /**
//  * 修改OpenClash运行模式
//  *
//  * 参数:
//  * rule    规则模式
//  * global  全局代理
//  * direct  全局直连
//  */
// change_openclash_mode



// /**
//  * 切换代理节点
//  *
//  * 参数:
//  * 节点名称
//  *
//  * 例如:
//  * 香港01
//  * 日本01
//  * 美国01
//  */
// switch_proxy_node



// /**
//  * 测试代理是否正常
//  *
//  * 测试:
//  * - Google
//  * - Github
//  * - ChatGPT
//  * - YouTube
//  *
//  * 返回:
//  * - DNS结果
//  * - HTTP状态
//  * - 延迟
//  */
// test_proxy



// /**
//  * 更新OpenClash订阅
//  *
//  * 执行:
//  * OpenClash配置更新
//  *
//  * 用于:
//  * - 更新节点
//  * - 更新规则
//  */
// update_openclash_subscription

// -------------------------------------------------------

/**
 * 获取当前在线设备
 *
 * 返回:
 * - 设备名称
 * - IP地址
 * - MAC地址
 * - 在线状态
 *
 * 来源:
 * DHCP租约
 * ARP表
 */
get_online_devices



/**
 * 禁止设备联网
 *
 * 参数:
 * MAC地址
 *
 * 实现:
 * 防火墙规则
 */
block_device



/**
 * 恢复设备联网
 *
 * 删除对应防火墙规则
 */
unblock_device



/**
 * 限制设备速度
 *
 * 参数:
 * MAC地址
 * 最大速度Mbps
 *
 * 示例:
 * 限制某电脑10Mbps
 */
limit_device_speed



/**
 * 查看设备详细信息
 *
 * 返回:
 * - 最近连接时间
 * - IP变化记录
 * - 流量情况
 */
get_device_detail

/**
 * 获取WiFi状态
 *
 * 返回:
 * 2.4G:
 * - 信道
 * - 信号强度
 * - 连接数量
 *
 * 5G:
 * - 信道
 * - 信号强度
 * - 连接数量
 */
get_wifi_info



/**
 * 重启无线网络
 *
 * 执行:
 * wifi reload
 *
 * 用于:
 * - WiFi异常
 * - 修改配置后刷新
 */
restart_wifi



/**
 * 修改WiFi信道
 *
 * 参数:
 * 频段
 * 信道
 *
 * 示例:
 * 5G -> 149
 */
change_wifi_channel



/**
 * 获取连接WiFi设备
 *
 * 返回:
 * 当前连接无线客户端
 */
get_wifi_clients


/**
 * Ping测试
 *
 * 参数:
 * 域名/IP
 *
 * 返回:
 * - 延迟
 * - 丢包率
 */
ping_test



/**
 * DNS测试
 *
 * 检查:
 * - DNS解析
 * - Fake-IP
 * - 国内DNS
 * - 国外DNS
 */
dns_test



/**
 * 路由追踪
 *
 * 查看:
 * 数据包经过哪些节点
 *
 * 用于:
 * 判断网络在哪里阻塞
 */
trace_route



/**
 * 综合健康检查
 *
 * 自动检测:
 *
 * ✓ CPU
 * ✓ 内存
 * ✓ 温度
 * ✓ WAN
 * ✓ DNS
 * ✓ OpenClash
 * ✓ 网络连通性
 *
 * 返回:
 * 当前系统健康报告
 */
check_health