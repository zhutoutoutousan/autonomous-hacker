"""
Bilibili OSINT Intelligence Gathering Module
"""

import requests
import time
import json
from typing import Dict, List, Optional
from datetime import datetime
from fake_useragent import UserAgent
import logging

logger = logging.getLogger(__name__)


class BilibiliOSINT:
    """Bilibili intelligence gathering class"""
    
    def __init__(self, rate_limit: float = 1.0):
        self.rate_limit = rate_limit
        self.ua = UserAgent()
        self.base_url = "https://api.bilibili.com"
        self.session = requests.Session()
        self.last_request_time = 0
        
    def _rate_limit_check(self):
        """Enforce rate limiting"""
        current_time = time.time()
        time_since_last = current_time - self.last_request_time
        if time_since_last < self.rate_limit:
            time.sleep(self.rate_limit - time_since_last)
        self.last_request_time = time.time()
    
    def _make_request(self, url: str, params: Optional[Dict] = None) -> Optional[Dict]:
        """Make HTTP request with rate limiting"""
        self._rate_limit_check()
        
        headers = {
            'User-Agent': self.ua.random,
            'Referer': 'https://www.bilibili.com/',
            'Accept': 'application/json, text/plain, */*'
        }
        
        try:
            response = self.session.get(url, headers=headers, params=params, timeout=30)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            logger.error(f"Request failed: {e}")
            return None
    
    def get_user_info(self, account_id: str) -> Optional[Dict]:
        """Get user profile information"""
        logger.info(f"Gathering Bilibili user info for account: {account_id}")
        
        url = f"{self.base_url}/x/space/acc/info"
        params = {'mid': account_id}
        
        data = self._make_request(url, params)
        if data and data.get('code') == 0:
            return data.get('data', {})
        return None
    
    def get_user_stats(self, account_id: str) -> Optional[Dict]:
        """Get user statistics (followers, videos, etc.)"""
        url = f"{self.base_url}/x/relation/stat"
        params = {'vmid': account_id}
        
        data = self._make_request(url, params)
        if data and data.get('code') == 0:
            return data.get('data', {})
        return None
    
    def get_user_videos(self, account_id: str, limit: int = 50) -> List[Dict]:
        """Get user's video list"""
        url = f"{self.base_url}/x/space/wbi/arc/search"
        params = {
            'mid': account_id,
            'ps': min(limit, 50),
            'pn': 1,
            'order': 'pubdate'
        }
        
        data = self._make_request(url, params)
        videos = []
        
        if data and data.get('code') == 0:
            video_list = data.get('data', {}).get('list', {}).get('vlist', [])
            videos = video_list[:limit]
        
        return videos
    
    def get_user_comments(self, account_id: str, limit: int = 100) -> List[Dict]:
        """Get user's recent comments"""
        # Note: Bilibili comment API may require authentication
        # This is a simplified version
        logger.warning("Comment gathering may be limited without authentication")
        return []
    
    def analyze_profile(self, account_id: str) -> Dict:
        """Comprehensive profile analysis"""
        logger.info(f"Analyzing Bilibili profile: {account_id}")
        
        profile_data = {
            'platform': 'bilibili',
            'account_id': account_id,
            'timestamp': datetime.now().isoformat(),
            'profile_info': None,
            'statistics': None,
            'videos': [],
            'analysis': {}
        }
        
        # Gather profile info
        profile_info = self.get_user_info(account_id)
        if profile_info:
            profile_data['profile_info'] = {
                'name': profile_info.get('name', 'N/A'),
                'sign': profile_info.get('sign', 'N/A'),
                'level': profile_info.get('level_info', {}).get('current_level', 'N/A'),
                'avatar': profile_info.get('face', 'N/A'),
                'birthday': profile_info.get('birthday', 'N/A'),
                'sex': profile_info.get('sex', 'N/A'),
                'official_verify': profile_info.get('official', {}),
            }
        
        # Gather statistics
        stats = self.get_user_stats(account_id)
        if stats:
            profile_data['statistics'] = {
                'following': stats.get('following', 0),
                'follower': stats.get('follower', 0),
                'whisper': stats.get('whisper', 0),
                'black': stats.get('black', 0)
            }
        
        # Gather videos
        videos = self.get_user_videos(account_id, limit=20)
        profile_data['videos'] = videos
        
        # Analysis
        profile_data['analysis'] = self._perform_analysis(profile_data)
        
        return profile_data
    
    def _perform_analysis(self, profile_data: Dict) -> Dict:
        """Perform threat analysis on profile"""
        analysis = {
            'account_age': 'Unknown',
            'activity_level': 'Unknown',
            'content_type': [],
            'threat_indicators': [],
            'risk_score': 0
        }
        
        stats = profile_data.get('statistics', {})
        videos = profile_data.get('videos', [])
        
        # Activity level
        follower_count = stats.get('follower', 0)
        video_count = len(videos)
        
        if follower_count > 10000 or video_count > 100:
            analysis['activity_level'] = 'High'
        elif follower_count > 1000 or video_count > 10:
            analysis['activity_level'] = 'Medium'
        else:
            analysis['activity_level'] = 'Low'
        
        # Content analysis
        if videos:
            tags = set()
            for video in videos:
                video_tags = video.get('tag', '').split(',')
                tags.update([t.strip() for t in video_tags if t.strip()])
            analysis['content_type'] = list(tags)[:10]
        
        # Threat indicators
        profile_info = profile_data.get('profile_info', {})
        sign = profile_info.get('sign', '').lower()
        
        threat_keywords = ['攻击', '骂', '黑', '喷', 'troll', 'hate']
        if any(keyword in sign for keyword in threat_keywords):
            analysis['threat_indicators'].append('Suspicious profile description')
            analysis['risk_score'] += 20
        
        # Risk scoring
        if analysis['activity_level'] == 'High':
            analysis['risk_score'] += 10
        if video_count > 50:
            analysis['risk_score'] += 5
        
        analysis['risk_score'] = min(analysis['risk_score'], 100)
        
        return analysis

