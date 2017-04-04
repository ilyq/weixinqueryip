#coding:utf-8

import logging
import requests
from bs4 import BeautifulSoup

def get_ip_info(ip):
    '''获取ip信息'''
    url = 'http://www.ip.cn/index.php?ip={0}'.format(ip)
    headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, sdch',
        'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
        'Referer': 'http://www.ip.cn/',
        'Connection': 'keep-alive',
        'Host': 'www.ip.cn',
    }
    data = {}
    try:
        r = requests.get(url, headers=headers, timeout=30)
        soup = BeautifulSoup(r.content, "html.parser")
        s = soup.find(name='div', attrs={"id": "result"})
        data['ip'] = s.find_all(name="code")[0].get_text()
        data['location'] = s.find_all(name="code")[1].get_text()
    except Exception as e:
        logging.error(e)
        data['errcode'] = 1001
        data['errmsg'] = u'获取出错'
    return data
