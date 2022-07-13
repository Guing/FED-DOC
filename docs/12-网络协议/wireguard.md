## 参考网址

[https://gobomb.github.io/post/wireguard-notes/](https://gobomb.github.io/post/wireguard-notes/)
[https://mp.weixin.qq.com/s?__biz=MzU1MzY4NzQ1OA==&mid=2247486608&idx=1&sn=affd1ea0449ee10038229240d2254c4c&chksm=fbee4c5dcc99c54b824a6ea219f195c261c7cc006deca7b704ca8265d786b6744273100e8976&scene=21#wechat_redirect](https://mp.weixin.qq.com/s?__biz=MzU1MzY4NzQ1OA==&mid=2247486608&idx=1&sn=affd1ea0449ee10038229240d2254c4c&chksm=fbee4c5dcc99c54b824a6ea219f195c261c7cc006deca7b704ca8265d786b6744273100e8976&scene=21#wechat_redirect)
[https://jishuin.proginn.com/p/763bfbd37d3a](https://jishuin.proginn.com/p/763bfbd37d3a)

## 服务器

### 设置网卡

- 使用`Wg Gen Web`生成wg0.conf
- **在添加家里的节点的时候，需要添加在`allowed-ips`添加`192.168.1.0/32`，允许家里的内网地址进行转化（使用Wg Gen Web，每次重启之后，这个会被删除，需要重新添加）**
- 使用`wg-quick up wg0`
- 允许转发
  - `echo "net.ipv4.ip_forward = 1" >> /etc/sysctl.conf`
  - `echo "net.ipv4.conf.all.proxy_arp = 1" >> /etc/sysctl.conf`
  - `sysctl -p /etc/sysctl.conf`
- 添加内网的路由导向弹虚拟网卡`ip r add 192.168.1.0/24 via 10.6.6.1 dev wg0;`**（重启后失效）**
- 在本节点的`PostUp`中添加以下脚本：

```bash
iptables -t filter -A FORWARD -i wg0 -j ACCEPT; #设置 iptables 的 filter 表 FORWARD 链，允许来自 wg0 和发往 wg0 的包通过
iptables -t filter -A FORWARD -o wg0 -j ACCEPT

```

- 在本节点的`PostDown`中添加以下脚本：

```bash
ip r del 192.168.1.0/24; 
iptables -t filter -D FORWARD -i wg0 -j ACCEPT;
iptables -t filter -D FORWARD -o wg0 -j ACCEPT

```

- 完整的`wg0.conf`

```bash
# Updated: 2022-07-13 09:01:26.35425244 +0000 UTC / Created: 2022-07-05 13:51:25.055387787 +0000 UTC
[Interface]
Address = fd9f:6666::10:6:6:1/64
Address = 10.6.6.1/24
ListenPort = 51820
PrivateKey = qOtHFKSPg0rOixokbi/OyRdTKR8rssFX0kJccnlocVM=

PreUp = echo WireGuard PreUp
PostUp = echo "1" > /proc/sys/net/ipv4/ip_forward;ip r add 192.168.1.0/24 via 10.6.6.1 dev wg0;iptables -t filter -A FORWARD -i wg0 -j ACCEPT;iptables -t filter -A FORWARD -o wg0 -j ACCEPT
PreDown = echo WireGuard PreDown
PostDown = ip r del 192.168.1.0/24; iptables -t filter -D FORWARD -i wg0 -j ACCEPT;iptables -t filter -D FORWARD -o wg0 -j ACCEPT
# home-window /  / Updated: 2022-07-13 09:09:40.888621605 +0000 UTC / Created: 2022-07-13 09:09:40.888621605 +0000 UTC
[Peer]
PublicKey = yj2/Eho8E9cNpYKAT+AHQYQwgNyYq7eX4dgWutOP0B0=
PresharedKey = KHmMP5xFJ0cJMPdpH5P7X9zu7AlxTbP9dIJqEjRZvUg=
AllowedIPs = fd9f:6666::5/128, 10.6.6.6/32

# home-mac /  / Updated: 2022-07-13 09:10:09.165020697 +0000 UTC / Created: 2022-07-13 09:09:08.376784761 +0000 UTC
[Peer]
PublicKey = oSgTzz3n7SRgu6+T7kPMraWMY2zlxF8ojbkAzjlRkG0=
PresharedKey = OxqLnsmgaDRY1QMeZll5gI9Fr+KW7vW/kdOL3Ipw6Lk=
AllowedIPs = fd9f:6666::4/128, 10.6.6.5/32

# phone /  / Updated: 2022-07-13 09:08:05.311890582 +0000 UTC / Created: 2022-07-13 09:08:05.311890582 +0000 UTC
[Peer]
PublicKey = PVLAYK+I+apYK90ljhx87tQHS3JiZbNsgP6i9VaqRnc=
PresharedKey = 83c0y8LDpKxGkxLvbFOt/iKZtk1B4+0w3zj0AXJ/4wo=
AllowedIPs = fd9f:6666::3/128, 10.6.6.4/32

# company /  / Updated: 2022-07-13 09:01:06.484890641 +0000 UTC / Created: 2022-07-12 15:10:04.715362567 +0000 UTC
[Peer]
PublicKey = FGgJ9e45YCygjaLMsjbIABK/vya6WOVfXcy8IRaumgE=
PresharedKey = DV+GKoC0l6d29M38SwZ3pXLkqEe6+ccrNZ0yUeceWmA=
AllowedIPs = fd9f:6666::2/128, 10.6.6.3/32

# home-pi /  / Updated: 2022-07-13 09:09:51.239345155 +0000 UTC / Created: 2022-07-12 15:05:26.885347798 +0000 UTC
[Peer]
PublicKey = LYpLrorpab9BxNIOPA3V2uwahzsOO1B94djE+dPYWgY=
PresharedKey = DTtSgSU6548NXSfPmOkODnU3W+oY1W7cb9F9qzF9yaM=
AllowedIPs = 10.6.6.2/32,192.168.1.0/24

```

## 在家里

- 使用`wg-quick up wg0`
- 使用`systemctl enable wg-quick@wg0`，添加开机启动
- 在本节点的`PostUp`中添加以下脚本：

```bash
echo "1" > /proc/sys/net/ipv4/ip_forward;
iptables  -t filter  -A FORWARD -i wg0 -o wlan0 -j ACCEPT;
iptables -t nat -A POSTROUTING -s 10.6.6.0/24 -o wlan0 -j MASQUERADE;
iptables  -t filter  -A FORWARD  -i wlan0 -o wg0 -j ACCEPT
```

- 在本节点的`PostDown`中添加以下脚本：

```bash
iptables  -t filter  -D FORWARD -i wg0 -o wlan0 -j ACCEPT;
iptables -t nat -D POSTROUTING -s 10.6.6.0/24 -o wlan0 -j MASQUERADE;
iptables  -t filter  -D FORWARD  -i wlan0 -o wg0 -j ACCEPT
```

- 完整的`wg0.conf`

```bash
[Interface]
Address = fd9f:6666::1/128, 10.6.6.2/32
PrivateKey = +DOpjfPkBy5KHdv00cmy2fLbe90NutLaxAdrA5+1p3k=
PreUp = echo WireGuard PreUp
PostUp = echo "1" > /proc/sys/net/ipv4/ip_forward;iptables  -t filter  -A FORWARD -i wg0 -o wlan0 -j ACCEPT;iptables -t nat -A POSTROUTING -s 10.6.6.0/24 -o wlan0 -j MASQUERADE;iptables  -t filter  -A FORWARD  -i wlan0 -o wg0 -j ACCEPT
PreDown = echo WireGuard PreDown
PostDown = iptables  -t filter  -D FORWARD -i wg0 -o wlan0 -j ACCEPT;iptables -t nat -D POSTROUTING -s 10.6.6.0/24 -o wlan0 -j MASQUERADE;iptables  -t filter  -D FORWARD  -i wlan0 -o wg0 -j ACCEPT
[Peer]
PublicKey = xFXca5Wf0LeSGW2px+RKRtwOsi1N0jfns+1qfTfQOB0=
PresharedKey = DTtSgSU6548NXSfPmOkODnU3W+oY1W7cb9F9qzF9yaM=
AllowedIPs = 10.6.6.0/24
Endpoint = 106.53.35.168:51820
PersistentKeepalive = 25

```

### 在其他设备上

- 使用`wg-quick up wg0`
- 使用`systemctl enable wg-quick@wg0`，添加开机启动
- 在对等的服务器节点添加：`AllowedIPs = 192.168.1.0/24`
- 完整节点显示

```bash
[Interface]
PrivateKey = GIpECFx5/aMKDA3fIz5SJGTi1rPtA+gUtyS5XudVSk4=
Address = fd9f:6666::2/128, 10.6.6.3/32

[Peer]
PublicKey = xFXca5Wf0LeSGW2px+RKRtwOsi1N0jfns+1qfTfQOB0=
PresharedKey = DV+GKoC0l6d29M38SwZ3pXLkqEe6+ccrNZ0yUeceWmA=
AllowedIPs = 10.6.6.0/24, 192.168.1.0/24
Endpoint = 106.53.35.168:51820
PersistentKeepalive = 25

```
